import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServiceFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'
  ];

  const costRanges = [
    { label: 'Free', value: 'free' },
    { label: 'Low cost ($)', value: 'low' },
    { label: 'Moderate ($$)', value: 'moderate' },
    { label: 'Premium ($$$)', value: 'premium' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleLanguageToggle = (language) => {
    const currentLanguages = filters.languages || [];
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(lang => lang !== language)
      : [...currentLanguages, language];
    
    handleFilterChange('languages', updatedLanguages);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.languages && filters.languages.length > 0) count++;
    if (filters.accessibility) count++;
    if (filters.costRange) count++;
    if (filters.openNow) count++;
    if (filters.hasBooking) count++;
    return count;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-text-primary)" />
          <h3 className="font-heading font-semibold text-text-primary">
            Filters
          </h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              color="var(--color-text-secondary)" 
            />
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterChange('openNow', !filters.openNow)}
          className={`px-3 py-2 rounded-lg text-sm font-caption transition-smooth min-touch-target ${
            filters.openNow
              ? 'bg-success text-success-foreground'
              : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
          }`}
        >
          <Icon 
            name="Clock" 
            size={14} 
            color={filters.openNow ? "white" : "var(--color-text-secondary)"} 
            className="inline mr-1"
          />
          Open now
        </button>
        
        <button
          onClick={() => handleFilterChange('hasBooking', !filters.hasBooking)}
          className={`px-3 py-2 rounded-lg text-sm font-caption transition-smooth min-touch-target ${
            filters.hasBooking
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
          }`}
        >
          <Icon 
            name="Calendar" 
            size={14} 
            color={filters.hasBooking ? "white" : "var(--color-text-secondary)"} 
            className="inline mr-1"
          />
          Online booking
        </button>
        
        <button
          onClick={() => handleFilterChange('accessibility', !filters.accessibility)}
          className={`px-3 py-2 rounded-lg text-sm font-caption transition-smooth min-touch-target ${
            filters.accessibility
              ? 'bg-accent text-accent-foreground'
              : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
          }`}
        >
          <Icon 
            name="Accessibility" 
            size={14} 
            color={filters.accessibility ? "white" : "var(--color-text-secondary)"} 
            className="inline mr-1"
          />
          Accessible
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 border-t border-border pt-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-caption text-text-secondary mb-2">
              Search services
            </label>
            <Input
              type="search"
              placeholder="Search by name or service type..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Cost Range */}
          <div>
            <label className="block text-sm font-caption text-text-secondary mb-2">
              Cost range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {costRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleFilterChange('costRange', 
                    filters.costRange === range.value ? null : range.value
                  )}
                  className={`px-3 py-2 rounded-lg text-sm font-caption transition-smooth min-touch-target ${
                    filters.costRange === range.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-caption text-text-secondary mb-2">
              Languages spoken
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {languageOptions.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageToggle(language)}
                  className={`px-3 py-2 rounded-lg text-sm font-caption transition-smooth min-touch-target ${
                    filters.languages && filters.languages.includes(language)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <label className="block text-sm font-caption text-text-secondary mb-2">
              Maximum distance: {filters.maxDistance || 10} km
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.maxDistance || 10}
              onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
              className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-secondary font-caption mt-1">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceFilters;