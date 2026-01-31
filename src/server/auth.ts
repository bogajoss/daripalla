'use server';

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function loginAction(credentials: Record<string, string>, userType: 'student' | 'admin') {
  const identifier = userType === 'student' ? credentials.rollNumber : credentials.username;
  const password = credentials.password;

  // Query user by phone (student) or username (admin)
  const query = supabase
    .from('users')
    .select('*')
    .eq(userType === 'student' ? 'phone' : 'username', identifier)
    .single();

  const { data: user, error } = await query;

  if (error || !user) {
    throw new Error('ব্যবহারকারী খুঁজে পাওয়া যায়নি');
  }

  // PLAINTEXT COMPARISON (as requested)
  if (user.password !== password) {
    throw new Error('পাসওয়ার্ড ভুল');
  }

  // Verify role matches
  if (user.role !== userType && !(userType === 'admin' && user.role === 'admin')) {
     // Basic check: if you are logging in via admin page, you must be an admin
     if (userType === 'admin' && user.role !== 'admin') {
         throw new Error('আপনার অ্যাডমিন অ্যাক্সেস নেই');
     }
  }

  // Set a simple session cookie (In production, use a signed JWT)
  const cookieStore = await cookies();
  cookieStore.set('user_session', JSON.stringify({
    id: user.id,
    role: user.role,
    name: user.full_name
  }), { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  return { success: true, user: { id: user.id, role: user.role, name: user.full_name } };
}

export async function registerAction(data: { fullName: string; phone: string; password: string }) {
  const { data: user, error } = await supabase
    .from('users')
    .insert([
      { 
        full_name: data.fullName, 
        phone: data.phone, 
        password: data.password, 
        role: 'student' 
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, user };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('user_session');
}
