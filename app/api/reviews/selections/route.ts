import { NextRequest, NextResponse } from 'next/server';
import {
  getReviewSelections,
  toggleReviewSelection,
  bulkUpdateSelections,
} from '@/lib/storage';

/**
 * GET /api/reviews/selections
 * Returns all selected review IDs
 */
export async function GET() {
  try {
    const selections = await getReviewSelections();
    return NextResponse.json({
      status: 'success',
      result: selections,
      selectedIds: selections.selections.map((s) => s.reviewId),
    });
  } catch (error) {
    console.error('Error fetching selections:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch review selections',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews/selections
 * Toggle or bulk update review selections
 * 
 * Body:
 * - reviewId: number (for single toggle)
 * - reviewIds: number[] (for bulk update)
 * - selected: boolean (for bulk update)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Single review toggle
    if (body.reviewId !== undefined) {
      const isSelected = await toggleReviewSelection(body.reviewId);
      return NextResponse.json({
        status: 'success',
        reviewId: body.reviewId,
        selected: isSelected,
        message: isSelected
          ? 'Review selected for public display'
          : 'Review removed from public display',
      });
    }

    // Bulk update
    if (body.reviewIds && Array.isArray(body.reviewIds)) {
      await bulkUpdateSelections(body.reviewIds, body.selected ?? true);
      return NextResponse.json({
        status: 'success',
        count: body.reviewIds.length,
        selected: body.selected ?? true,
        message: `${body.reviewIds.length} reviews updated`,
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid request body. Provide reviewId or reviewIds.',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating selections:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to update review selections',
      },
      { status: 500 }
    );
  }
}

