import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCategoryCard = ({ category, onCategorySelect }) => {
  const handleCategoryClick = () => {
    onCategorySelect(category);
  };

  return (
    <button
      onClick={handleCategoryClick}
      className="w-full bg-surface border border-border rounded-lg p-4 hover:bg-surface-100 hover:border-primary-200 transition-smooth min-touch-target shadow-soft"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor}`}>
          <Icon 
            name={category.icon} 
            size={24} 
            color={category.iconColor}
          />
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">
            {category.name}
          </h3>
          <p className="text-xs text-text-secondary font-caption">
            {category.count} services nearby
          </p>
        </div>
        
        {category.hasUpdates && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success font-caption">
              Recently updated
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ServiceCategoryCard;