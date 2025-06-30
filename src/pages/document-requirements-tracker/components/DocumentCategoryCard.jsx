import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCategoryCard = ({ 
  category, 
  onCategoryClick, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getCategoryIcon = (categoryType) => {
    const iconMap = {
      'identity': 'CreditCard',
      'visa': 'Passport',
      'financial': 'DollarSign',
      'educational': 'GraduationCap',
      'health': 'Heart'
    };
    return iconMap[categoryType] || 'FileText';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft overflow-hidden">
      <button
        onClick={() => onCategoryClick(category.id)}
        className="w-full p-4 text-left hover:bg-surface-100 transition-smooth"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon 
                name={getCategoryIcon(category.type)} 
                size={20} 
                color="var(--color-primary)" 
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary">
                {category.name}
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                {category.completedCount} of {category.totalCount} completed
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-caption text-text-secondary">
              {category.progressPercentage}%
            </span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              color="var(--color-text-secondary)" 
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(category.progressPercentage)}`}
            style={{ width: `${category.progressPercentage}%` }}
          ></div>
        </div>

        {/* Category Description */}
        <p className="text-sm text-text-secondary font-body">
          {category.description}
        </p>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-surface-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-body font-semibold text-text-primary">
              Quick Actions
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => onToggleExpanded(category.id)}
            >
              Upload Documents
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Get AI Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
            >
              Set Reminder
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentCategoryCard;