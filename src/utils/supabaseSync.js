import { supabase } from '../supabaseClient';

/**
 * Sync image metadata to Supabase
 * @param {string} r2Key - The R2 storage key (unique identifier)
 * @param {object} metadata - Image metadata to sync
 * @param {string} userId - The user's ID
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function syncImageMetadata(r2Key, metadata, userId) {
  if (!r2Key || !userId) {
    console.warn('syncImageMetadata: missing r2Key or userId');
    return { ok: false, error: 'Missing r2Key or userId' };
  }

  try {
    // Build the update object with only the fields that exist in the DB
    const updates = {
      updated_at: new Date().toISOString(),
    };

    // Map local field names to Supabase column names
    if (metadata.poseName !== undefined) {
      updates.name = metadata.poseName;
    }
    if (metadata.notes !== undefined) {
      updates.notes = metadata.notes;
    }
    if (metadata.isFavorite !== undefined) {
      updates.favoriate = metadata.isFavorite; // Note: using their typo "favoriate"
    }
    if (metadata.tags !== undefined) {
      // Store tags as JSON string in notes if no tags column exists
      // TODO: Add proper tags column to Supabase
      // For now, we'll skip tags sync unless they add a tags column
      console.log('Tags sync skipped - add tags column to Supabase for full sync');
    }

    // Find and update the row by r2_key (if column exists) or by name + user_id
    // First, try to update by matching the original filename in the r2_key
    const filename = r2Key.split('/').pop(); // Get filename from r2_key path

    const { data, error } = await supabase
      .from('images')
      .update(updates)
      .eq('user_id', userId)
      .eq('name', filename)
      .select();

    if (error) {
      console.error('Supabase sync error:', error);
      return { ok: false, error: error.message };
    }

    if (!data || data.length === 0) {
      console.warn('No matching row found in Supabase for:', filename);
      return { ok: false, error: 'No matching row found' };
    }

    console.log('Supabase sync successful:', data);
    return { ok: true, data };
  } catch (err) {
    console.error('Supabase sync exception:', err);
    return { ok: false, error: err.message };
  }
}

/**
 * Sync image deletion to Supabase (soft delete)
 * @param {string} r2Key - The R2 storage key
 * @param {string} userId - The user's ID
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function syncImageDeletion(r2Key, userId) {
  if (!r2Key || !userId) {
    return { ok: false, error: 'Missing r2Key or userId' };
  }

  try {
    const filename = r2Key.split('/').pop();

    // Soft delete by setting deleted_at
    const { data, error } = await supabase
      .from('images')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('name', filename)
      .select();

    if (error) {
      console.error('Supabase delete sync error:', error);
      return { ok: false, error: error.message };
    }

    console.log('Supabase delete sync successful');
    return { ok: true, data };
  } catch (err) {
    console.error('Supabase delete sync exception:', err);
    return { ok: false, error: err.message };
  }
}

/**
 * Batch sync multiple images (useful for bulk operations)
 * @param {Array<{r2Key: string, metadata: object}>} images
 * @param {string} userId
 * @returns {Promise<{ok: boolean, results: Array}>}
 */
export async function batchSyncImages(images, userId) {
  const results = [];

  for (const { r2Key, metadata } of images) {
    const result = await syncImageMetadata(r2Key, metadata, userId);
    results.push({ r2Key, ...result });
  }

  const allOk = results.every(r => r.ok);
  return { ok: allOk, results };
}
