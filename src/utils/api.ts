import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d4ef971a`;

const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json',
};

export async function seedData() {
  const res = await fetch(`${BASE_URL}/seed`, { method: 'POST', headers });
  return res.json();
}

export async function getPlaces() {
  const res = await fetch(`${BASE_URL}/places`, { headers });
  if (!res.ok) throw new Error('Failed to fetch places');
  return res.json();
}

export async function getPlace(id: string) {
  const res = await fetch(`${BASE_URL}/places/${id}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch place');
  return res.json();
}

export async function getFestivals() {
  const res = await fetch(`${BASE_URL}/festivals`, { headers });
  if (!res.ok) throw new Error('Failed to fetch festivals');
  return res.json();
}

export async function getBlogs() {
  const res = await fetch(`${BASE_URL}/blogs`, { headers });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function createBooking(data: any) {
  const res = await fetch(`${BASE_URL}/bookings`, { 
    method: 'POST', 
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${BASE_URL}/bookings`, { headers });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}
