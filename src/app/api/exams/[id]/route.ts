import { NextResponse } from 'next/server';
import { getExamById } from '@/server/exams';

/**
 * HTTP Layer: GET /api/exams/[id]
 * Handles request parsing, auth checks, and response formatting.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Auth Check Example:
    // const session = await getServerSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const exam = await getExamById(id);
    
    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }
    
    return NextResponse.json(exam);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
