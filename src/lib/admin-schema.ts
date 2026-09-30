import { z } from "zod";

export const applicationStatuses = [
  "new",
  "reviewing",
  "contacted",
  "proposal",
  "won",
  "lost",
] as const;

export const applicationPriorities = ["low", "normal", "high"] as const;

export const workflowUpdateSchema = z
  .object({
    id: z.string().uuid(),
    status: z.enum(applicationStatuses),
    priority: z.enum(applicationPriorities),
    follow_up_at: z.string().datetime({ offset: true }).nullable(),
    internal_note: z.string().max(3000),
  })
  .strict();

export const adminEmailSchema = z.object({
  email: z.string().trim().email().max(254),
});

export type ApplicationStatus = (typeof applicationStatuses)[number];
export type ApplicationPriority = (typeof applicationPriorities)[number];

export type AdminApplication = {
  id: string;
  name: string;
  email: string;
  service_type: string;
  description: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  follow_up_at: string | null;
  internal_note: string;
  created_at: string;
  updated_at: string;
};

export type ApplicationEvent = {
  id: string;
  application_id: string;
  event_type: string;
  previous_status: ApplicationStatus | null;
  next_status: ApplicationStatus | null;
  actor_email: string | null;
  note: string | null;
  created_at: string;
};
