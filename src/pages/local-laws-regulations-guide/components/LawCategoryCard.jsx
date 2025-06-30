import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LawCategoryCard = ({ 
  category, 
  isExpanded, 
  onToggle, 
  onLawBookmark, 
  bookmarkedLaws = [] 
}) => {
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

  return (
    <div className="bg-surface border border-border rounded-xl shadow-soft overflow-hidden">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between hover:bg-surface-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            category.id === 'traffic' ? 'bg-blue-50 text-blue-600' :
            category.id === 'public' ? 'bg-green-50 text-green-600' :
            category.id === 'cultural' ? 'bg-purple-50 text-purple-600' :
            category.id === 'business'? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
          }`}>
            <Icon 
              name={category.icon} 
              size={20} 
              color="currentColor"
            />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-text-primary">
              {category.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {category.laws?.length || 0} laws • {category.criticalCount || 0} critical
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Priority Indicator */}
          {category.criticalCount > 0 && (
            <div className="w-2 h-2 bg-error rounded-full"></div>
          )}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color="var(--color-text-secondary)" 
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {category.laws?.map((law, index) => {
            const severityIcon = getSeverityIcon(law.severity);
            const isBookmarked = bookmarkedLaws.includes(law.id);
            
            return (
              <div 
                key={law.id} 
                className={`p-4 sm:p-6 ${
                  index < category.laws.length - 1 ? 'border-b border-border' : ''
                } hover:bg-surface-50 transition-smooth`}
              >
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1">
                    {/* Law Header */}
                    <div className="flex items-start space-x-3 mb-3">
                      <Icon 
                        name={severityIcon.name} 
                        size={18} 
                        color={severityIcon.color}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-body font-semibold text-text-primary">
                            {law.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-caption rounded-full border ${getSeverityBadge(law.severity)}`}>
                            {law.severity}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed mb-3">
                          {law.description}
                        </p>
                      </div>
                    </div>

                    {/* Penalties */}
                    {law.penalties && (
                      <div className="mb-3 pl-6">
                        <p className="text-sm font-medium text-text-primary mb-1">
                          Potential Penalties:
                        </p>
                        <p className="text-sm text-error">
                          {law.penalties}
                        </p>
                      </div>
                    )}

                    {/* Examples */}
                    {law.examples && law.examples.length > 0 && (
                      <div className="pl-6">
                        <p className="text-sm font-medium text-text-primary mb-1">
                          Examples:
                        </p>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {law.examples.map((example, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => onLawBookmark(law.id)}
                      className={`p-2 rounded-lg transition-smooth min-touch-target ${
                        isBookmarked 
                          ? 'text-primary bg-primary-50 hover:bg-primary-100' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <Icon 
                        name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
                        size={16} 
                        color="currentColor"
                      />
                    </button>
                    
                    <button
                      className="p-2 text-text-secondary hover:text-primary hover:bg-surface-100 rounded-lg transition-smooth min-touch-target"
                      title="Share law information"
                    >
                      <Icon name="Share" size={16} color="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LawCategoryCard;