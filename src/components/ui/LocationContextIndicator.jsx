import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationContextIndicator = ({ className = "" }) => {
  const [currentLocation, setCurrentLocation] = useState({
    city: 'Current Location',
    country: '',
    accuracy: 'approximate'
  });
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const recentLocations = [
    { city: 'New York', country: 'United States', flag: '🇺🇸' },
    { city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
    { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
    { city: 'Sydney', country: 'Australia', flag: '🇦🇺' }
  ];

  const handleLocationDetection = () => {
    setIsDetecting(true);
    
    // Simulate location detection
    setTimeout(() => {
      setCurrentLocation({
        city: 'San Francisco',
        country: 'United States',
        accuracy: 'precise'
      });
      setIsDetecting(false);
    }, 2000);
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation({
      city: location.city,
      country: location.country,
      accuracy: 'manual'
    });
    setIsLocationMenuOpen(false);
  };

  const toggleLocationMenu = () => {
    setIsLocationMenuOpen(!isLocationMenuOpen);
  };

  const getAccuracyColor = () => {
    switch (currentLocation.accuracy) {
      case 'precise':
        return 'text-success';
      case 'approximate':
        return 'text-warning';
      case 'manual':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getAccuracyIcon = () => {
    switch (currentLocation.accuracy) {
      case 'precise':
        return 'MapPin';
      case 'approximate':
        return 'Navigation';
      case 'manual':
        return 'Map';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Location Display Button */}
      <button
        onClick={toggleLocationMenu}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
      >
        <div className="relative">
          <Icon 
            name={getAccuracyIcon()} 
            size={16} 
            color={`var(--color-${currentLocation.accuracy === 'precise' ? 'success' : currentLocation.accuracy === 'approximate' ? 'warning' : 'primary'})`}
          />
          {isDetecting && (
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          )}
        </div>
        
        <div className="flex flex-col items-start">
          <span className="text-sm font-body text-text-primary">
            {currentLocation.city}
          </span>
          {currentLocation.country && (
            <span className="text-xs font-caption text-text-secondary">
              {currentLocation.country}
            </span>
          )}
        </div>
        
        <Icon 
          name={isLocationMenuOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          color="var(--color-text-secondary)" 
        />
      </button>

      {/* Location Menu Dropdown */}
      {isLocationMenuOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-medium z-50 animate-slide-down">
          <div className="p-4">
            {/* Current Location Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
                <span className="text-sm font-body text-text-primary">Current Location</span>
              </div>
              <span className={`text-xs font-caption ${getAccuracyColor()}`}>
                {currentLocation.accuracy}
              </span>
            </div>

            {/* Auto-detect Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="Crosshair"
              iconPosition="left"
              onClick={handleLocationDetection}
              disabled={isDetecting}
              loading={isDetecting}
              fullWidth
              className="mb-4"
            >
              {isDetecting ? 'Detecting Location...' : 'Auto-detect Location'}
            </Button>

            {/* Manual Location Input */}
            <div className="mb-4">
              <label className="block text-sm font-caption text-text-secondary mb-2">
                Or enter manually:
              </label>
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  color="var(--color-text-secondary)"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search city or address..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-sm"
                />
              </div>
            </div>

            {/* Recent Locations */}
            <div>
              <h4 className="text-sm font-caption text-text-secondary mb-2">Recent Locations</h4>
              <div className="space-y-1">
                {recentLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
                  >
                    <span className="text-lg">{location.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-body text-text-primary">
                        {location.city}
                      </span>
                      <span className="text-xs font-caption text-text-secondary">
                        {location.country}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Services Notice */}
            <div className="mt-4 p-3 bg-surface-100 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <p className="text-xs font-caption text-text-secondary">
                    Location data helps provide relevant local services and emergency information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {isLocationMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLocationMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LocationContextIndicator;