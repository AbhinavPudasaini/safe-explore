import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FeatureShortcutCard = ({ feature }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (feature.route) {
      navigate(feature.route);
    }
  };

  const getCardStyle = () => {
    if (feature.featured) {
      return 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 hover:from-primary-100 hover:to-secondary-100';
    }
    return 'bg-surface border-border hover:bg-surface-100';
  };

  return (
    <button
      onClick={handleCardClick}
      className={`w-full p-4 border rounded-lg shadow-soft transition-smooth text-left min-touch-target ${getCardStyle()}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          feature.featured ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-surface-200'
        }`}>
          <Icon 
            name={feature.icon} 
            size={20} 
            color={feature.featured ? 'white' : 'var(--color-primary)'} 
          />
        </div>
        
        {feature.badge && (
          <div className="flex items-center space-x-1">
            {feature.badge.type === 'count' && (
              <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-semibold">
                {feature.badge.value}
              </span>
            )}
            {feature.badge.type === 'new' && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-caption font-semibold">
                New
              </span>
            )}
            {feature.badge.type === 'urgent' && (
              <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            )}
          </div>
        )}
      </div>

      <h3 className="font-heading font-semibold text-text-primary mb-2">
        {feature.title}
      </h3>
      
      <p className="text-sm font-body text-text-secondary mb-3 line-clamp-2">
        {feature.description}
      </p>

      {feature.stats && (
        <div className="flex items-center space-x-4 text-xs font-caption text-text-secondary">
          {feature.stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Icon name={stat.icon} size={12} color="var(--color-text-secondary)" />
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {feature.quickActions && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs font-caption text-text-secondary">
            {feature.quickActions.label}
          </span>
          <Icon name="ArrowRight" size={14} color="var(--color-primary)" />
        </div>
      )}
    </button>
  );
};

export default FeatureShortcutCard;