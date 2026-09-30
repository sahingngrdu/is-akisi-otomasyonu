alter table public.applications
  add column if not exists status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'proposal', 'won', 'lost')),
  add column if not exists priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high')),
  add column if not exists follow_up_at timestamptz default (now() + interval '1 day'),
  add column if not exists internal_note text not null default ''
    check (char_length(internal_note) <= 3000),
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  event_type text not null check (event_type in ('submitted', 'status_changed', 'workflow_updated')),
  previous_status text,
  next_status text,
  actor_email text,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists application_events_application_created_idx
  on public.application_events (application_id, created_at desc);

alter table public.application_events enable row level security;
revoke all on table public.application_events from anon, authenticated, service_role;
grant usage on schema public to service_role;
grant select on table public.application_events to service_role;
grant insert (application_id, event_type, previous_status, next_status, actor_email, note)
  on table public.application_events to service_role;

-- The trigger records every public submission without granting browser access to the event log.
create or replace function public.record_application_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.application_events (application_id, event_type, next_status)
  values (new.id, 'submitted', new.status);
  return new;
end;
$$;

revoke all on function public.record_application_submission() from public, anon, authenticated;

drop trigger if exists applications_record_submission on public.applications;
create trigger applications_record_submission
after insert on public.applications
for each row execute function public.record_application_submission();

-- Existing demo requests predate the audit log; give them an initial history event.
insert into public.application_events (application_id, event_type, next_status, created_at)
select application.id, 'submitted', application.status, application.created_at
from public.applications as application
where not exists (
  select 1
  from public.application_events as event
  where event.application_id = application.id and event.event_type = 'submitted'
);

-- Keep workflow fields and their audit event in one database transaction.
create or replace function public.update_application_workflow(
  p_application_id uuid,
  p_status text,
  p_priority text,
  p_follow_up_at timestamptz,
  p_internal_note text,
  p_actor_email text
)
returns public.applications
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_application public.applications%rowtype;
  updated_application public.applications%rowtype;
  changed_status boolean;
  changed_workflow boolean;
begin
  if p_status not in ('new', 'reviewing', 'contacted', 'proposal', 'won', 'lost') then
    raise exception 'Invalid status';
  end if;
  if p_priority not in ('low', 'normal', 'high') then
    raise exception 'Invalid priority';
  end if;
  if char_length(p_internal_note) > 3000 then
    raise exception 'Internal note is too long';
  end if;

  select * into current_application
  from public.applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Application not found';
  end if;

  changed_status := current_application.status is distinct from p_status;
  changed_workflow := current_application.priority is distinct from p_priority
    or current_application.follow_up_at is distinct from p_follow_up_at
    or current_application.internal_note is distinct from p_internal_note;

  update public.applications
  set status = p_status,
      priority = p_priority,
      follow_up_at = p_follow_up_at,
      internal_note = p_internal_note,
      updated_at = now()
  where id = p_application_id
  returning * into updated_application;

  if changed_status or changed_workflow then
    insert into public.application_events (
      application_id, event_type, previous_status, next_status, actor_email, note
    ) values (
      p_application_id,
      case when changed_status then 'status_changed' else 'workflow_updated' end,
      current_application.status,
      updated_application.status,
      left(p_actor_email, 254),
      case when current_application.internal_note is distinct from p_internal_note
        then 'İç not güncellendi' else null end
    );
  end if;

  return updated_application;
end;
$$;

revoke all on function public.update_application_workflow(uuid, text, text, timestamptz, text, text)
  from public, anon, authenticated;
grant execute on function public.update_application_workflow(uuid, text, text, timestamptz, text, text)
  to service_role;

revoke all on table public.applications from anon, authenticated, service_role;
grant insert (name, email, service_type, description)
  on table public.applications to service_role;
grant select (id, name, email, service_type, description, status, priority, follow_up_at, internal_note, created_at, updated_at)
  on table public.applications to service_role;
