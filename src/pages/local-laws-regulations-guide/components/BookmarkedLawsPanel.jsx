import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BookmarkedLawsPanel = ({ 
  bookmarkedLaws = [], 
  onRemoveBookmark,
  onLawSelect,
  className = ""
}) => {
  const [sortBy, setSortBy] = useState('recent'); // recent, category, severity

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return { name: 'AlertTriangle', color: 'var(--color-error)' };
      case 'important':
        return { name: 'AlertCircle', color: 'var(--color-warning)' };
      case 'advisory':
        return { name: 'Info', color: 'var(--color-info)' };
      default:
        return { name: 'Info', color: 'var(--color-text-secondary)' };
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      critical: 'bg-error-50 text-error border-error-200',
      important: 'bg-warning-50 text-warning border-warning-200',
      advisory: 'bg-info-50 text-info border-info-200'
    };
    return colors[severity] || 'bg-surface-100 text-text-secondary border-border';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      traffic: 'Car',
      public: 'Users',
      cultural: 'Heart',
      business: 'Briefcase',
      unique: 'Zap'
    };
    return icons[category] || 'FileText';
  };

  const sortedLaws = [...bookmarkedLaws].sort((a, b) => {
    switch (sortBy) {
      case 'category':
        return a.category.localeCompare(b.category);
      case 'severity':
        const severityOrder = { critical: 3, important: 2, advisory: 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
      case 'recent':
      default:
        return new Date(b.bookmarkedAt || 0) - new Date(a.bookmarkedAt || 0);
    }
  });

  if (bookmarkedLaws.length === 0) {
    return (
      <div className={`bg-surface border border-border rounded-xl p-6 text-center ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 rounded-full flex items-center justify-center">
          <Icon name="Bookmark" size={24} color="var(--color-text-secondary)" />
        </div>
        <h3 className="font-heading font-semibold text-text-primary mb-2">
          No Bookmarked Laws
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Bookmark important laws and regulations for quick reference
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-primary hover:text-primary-600 text-sm font-medium transition-smooth"
        >
          Browse Laws
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-surface border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name="Bookmark" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary">
                Bookmarked Laws
              </h3>
              <p className="text-sm text-text-secondary">
                {bookmarkedLaws.length} saved {bookmarkedLaws.length === 1 ? 'law' : 'laws'}
              </p>
            </div>
          </div>

          {/* Sort Options */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface-100 border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="recent">Recent</option>
              <option value="category">Category</option>
              <option value="severity">Severity</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Icon name="ChevronDown" size={14} color="var(--color-text-secondary)" />
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Laws List */}
      <div className="max-h-96 overflow-y-auto">
        {sortedLaws.map((law, index) => {
          const severityIcon = getSeverityIcon(law.severity);
          const categoryIcon = getCategoryIcon(law.category);
          
          return (
            <div 
              key={law.id} 
              className={`p-4 sm:p-6 hover:bg-surface-50 transition-smooth cursor-pointer ${
                index < sortedLaws.length - 1 ? 'border-b border-border' : ''
              }`}
              onClick={() => onLawSelect?.(law)}
            >
              <div className="flex items-start space-x-3">
                {/* Severity Icon */}
                <Icon 
                  name={severityIcon.name} 
                  size={16} 
                  color={severityIcon.color}
                  className="mt-1 flex-shrink-0"
                />

                {/* Law Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-body font-medium text-text-primary truncate">
                      {law.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-caption rounded-full border flex-shrink-0 ${getSeverityBadge(law.severity)}`}>
                      {law.severity}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={categoryIcon} 
                      size={14} 
                      color="var(--color-text-secondary)" 
                    />
                    <span className="text-xs text-text-secondary capitalize">
                      {law.category.replace('-', ' ')}
                    </span>
                    {law.bookmarkedAt && (
                      <>
                        <span className="text-xs text-text-secondary">•</span>
                        <span className="text-xs text-text-secondary">
                          {new Date(law.bookmarkedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                    {law.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-1 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark?.(law.id);
                    }}
                    className="p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-smooth min-touch-target"
                    title="Remove bookmark"
                  >
                    <Icon name="BookmarkX" size={14} color="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkedLawsPanel;