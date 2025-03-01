import { z } from 'zod';

export const TimeLogSchema = z.object({
  task: z.string(),
  description: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  source: z.string(),
  id: z.string(),
  creator_id: z.string(),
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

export async function fetchTimeLogs(userId: string) {
  try {
    const response = await fetch(`/api/v1/user/${userId}/time_logs`);
    if (!response.ok) {
      throw new Error('Failed to fetch time logs');
    }
    const data = await response.json();
    return TimeLogResponseSchema.parse(data);
  } catch (error) {
    console.error('Error fetching time logs:', error);
    throw error;
  }
}