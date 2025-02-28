import {TimelogCreateInput, TimelogUpdateInput, Timelog, TimeLogApiResponse} from '../types';

const API = "http://0.0.0.0:8000/api"

export async function fetchTimelogs(): Promise<
    TimeLogApiResponse
> {
  const response = await fetch(`${API}/v1/user/3c5ab744-00a7-407f-8a01-259f21e8e24b/time_logs`)
  if (!response.ok) {
    throw new Error('Failed to fetch timelogs');
  }

  return response.json();
}

export async function batchCreateTimeLog(data: TimelogUpdateInput[]): Promise<Timelog> {
  const response = await fetch(`${API}/v1/user/3c5ab744-00a7-407f-8a01-259f21e8e24b/time_logs/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timelogs: data
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create timelog');
  }
  return response.json();
}

export async function updateTimelog(id: string, data: TimelogUpdateInput): Promise<Timelog> {
  const response = await fetch(`/api/timelogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update timelog');
  }
  return response.json();
}

export async function deleteTimelog(id: string): Promise<void> {
  const response = await fetch(`/api/timelogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete timelog');
  }
}