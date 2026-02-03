import React from 'react';
import { Heart, Grid3x3, ChevronDown, Filter, CheckSquare, Search, X } from 'lucide-react';
import CategoryCard from './CategoryCard';
import { getCategoryGridColsClass } from '../utils/helpers';

export default function CategoryGrid({
  categories,
  showFavoriteCategoriesOnly,
  categoryGridColumns,
  showCategoryGridDropdown,
  categoryDropdownRef,
  onToggleShowFavorites,
  onToggleGridDropdown,
  onSetGridColumns,
  onOpenCategory,
  onToggleFavorite,
  onUploadImages,
  onShowMobileUpload,
  onEditSettings,
  onUploadCover,
  onDelete,
  onGeneratePDF,
  // New props for filtering and bulk selection
  galleryTags = [],
  selectedTagFilters = [],
  searchTerm = '',
  onSearchChange,
  onShowGalleryFilter,
  bulkSelectMode = false,
  selectedGalleries = [],
  onToggleBulkSelect,
  onSelectGallery,
  onStartBulkSelect,
  onShowBulkEdit
}) {
  const categoryGridColsClass = getCategoryGridColsClass(categoryGridColumns);
  const hasActiveFilters = selectedTagFilters.length > 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search Bar */}
      {onSearchChange && (
        <div className="mb-4 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search galleries by name, tags, or notes..."
            className="w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            autoComplete="off"
            data-form-type="other"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Favorites Toggle */}
        {!bulkSelectMode && (
          <button
            onClick={onToggleShowFavorites}
            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer ${
              showFavoriteCategoriesOnly
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Heart size={20} className={showFavoriteCategoriesOnly ? 'fill-white' : ''} />
            <span className="hidden sm:inline">{showFavoriteCategoriesOnly ? 'Show All' : 'Favorites Only'}</span>
          </button>
        )}

        {/* Filter Button */}
        {onShowGalleryFilter && !bulkSelectMode && (
          <button
            onClick={onShowGalleryFilter}
            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer ${
              hasActiveFilters
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filter</span>
            {hasActiveFilters && (
              <span className="bg-white text-purple-600 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {selectedTagFilters.length}
              </span>
            )}
          </button>
        )}

        {/* Bulk Select Toggle */}
        {onToggleBulkSelect && (
          <button
            onClick={onToggleBulkSelect}
            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer ${
              bulkSelectMode
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <CheckSquare size={20} />
            <span className="hidden sm:inline">{bulkSelectMode ? 'Cancel' : 'Bulk Select'}</span>
          </button>
        )}

        {/* Bulk Edit Button (shown when galleries selected) */}
        {bulkSelectMode && selectedGalleries.length > 0 && onShowBulkEdit && (
          <button
            onClick={onShowBulkEdit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            Edit ({selectedGalleries.length})
          </button>
        )}

        {/* Grid Columns Dropdown */}
        <div className="relative ml-auto" ref={categoryDropdownRef}>
          <button
            onClick={onToggleGridDropdown}
            className="px-2 md:px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Grid3x3 size={20} />
            <span className="hidden md:inline">{categoryGridColumns} Columns</span>
            <ChevronDown size={16} className="hidden md:inline" />
          </button>

           {showCategoryGridDropdown && (
            <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
              {[1, 2, 3, 4].map(cols => {
			  // Hide 1 column on desktop, hide 3-4 columns on mobile
			  let hideClass = '';
			  if (cols === 1) {
				hideClass = 'md:hidden'; // Show on mobile, hide on desktop
			  } else if (cols >= 3) {
				hideClass = 'hidden md:block'; // Hide on mobile, show on desktop
			  }

			  return (
				<button
				  key={cols}
				  onClick={() => onSetGridColumns(cols)}
				  className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap ${
					categoryGridColumns === cols ? 'bg-gray-700 text-purple-400' : ''
				  } ${hideClass}`}
				>
				  {cols} Columns
				</button>
			  );
			})}
            </div>
          )}
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Heart size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No favorite galleries yet</p>
          <p className="text-sm mt-2">Click the heart icon on galleries to mark them as favorites</p>
        </div>
      ) : (
        <div className={`grid ${categoryGridColsClass} gap-6`}>
          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onOpen={onOpenCategory}
              onToggleFavorite={onToggleFavorite}
              onUploadImages={onUploadImages}
              onShowMobileUpload={onShowMobileUpload}
              onEditSettings={onEditSettings}
              onUploadCover={onUploadCover}
              onDelete={onDelete}
              onGeneratePDF={onGeneratePDF}
              bulkSelectMode={bulkSelectMode}
              isSelected={selectedGalleries.includes(cat.id)}
              onSelect={onSelectGallery}
              onStartBulkSelect={onStartBulkSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
