import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const LocationDetector = ({ onDetect, isDetecting = false }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
          <Icon name="MapPin" size={16} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-text-primary">
            Auto-Detect Location
          </h3>
          <p className="text-xs text-text-secondary">
            Use your device's GPS for quick setup
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        fullWidth
        iconName={isDetecting ? "Loader" : "Navigation"}
        iconPosition="left"
        onClick={onDetect}
        disabled={isDetecting}
        className={isDetecting ? "animate-pulse" : ""}
      >
        {isDetecting ? 'Detecting Location...' : 'Detect My Location'}
      </Button>

      

      <div className="mt-3 text-xs text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={12} color="var(--color-text-secondary)" />
          <span>Your location data is processed securely and never stored</span>
        </div>
      </div>
    </div>
  );
};


export default LocationDetector;