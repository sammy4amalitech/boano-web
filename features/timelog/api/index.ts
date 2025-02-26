import { TimelogCreateInput, TimelogUpdateInput, Timelog } from '../types';

export async function fetchTimelogs(): Promise<Timelog[]> {
  const response = await fetch('/api/timelogs');
  if (!response.ok) {
    throw new Error('Failed to fetch timelogs');
  }
  return response.json();
}

export async function createTimelog(data: TimelogCreateInput): Promise<Timelog> {
  const response = await fetch('/api/timelogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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