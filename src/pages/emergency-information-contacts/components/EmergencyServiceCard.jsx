import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyServiceCard = ({ service, onCall, isEmergencyMode }) => {
  const getServiceIcon = (type) => {
    switch (type) {
      case 'police':
        return 'Shield';
      case 'medical':
        return 'Heart';
      case 'fire':
        return 'Flame';
      case 'general':
        return 'Phone';
      default:
        return 'Phone';
    }
  };

  const getServiceColor = (type) => {
    switch (type) {
      case 'police':
        return 'text-primary';
      case 'medical':
        return 'text-error';
      case 'fire':
        return 'text-warning';
      case 'general':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  const handleCall = () => {
    if (onCall) {
      onCall(service.number, service.name);
    }
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${service.number}`;
  };

  return (
    <div className={`bg-surface border-2 rounded-xl p-6 shadow-medium transition-smooth hover:shadow-heavy ${
      isEmergencyMode ? 'border-error bg-error-50' : 'border-border hover:border-primary-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isEmergencyMode ? 'bg-error text-white' : 'bg-surface-100'
          }`}>
            <Icon 
              name={getServiceIcon(service.type)} 
              size={24} 
              color={isEmergencyMode ? 'white' : `var(--color-${service.type === 'police' ? 'primary' : service.type === 'medical' ? 'error' : service.type === 'fire' ? 'warning' : 'accent'})`}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              {service.name}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {service.description}
            </p>
          </div>
        </div>
        
        {service.available24h && (
          <div className="flex items-center space-x-1 bg-accent-50 px-2 py-1 rounded-full">
            <Icon name="Clock" size={12} color="var(--color-accent)" />
            <span className="text-xs font-caption text-accent font-semibold">24/7</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} color="var(--color-text-secondary)" />
            <span className="font-mono text-lg font-semibold text-text-primary">
              {service.number}
            </span>
          </div>
          
          <Button
            variant={isEmergencyMode ? "danger" : "primary"}
            size="lg"
            iconName="Phone"
            iconPosition="left"
            onClick={handleCall}
            className="min-touch-target"
          >
            Call Now
          </Button>
        </div>

        {service.alternateNumber && (
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="PhoneCall" size={14} color="var(--color-text-secondary)" />
            <span className="text-text-secondary font-caption">
              Alternate: {service.alternateNumber}
            </span>
          </div>
        )}

        {service.languages && (
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary font-caption">
              Languages: {service.languages.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyServiceCard;