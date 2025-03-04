import { z } from 'zod';

export const TimeLogSchema = z.object({
  task: z.string(),
  description: z.string().optional(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  source: z.string().default("manual"),
  id: z.number(),
  creator_id: z.string().optional(),
  created_at: z.string().datetime()
});
export const TimeLogResponseSchema = z.object({
  data: z.array(TimeLogSchema),
  total_count: z.number(),
  has_more: z.boolean(),
  page: z.number(),
  items_per_page: z.number()
});

export type TimeLogResponse = z.infer<typeof TimeLogSchema>;
export type TimeLogListResponse = z.infer<typeof TimeLogResponseSchema>;
export const timeLogAgentResponseSchema = z.object({
  task: z.string(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  source: z.string(),
  description: z.string().default(""),
  created_at: z.string().default(""),

})
export const timeLogAgentResult = z.object({
  thoughts: z.string(),
  response : z.array(timeLogAgentResponseSchema),
})

export type TimeLogAgentResponse = z.infer<typeof timeLogAgentResponseSchema>;
export type TimeLogAgentResult = z.infer<typeof timeLogAgentResult>;


// Define Zod schema for form validation
export const timelogEntrySchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  date: z.string(),
  start_date: z.string().min(1, "Start time is required"),
  end_date: z.string(),
  source: z.string()
});

export const timelogsFormSchema = z.object({
  entries: z.array(timelogEntrySchema)
});

export type FormValues = z.infer<typeof timelogsFormSchema>;