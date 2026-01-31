import { supabase } from '@/lib/supabase';

/**
 * Business Logic: Fetch an exam by ID directly from Supabase.
 * Reusable in API routes, Server Components, and Server Actions.
 */
export async function getExamById(id: string) {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching exam:', error);
    throw new Error(error.message);
  }
  
  return data;
}

/**
 * Business Logic: Calculate score for a submission.
 * This is a placeholder for complex server-side rules.
 */
export async function calculateExamScore(submissionId: string) {
  // 1. Fetch submission and answers
  // 2. Fetch correct answers from DB
  // 3. Apply scoring rules
  // 4. Update submission status and score
  return { success: true, score: 0 };
}
