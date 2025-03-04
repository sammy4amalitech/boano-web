'use server'

import {TimelogCreateInput, TimelogUpdateInput, Timelog, TimeLogApiResponse, TimeLogUpsertInput} from '../types';
import {auth, getAuth} from "@clerk/nextjs/server";

const API = "http://0.0.0.0:8000/api"

export async function fetchTimelogs(): Promise<
    TimeLogApiResponse
> {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${API}/v1/user/3c5ab744-00a7-407f-8a01-259f21e8e24b/time_logs`, {
    headers : {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch timelogs');
  }

  return response.json();
}

export async function batchUpsertTimeLog(data: TimeLogUpsertInput[]): Promise<Timelog> {
  const { getToken } = await auth();
  const token = await getToken();
  console.log("update", {
    timelogs: data
  })
  const response = await fetch(`${API}/v1/user/time_logs/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      timelogs: data
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to upsert timelog');
  }
  return response.json();
}

export async function batchUpdateTimelog( data: TimelogUpdateInput[]): Promise<Timelog> {

  const response = await fetch(`${API}/v1/user/3c5ab744-00a7-407f-8a01-259f21e8e24b/time_logs/upsert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timelogs: data
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update timelogS');
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