import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherSafetyCard = ({ locationData }) => {
  const getSafetyStatusColor = (level) => {
    switch (level) {
      case 'safe':
        return 'text-success bg-success-50 border-success-200';
      case 'caution':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'alert':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-secondary bg-surface-100 border-border';
    }
  };

  const getSafetyIcon = (level) => {
    switch (level) {
      case 'safe':
        return 'Shield';
      case 'caution':
        return 'AlertTriangle';
      case 'alert':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-text-primary">Current Location</h3>
        <Icon name="MapPin" size={20} color="var(--color-primary)" />
      </div>

      <div className="space-y-3">
        {/* Location Info */}
        <div className="flex items-center space-x-2">
          <Icon name="Navigation" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm font-body text-text-primary">{locationData.city}, {locationData.country}</span>
        </div>

        {/* Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sun" size={16} color="var(--color-warning)" />
            <span className="text-sm font-body text-text-primary">{locationData.weather.condition}</span>
          </div>
          <span className="text-lg font-heading font-semibold text-text-primary">
            {locationData.weather.temperature}°C
          </span>
        </div>

        {/* Safety Status */}
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getSafetyStatusColor(locationData.safety.level)}`}>
          <Icon 
            name={getSafetyIcon(locationData.safety.level)} 
            size={16} 
            color={`var(--color-${locationData.safety.level === 'safe' ? 'success' : locationData.safety.level === 'caution' ? 'warning' : 'error'})`}
          />
          <div className="flex-1">
            <span className="text-sm font-body font-semibold">
              {locationData.safety.status}
            </span>
            <p className="text-xs font-caption text-text-secondary mt-1">
              {locationData.safety.description}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center space-x-1 text-xs font-caption text-text-secondary">
          <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
          <span>Updated {locationData.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};





export default WeatherSafetyCard;