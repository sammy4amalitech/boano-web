import {z} from "zod";

export interface Timelog {
  id: string;
  userId: string;
  projectId: string;
  task: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
  source: string;
}

export interface TimelogCreateInput {
  projectId: string;
  description: string;
  startTime: Date;
  endTime?: Date;
}

export interface TimelogUpdateInput {
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

const timeLogSchema = z.object({
  task: z.string(),
  description: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  source: z.string(),
  id: z.number(),
  creator_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

const timeLogApiResponseSchema = z.object({
  data: z.array(timeLogSchema),
  total_count: z.number(),
  has_more: z.boolean(),
  page: z.number(),
  items_per_page: z.number(),
});

export type TimeLogApiResponse = z.infer<typeof timeLogApiResponseSchema>;