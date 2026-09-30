create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  service_type text not null check (
    service_type in (
      'is-akisi-otomasyonu',
      'sistem-entegrasyonu',
      'surec-analizi',
      'diger'
    )
  ),
  description text not null check (char_length(description) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

-- Public and signed-in clients cannot read or write submissions directly.
-- The server route uses the service-role secret, which must never reach the browser.
revoke all on table public.applications from anon, authenticated;
