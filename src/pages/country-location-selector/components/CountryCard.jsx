import React from 'react';
import Icon from '../../../components/AppIcon';

const CountryCard = ({ country, isSelected = false, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(country)}
      className={`
        w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200
        ${isSelected 
          ? 'border-primary bg-primary-50 shadow-sm' 
          : 'border-border bg-surface hover:bg-surface-100 hover:border-primary-200'
        }
      `}
    >
      {/* Flag */}
      <span className="text-xl flex-shrink-0">
        {country.flag}
      </span>

      {/* Country Info */}
      <div className="flex-1 text-left">
        <h4 className={`font-body font-medium ${
          isSelected ? 'text-primary' : 'text-text-primary'
        }`}>
          {country.name}
        </h4>
        <p className="text-xs text-text-secondary">
          {country.continent}
        </p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="flex-shrink-0">
          <Icon name="Check" size={16} color="var(--color-primary)" />
        </div>
      )}
    </button>
  );
};

export default CountryCard;