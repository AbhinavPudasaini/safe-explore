import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceMapView = ({ services, selectedService, onServiceSelect, userLocation }) => {
  const mapCenter = userLocation || { lat: 40.7128, lng: -74.0060 }; // Default to NYC

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="h-96 lg:h-full relative">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Services Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="bg-surface border border-border rounded-lg p-2 shadow-medium hover:bg-surface-100 transition-smooth min-touch-target">
            <Icon name="Plus" size={16} color="var(--color-text-primary)" />
          </button>
          <button className="bg-surface border border-border rounded-lg p-2 shadow-medium hover:bg-surface-100 transition-smooth min-touch-target">
            <Icon name="Minus" size={16} color="var(--color-text-primary)" />
          </button>
          <button className="bg-surface border border-border rounded-lg p-2 shadow-medium hover:bg-surface-100 transition-smooth min-touch-target">
            <Icon name="Crosshair" size={16} color="var(--color-text-primary)" />
          </button>
        </div>

        {/* Service Markers Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-surface border border-border rounded-lg p-3 shadow-medium">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-caption text-text-secondary">
                Showing {services.length} services
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-xs text-text-secondary font-caption">Healthcare</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-xs text-text-secondary font-caption">Legal</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-xs text-text-secondary font-caption">Education</span>
                </div>
              </div>
            </div>
            
            {selectedService && (
              <div className="border-t border-border pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-text-primary text-sm">
                      {selectedService.name}
                    </h4>
                    <p className="text-xs text-text-secondary font-caption">
                      {selectedService.address}
                    </p>
                  </div>
                  <button
                    onClick={() => onServiceSelect(selectedService)}
                    className="ml-2 p-1 rounded hover:bg-surface-100 transition-smooth"
                  >
                    <Icon name="ExternalLink" size={14} color="var(--color-primary)" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMapView;