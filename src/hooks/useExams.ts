import { useQuery } from '@tanstack/react-query';

/**
 * Client Hook: Fetch exam data using React Query.
 * Connects the UI to the /api layer.
 */
export function useExam(id: string) {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: async () => {
      const res = await fetch(`/api/exams/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch exam');
      }
      return res.json();
    },
    enabled: !!id,
  });
}
