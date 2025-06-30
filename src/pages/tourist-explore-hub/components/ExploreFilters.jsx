import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExploreFilters = ({ 
  onFilterChange, 
  activeFilters = {}, 
  onClearAll,
  className = ""
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { id: 'attractions', label: 'Must-See Attractions', icon: 'Camera', color: 'blue' },
    { id: 'cuisine', label: 'Local Cuisine', icon: 'Utensils', color: 'orange' },
    { id: 'culture', label: 'Cultural Experiences', icon: 'Heart', color: 'purple' },
    { id: 'outdoor', label: 'Outdoor Activities', icon: 'Trees', color: 'green' },
    { id: 'hidden', label: 'Hidden Gems', icon: 'MapPin', color: 'red' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'pink' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Moon', color: 'indigo' },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain', color: 'teal' }
  ];

  const priceRangeOptions = [
    { id: 'free', label: 'Free', color: 'success' },
    { id: 'budget', label: 'Budget (€)', color: 'info' },
    { id: 'moderate', label: 'Moderate (€€)', color: 'warning' },
    { id: 'premium', label: 'Premium (€€€)', color: 'error' }
  ];

  const durationOptions = [
    { id: 'quick', label: 'Quick (< 2h)', icon: 'Clock' },
    { id: 'half-day', label: 'Half Day (2-6h)', icon: 'Clock' },
    { id: 'full-day', label: 'Full Day (6h+)', icon: 'Calendar' },
    { id: 'multi-day', label: 'Multi-day', icon: 'Calendar' }
  ];

  const distanceOptions = [
    { id: 'walking', label: 'Walking (< 1km)', icon: 'Navigation' },
    { id: 'nearby', label: 'Nearby (1-5km)', icon: 'Navigation' },
    { id: 'transit', label: 'Transit (5-20km)', icon: 'Navigation' },
    { id: 'daytrip', label: 'Day Trip (20km+)', icon: 'Navigation' }
  ];

  const accessibilityOptions = [
    { id: 'wheelchair', label: 'Wheelchair Accessible', icon: 'Users' },
    { id: 'families', label: 'Family Friendly', icon: 'Users' },
    { id: 'seniors', label: 'Senior Friendly', icon: 'Users' },
    { id: 'pets', label: 'Pet Friendly', icon: 'Heart' }
  ];

  const handleFilterToggle = (filterType, filterId) => {
    const currentValues = activeFilters[filterType] || [];
    const newValues = currentValues.includes(filterId)
      ? currentValues.filter(id => id !== filterId)
      : [...currentValues, filterId];
    
    onFilterChange?.({
      ...activeFilters,
      [filterType]: newValues
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange?.({
      ...activeFilters,
      minRating: activeFilters.minRating === rating ? null : rating
    });
  };

  const getFilterColorClass = (color, isActive) => {
    const colorClasses = {
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      red: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
      pink: isActive ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
      teal: isActive ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100',
      success: isActive ? 'bg-success text-white' : 'bg-success-50 text-success border-success-200 hover:bg-success-100',
      info: isActive ? 'bg-info text-white' : 'bg-info-50 text-info border-info-200 hover:bg-info-100',
      warning: isActive ? 'bg-warning text-white' : 'bg-warning-50 text-warning border-warning-200 hover:bg-warning-100',
      error: isActive ? 'bg-error text-white' : 'bg-error-50 text-error border-error-200 hover:bg-error-100'
    };
    return colorClasses[color] || 'bg-surface-100 text-text-secondary border-border hover:bg-surface-200';
  };

  const activeFilterCount = Object.values(activeFilters).reduce((count, values) => {
    if (Array.isArray(values)) return count + values.length;
    if (values !== null && values !== undefined) return count + 1;
    return count;
  }, 0);

  return (
    <div className={`bg-surface border border-border rounded-xl p-4 shadow-soft ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-text-primary">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-text-secondary hover:text-primary transition-smooth"
          >
            {showAdvanced ? 'Less' : 'More'}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-text-secondary hover:text-primary transition-smooth"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Categories</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {categoryOptions.map(category => {
            const isActive = activeFilters.categories?.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => handleFilterToggle('categories', category.id)}
                className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                  getFilterColorClass(category.color, isActive)
                }`}
              >
                <Icon name={category.icon} size={14} color="currentColor" />
                <span className="truncate">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {priceRangeOptions.map(price => {
            const isActive = activeFilters.priceRange?.includes(price.id);
            return (
              <button
                key={price.id}
                onClick={() => handleFilterToggle('priceRange', price.id)}
                className={`px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                  getFilterColorClass(price.color, isActive)
                }`}
              >
                {price.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Duration</h4>
        <div className="grid grid-cols-2 gap-2">
          {durationOptions.map(duration => {
            const isActive = activeFilters.duration?.includes(duration.id);
            return (
              <button
                key={duration.id}
                onClick={() => handleFilterToggle('duration', duration.id)}
                className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                  isActive 
                    ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                }`}
              >
                <Icon name={duration.icon} size={14} color="currentColor" />
                <span>{duration.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Distance */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Distance</h4>
            <div className="grid grid-cols-2 gap-2">
              {distanceOptions.map(distance => {
                const isActive = activeFilters.distance?.includes(distance.id);
                return (
                  <button
                    key={distance.id}
                    onClick={() => handleFilterToggle('distance', distance.id)}
                    className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                      isActive 
                        ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Icon name={distance.icon} size={14} color="currentColor" />
                    <span>{distance.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Minimum Rating</h4>
            <div className="flex space-x-2">
              {[4.5, 4.0, 3.5, 3.0].map(rating => {
                const isActive = activeFilters.minRating === rating;
                return (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex items-center space-x-1 px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                      isActive 
                        ? 'bg-warning text-white border-warning' :'bg-surface text-text-secondary border-border hover:border-warning hover:text-warning'
                    }`}
                  >
                    <Icon name="Star" size={14} color="currentColor" />
                    <span>{rating}+</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Accessibility</h4>
            <div className="grid grid-cols-2 gap-2">
              {accessibilityOptions.map(accessibility => {
                const isActive = activeFilters.accessibility?.includes(accessibility.id);
                return (
                  <button
                    key={accessibility.id}
                    onClick={() => handleFilterToggle('accessibility', accessibility.id)}
                    className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                      isActive 
                        ? 'bg-success text-white border-success' :'bg-surface text-text-secondary border-border hover:border-success hover:text-success'
                    }`}
                  >
                    <Icon name={accessibility.icon} size={14} color="currentColor" />
                    <span className="truncate">{accessibility.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Features */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Special Features</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'bookable', label: 'Bookable Online' },
                { id: 'guided', label: 'Guided Tours' },
                { id: 'audio', label: 'Audio Guide' },
                { id: 'multilang', label: 'Multi-language' },
                { id: 'offers', label: 'Special Offers' },
                { id: 'indoor', label: 'Indoor Activity' }
              ].map(feature => {
                const isActive = activeFilters.features?.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFilterToggle('features', feature.id)}
                    className={`px-3 py-2 border rounded-lg transition-smooth text-sm min-touch-target ${
                      isActive 
                        ? 'bg-info text-white border-info' :'bg-surface text-text-secondary border-border hover:border-info hover:text-info'
                    }`}
                  >
                    {feature.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreFilters;