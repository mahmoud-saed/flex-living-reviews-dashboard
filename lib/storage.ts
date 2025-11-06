import { promises as fs } from 'fs';
import path from 'path';
import { ReviewSelectionsData, ReviewSelection } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const SELECTIONS_FILE = path.join(DATA_DIR, 'review-selections.json');

/**
 * Read review selections from JSON file
 */
export async function getReviewSelections(): Promise<ReviewSelectionsData> {
  try {
    const data = await fs.readFile(SELECTIONS_FILE, 'utf-8');
    return JSON.parse(data) as ReviewSelectionsData;
  } catch (error) {
    // If file doesn't exist or is corrupted, return empty selections
    console.error('Error reading selections:', error);
    return {
      selections: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Write review selections to JSON file
 */
export async function saveReviewSelections(
  selections: ReviewSelection[]
): Promise<void> {
  try {
    const data: ReviewSelectionsData = {
      selections,
      lastUpdated: new Date().toISOString(),
    };
    await fs.writeFile(SELECTIONS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving selections:', error);
    throw new Error('Failed to save review selections');
  }
}

/**
 * Check if a review is selected
 */
export async function isReviewSelected(reviewId: number): Promise<boolean> {
  const data = await getReviewSelections();
  return data.selections.some((s) => s.reviewId === reviewId);
}

/**
 * Toggle review selection
 */
export async function toggleReviewSelection(
  reviewId: number
): Promise<boolean> {
  const data = await getReviewSelections();
  const existingIndex = data.selections.findIndex(
    (s) => s.reviewId === reviewId
  );

  if (existingIndex >= 0) {
    // Remove selection
    data.selections.splice(existingIndex, 1);
    await saveReviewSelections(data.selections);
    return false; // Now unselected
  } else {
    // Add selection
    const newSelection: ReviewSelection = {
      reviewId,
      selectedAt: new Date().toISOString(),
    };
    data.selections.push(newSelection);
    await saveReviewSelections(data.selections);
    return true; // Now selected
  }
}

/**
 * Get all selected review IDs
 */
export async function getSelectedReviewIds(): Promise<number[]> {
  const data = await getReviewSelections();
  return data.selections.map((s) => s.reviewId);
}

/**
 * Bulk update review selections
 */
export async function bulkUpdateSelections(
  reviewIds: number[],
  selected: boolean
): Promise<void> {
  const data = await getReviewSelections();

  if (selected) {
    // Add reviews that aren't already selected
    const existingIds = new Set(data.selections.map((s) => s.reviewId));
    const newSelections = reviewIds
      .filter((id) => !existingIds.has(id))
      .map((id) => ({
        reviewId: id,
        selectedAt: new Date().toISOString(),
      }));
    data.selections.push(...newSelections);
  } else {
    // Remove specified reviews
    const idsToRemove = new Set(reviewIds);
    data.selections = data.selections.filter(
      (s) => !idsToRemove.has(s.reviewId)
    );
  }

  await saveReviewSelections(data.selections);
}

