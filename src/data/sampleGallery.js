/**
 * Sample Gallery Data for New Users
 *
 * This gallery is automatically created for new users to help them
 * learn how to use PoseVault through the tutorial.
 *
 * Images provided courtesy of Arthur AG @Creative Prints Shelf
 * https://www.etsy.com/shop/CreativePrintsShelf
 */

const ATTRIBUTION_NOTE = 'This is a sample Family Pose image. Photo provided courtesy of Arthur AG @Creative Prints Shelf - https://www.etsy.com/shop/CreativePrintsShelf';

const GALLERY_ATTRIBUTION = 'This is a sample gallery of Family Poses. Cover photo provided courtesy of Arthur AG @Creative Prints Shelf - https://www.etsy.com/shop/CreativePrintsShelf';

export const sampleGalleryData = {
  name: 'Sample Family Gallery',
  notes: GALLERY_ATTRIBUTION,
  tags: ['sample', 'family'],
  isPrivate: false,
  isFavorite: false,
  cover: {
    path: '/sample-gallery/cover.webp',
    tags: ['sample', 'family', 'group', 'man', 'woman', 'children', 'baby'],
  },
  images: [
    {
      path: '/sample-gallery/pose-01.webp',
      poseName: 'Sample Family Pose - 01',
      notes: ATTRIBUTION_NOTE,
      tags: ['sample', 'family', 'group', 'man', 'woman', 'children', 'half-body'],
      isFavorite: false,
    },
    {
      path: '/sample-gallery/pose-02.webp',
      poseName: 'Sample Family Pose - 02',
      notes: ATTRIBUTION_NOTE,
      tags: ['sample', 'family', 'group', 'man', 'woman', 'child', 'baby', 'sitting', 'full-body'],
      isFavorite: false,
    },
    {
      path: '/sample-gallery/pose-03.webp',
      poseName: 'Sample Family Pose - 03',
      notes: ATTRIBUTION_NOTE,
      tags: ['sample', 'family', 'group', 'man', 'woman', 'child', 'kneeling', 'full-body', 'kissing'],
      isFavorite: false,
    },
    {
      path: '/sample-gallery/pose-04.webp',
      poseName: 'Sample Family Pose - 04',
      notes: ATTRIBUTION_NOTE,
      tags: ['sample', 'family', 'man', 'child', 'kneeling', 'full-body'],
      isFavorite: false,
    },
    {
      path: '/sample-gallery/pose-05.webp',
      poseName: 'Sample Family Pose - 05',
      notes: ATTRIBUTION_NOTE,
      tags: ['sample', 'family', 'group', 'man', 'woman', 'children', 'half-body'],
      isFavorite: false,
    },
  ],
};

/**
 * Build a sample gallery using direct URLs (no data URL conversion needed)
 * Images are served from /public/sample-gallery/ and don't need R2 upload
 * @returns {Object} - The sample gallery ready to be added
 */
export function buildSampleGallery() {
  console.log('[SampleGallery] Building sample gallery with direct URLs...');
  const { name, notes, tags, isPrivate, isFavorite, cover, images } = sampleGalleryData;

  // Build images array with direct URLs
  const galleryImages = images.map((img) => ({
    src: img.path, // Use direct URL, not data URL
    poseName: img.poseName,
    notes: img.notes,
    tags: img.tags,
    isFavorite: img.isFavorite,
    dateAdded: new Date().toISOString(),
    // Mark as sample image so we skip R2 upload (already served from public folder)
    isSampleImage: true,
  }));

  console.log(`[SampleGallery] Built gallery with ${galleryImages.length} images`);

  return {
    name,
    notes,
    tags,
    isPrivate,
    isFavorite,
    cover: cover.path, // Use direct URL for cover too
    coverTags: cover.tags,
    images: galleryImages,
  };
}
