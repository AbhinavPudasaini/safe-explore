import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSortControls = ({ 
  onFilterChange, 
  onSortChange, 
  onSearchChange,
  activeFilters,
  searchQuery 
}) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Documents', count: 24 },
    { id: 'not-started', label: 'Not Started', count: 8 },
    { id: 'in-progress', label: 'In Progress', count: 6 },
    { id: 'completed', label: 'Completed', count: 7 },
    { id: 'verified', label: 'Verified', count: 3 },
    { id: 'overdue', label: 'Overdue', count: 2 }
  ];

  const sortOptions = [
    { id: 'due-date', label: 'Due Date', icon: 'Calendar' },
    { id: 'priority', label: 'Priority', icon: 'AlertTriangle' },
    { id: 'status', label: 'Status', icon: 'CheckCircle' },
    { id: 'name', label: 'Name (A-Z)', icon: 'ArrowUp' },
    { id: 'category', label: 'Category', icon: 'Folder' }
  ];

  const categoryFilters = [
    { id: 'identity', label: 'Identity Documents', icon: 'CreditCard' },
    { id: 'visa', label: 'Visa/Immigration', icon: 'Passport' },
    { id: 'financial', label: 'Financial Records', icon: 'DollarSign' },
    { id: 'educational', label: 'Educational Certificates', icon: 'GraduationCap' },
    { id: 'health', label: 'Health Documentation', icon: 'Heart' }
  ];

  const handleFilterSelect = (filterId) => {
    onFilterChange(filterId);
    setIsFilterMenuOpen(false);
  };

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsSortMenuOpen(false);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        {/* Search Bar */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              color="var(--color-text-secondary)"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <Input
              type="search"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center space-x-3">
          {/* Filter Button */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="relative"
            >
              Filter
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-semibold">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>

            {/* Filter Dropdown */}
            {isFilterMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-medium z-50">
                <div className="p-4">
                  <h4 className="font-body font-semibold text-text-primary mb-3">
                    Filter by Status
                  </h4>
                  <div className="space-y-2 mb-4">
                    {filterOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleFilterSelect(option.id)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-smooth min-touch-target ${
                          activeFilters.status === option.id
                            ? 'bg-primary-100 text-primary' :'hover:bg-surface-100 text-text-primary'
                        }`}
                      >
                        <span className="font-caption">{option.label}</span>
                        <span className="text-xs text-text-secondary bg-surface-200 px-2 py-1 rounded-full">
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <h4 className="font-body font-semibold text-text-primary mb-3">
                    Filter by Category
                  </h4>
                  <div className="space-y-2">
                    {categoryFilters.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => onFilterChange('category', category.id)}
                        className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-smooth min-touch-target ${
                          activeFilters.category === category.id
                            ? 'bg-primary-100 text-primary' :'hover:bg-surface-100 text-text-primary'
                        }`}
                      >
                        <Icon 
                          name={category.icon} 
                          size={16} 
                          color={activeFilters.category === category.id ? "var(--color-primary)" : "var(--color-text-secondary)"} 
                        />
                        <span className="font-caption">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sort Button */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowUpDown"
              iconPosition="left"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            >
              Sort
            </Button>

            {/* Sort Dropdown */}
            {isSortMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-medium z-50">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortSelect(option.id)}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
                    >
                      <Icon 
                        name={option.icon} 
                        size={16} 
                        color="var(--color-text-secondary)" 
                      />
                      <span className="font-caption text-text-primary">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="hidden lg:flex items-center space-x-1 bg-surface-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Grid3X3"
              className="w-8 h-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="List"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-sm font-caption text-text-secondary">
            Active filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value || value === 'all') return null;
              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary-100 text-primary px-2 py-1 rounded-full"
                >
                  <span className="text-xs font-caption">{value}</span>
                  <button
                    onClick={() => onFilterChange(key, null)}
                    className="hover:bg-primary-200 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} color="var(--color-primary)" />
                  </button>
                </div>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilterChange('clear')}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdowns */}
      {(isFilterMenuOpen || isSortMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsFilterMenuOpen(false);
            setIsSortMenuOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default FilterSortControls;