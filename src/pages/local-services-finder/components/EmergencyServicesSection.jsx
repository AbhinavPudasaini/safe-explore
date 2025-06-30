import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyServicesSection = ({ emergencyServices, onEmergencyCall }) => {
  return (
    <div className="bg-gradient-to-r from-error-50 to-warning-50 border border-error-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
        <h2 className="font-heading font-bold text-error text-lg">
          Emergency Services
        </h2>
      </div>
      
      <p className="text-sm text-text-secondary font-body mb-4">
        Quick access to essential emergency contacts in your area
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {emergencyServices.map((service) => (
          <div
            key={service.id}
            className="bg-surface border border-border rounded-lg p-3 hover:border-error-200 transition-smooth"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${service.bgColor}`}>
                <Icon 
                  name={service.icon} 
                  size={20} 
                  color={service.iconColor}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary text-sm">
                  {service.name}
                </h3>
                <p className="text-xs text-text-secondary font-caption">
                  {service.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono font-bold text-error">
                {service.number}
              </span>
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => onEmergencyCall(service.number)}
              >
                Call
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-surface-100 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-xs font-caption text-text-secondary">
              <strong>Important:</strong> These numbers are for your current location. 
              Emergency numbers may vary by country and region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServicesSection;