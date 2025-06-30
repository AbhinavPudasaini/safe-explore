import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LawSearchBar = ({ 
  onSearch, 
  onFilterChange, 
  activeFilters = [], 
  searchPlaceholder = "Search laws, regulations, keywords..." 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const filterOptions = [
    { id: 'critical', label: 'Critical', color: 'error' },
    { id: 'important', label: 'Important', color: 'warning' },
    { id: 'advisory', label: 'Advisory', color: 'info' },
    { id: 'traffic', label: 'Traffic', color: 'blue' },
    { id: 'public', label: 'Public Behavior', color: 'green' },
    { id: 'cultural', label: 'Cultural', color: 'purple' },
    { id: 'business', label: 'Business', color: 'orange' },
    { id: 'unique', label: 'Unique Laws', color: 'red' }
  ];

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, onSearch]);

  const handleFilterToggle = (filterId) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    onFilterChange?.([]);
    onSearch?.('');
  };

  const getFilterColorClass = (color, isActive) => {
    const colorClasses = {
      error: isActive ? 'bg-error text-white' : 'bg-error-50 text-error border-error-200 hover:bg-error-100',
      warning: isActive ? 'bg-warning text-white' : 'bg-warning-50 text-warning border-warning-200 hover:bg-warning-100',
      info: isActive ? 'bg-info text-white' : 'bg-info-50 text-info border-info-200 hover:bg-info-100',
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
      red: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
    };
    return colorClasses[color] || 'bg-surface-100 text-text-secondary border-border hover:bg-surface-200';
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-4 shadow-soft">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-smooth ${
          isSearchFocused ? 'text-primary' : 'text-text-secondary'
        }`}>
          <Icon name="Search" size={18} color="currentColor" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder={searchPlaceholder}
          className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-surface transition-smooth min-touch-target ${
            isSearchFocused 
              ? 'border-primary ring-2 ring-primary-100' :'border-border hover:border-primary-300'
          } focus:outline-none`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name="X" size={16} color="currentColor" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface-100 rounded-lg transition-smooth min-touch-target"
        >
          <Icon name="Filter" size={16} color="currentColor" />
          <span>Filters</span>
          {activeFilters.length > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFilters.length}
            </span>
          )}
          <Icon 
            name={showFilters ? "ChevronUp" : "ChevronDown"} 
            size={14} 
            color="currentColor" 
          />
        </button>

        {(searchQuery || activeFilters.length > 0) && (
          <button
            onClick={handleClearAll}
            className="text-sm text-text-secondary hover:text-primary transition-smooth"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {activeFilters.length > 0 && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-3">
          {activeFilters.map(filterId => {
            const filter = filterOptions.find(f => f.id === filterId);
            return filter ? (
              <span
                key={filterId}
                className={`inline-flex items-center space-x-1 px-2 py-1 text-xs rounded-full border ${
                  getFilterColorClass(filter.color, true)
                }`}
              >
                <span>{filter.label}</span>
                <button
                  onClick={() => handleFilterToggle(filterId)}
                  className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-smooth"
                >
                  <Icon name="X" size={12} color="currentColor" />
                </button>
              </span>
            ) : null;
          })}
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-3 pt-3 border-t border-border">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Severity Level</h4>
            <div className="flex flex-wrap gap-2">
              {filterOptions.slice(0, 3).map(filter => {
                const isActive = activeFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterToggle(filter.id)}
                    className={`px-3 py-2 text-sm border rounded-lg transition-smooth min-touch-target ${
                      getFilterColorClass(filter.color, isActive)
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              {filterOptions.slice(3).map(filter => {
                const isActive = activeFilters.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterToggle(filter.id)}
                    className={`px-3 py-2 text-sm border rounded-lg transition-smooth min-touch-target ${
                      getFilterColorClass(filter.color, isActive)
                    }`}
                  >
                    {filter.label}
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

export default LawSearchBar;