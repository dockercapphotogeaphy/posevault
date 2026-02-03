// Helper functions for categories and images

export const getAllTags = (categories) => {
  const allTags = new Set();
  categories.forEach(cat => {
    // Add image tags
    cat.images.forEach(img => {
      if (img.tags) {
        img.tags.forEach(tag => allTags.add(tag));
      }
    });
    // Add gallery/category tags
    if (cat.tags) {
      cat.tags.forEach(tag => allTags.add(tag));
    }
  });
  return Array.from(allTags).sort();
};

export const getCategoryTags = (categories, categoryId) => {
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return [];
  const tags = new Set();
  cat.images.forEach(img => {
    if (img.tags) {
      img.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

// Get all unique tags assigned directly to galleries (not image tags)
export const getGalleryTags = (categories) => {
  const tags = new Set();
  categories.forEach(cat => {
    if (cat.tags) {
      cat.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

export const getDisplayedCategories = (categories, filters) => {
  // Support both old signature (boolean) and new signature (object)
  const isOldSignature = typeof filters === 'boolean';
  const showFavoriteCategoriesOnly = isOldSignature ? filters : filters?.showFavoritesOnly || false;
  const selectedTagFilters = isOldSignature ? [] : filters?.selectedTagFilters || [];
  const tagFilterMode = isOldSignature ? 'include' : filters?.tagFilterMode || 'include';
  const sortBy = isOldSignature ? 'favorites' : filters?.sortBy || 'favorites';
  const searchTerm = isOldSignature ? '' : filters?.searchTerm || '';

  let filtered = [...categories];

  // Filter by search term
  if (searchTerm && searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(cat => {
      // Search in gallery name
      if (cat.name && cat.name.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      // Search in gallery tags
      if (cat.tags && cat.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
        return true;
      }
      // Search in gallery notes
      if (cat.notes && cat.notes.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      return false;
    });
  }

  // Filter by tags if any are selected
  if (selectedTagFilters.length > 0) {
    if (tagFilterMode === 'include') {
      // Show only galleries that have ALL selected tags
      filtered = filtered.filter(cat =>
        cat.tags && selectedTagFilters.every(tag => cat.tags.includes(tag))
      );
    } else {
      // Hide galleries that have ANY of the selected tags
      filtered = filtered.filter(cat =>
        !cat.tags || !selectedTagFilters.some(tag => cat.tags.includes(tag))
      );
    }
  }

  // Filter if showing favorites only
  if (showFavoriteCategoriesOnly) {
    filtered = filtered.filter(cat => cat.isFavorite);
  }

  // Sort based on selected option
  if (sortBy === 'favorites' || sortBy === 'dateAdded') {
    // Sort: favorites first, then others (default behavior)
    filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'nameDesc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
};

export const getDisplayedImages = (category, filters) => {
  const { selectedTagFilters, tagFilterMode, showFavoritesOnly, sortBy, searchTerm } = filters;

  if (!category) return [];

  // Filter out cover images from the gallery display
  let sorted = category.images.filter(img => !img.isCover);

  // Filter by search term first
  if (searchTerm && searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    sorted = sorted.filter(img => {
      // Search in pose name
      if (img.poseName && img.poseName.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      // Search in tags
      if (img.tags && img.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) {
        return true;
      }
      // Search in notes
      if (img.notes && img.notes.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      return false;
    });
  }

  // Filter by tags if any are selected
  if (selectedTagFilters.length > 0) {
    if (tagFilterMode === 'include') {
      sorted = sorted.filter(img =>
        img.tags && selectedTagFilters.every(tag => img.tags.includes(tag))
      );
    } else {
      sorted = sorted.filter(img =>
        !img.tags || !selectedTagFilters.some(tag => img.tags.includes(tag))
      );
    }
  }
  
  // Then filter by favorites if enabled
  if (showFavoritesOnly) {
    sorted = sorted.filter(img => img.isFavorite);
  }
  
  // Finally sort based on selected option
  if (sortBy === 'favorites') {
    sorted.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  } else if (sortBy === 'dateAdded') {
    sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (sortBy === 'dateAddedOldest') {
    sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
  }

  return sorted;
};

export const getGridColsClass = (gridColumns) => {
  return {
    1: 'grid-cols-1',
	2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[gridColumns] || 'grid-cols-3';
};

export const getCategoryGridColsClass = (categoryGridColumns) => {
  return {
    1: 'grid-cols-1',
	2: 'grid-cols-2',
    3: 'grid-cols-3 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }[categoryGridColumns] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
};