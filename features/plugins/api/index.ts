'use server'

import { Plugin, CreatePluginDTO, UpdatePluginDTO } from '../types';
import { auth } from '@clerk/nextjs/server';

const API = "http://0.0.0.0:8000/api"

export async function fetchPlugins(): Promise<{plugins: Plugin[]}> {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${API}/v1/plugins`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch plugins');
  }
  return response.json();
}

export async function createPlugin(data: CreatePluginDTO): Promise<Plugin> {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${API}/v1/plugins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create plugin');
  }
  return response.json();
}

export async function updatePlugin(id: string, data: UpdatePluginDTO): Promise<Plugin> {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${API}/v1/plugins/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update plugin');
  }
  return response.json();
}

export async function deletePlugin(id: string): Promise<void> {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`${API}/v1/plugins/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete plugin');
  }
}