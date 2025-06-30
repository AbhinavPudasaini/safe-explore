import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LocationSelector = ({ currentLocation, onLocationChange }) => {
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentLocations = [
    { city: 'New York', country: 'United States', flag: '🇺🇸', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { city: 'London', country: 'United Kingdom', flag: '🇬🇧', coordinates: { lat: 51.5074, lng: -0.1278 } },
    { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', coordinates: { lat: 35.6762, lng: 139.6503 } },
    { city: 'Sydney', country: 'Australia', flag: '🇦🇺', coordinates: { lat: -33.8688, lng: 151.2093 } },
    { city: 'Toronto', country: 'Canada', flag: '🇨🇦', coordinates: { lat: 43.6532, lng: -79.3832 } },
    { city: 'Berlin', country: 'Germany', flag: '🇩🇪', coordinates: { lat: 52.5200, lng: 13.4050 } }
  ];

  const handleLocationDetection = () => {
    setIsDetecting(true);
    
    // Simulate location detection
    setTimeout(() => {
      const detectedLocation = {
        city: 'San Francisco',
        country: 'United States',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        accuracy: 'precise'
      };
      onLocationChange(detectedLocation);
      setIsDetecting(false);
      setIsLocationMenuOpen(false);
    }, 2000);
  };

  const handleLocationSelect = (location) => {
    onLocationChange({
      city: location.city,
      country: location.country,
      coordinates: location.coordinates,
      accuracy: 'manual'
    });
    setIsLocationMenuOpen(false);
  };

  const filteredLocations = recentLocations.filter(location =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Location Display Button */}
      <button
        onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-surface-100 hover:border-primary-200 transition-smooth min-touch-target"
      >
        <Icon name="MapPin" size={16} color="var(--color-primary)" />
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
        <>
          <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-heavy z-50 animate-slide-down">
            <div className="p-4">
              {/* Current Location Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body text-text-primary">Current Location</span>
                </div>
                <span className="text-xs font-caption text-primary">
                  {currentLocation.accuracy || 'manual'}
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

              {/* Search Input */}
              <div className="mb-4">
                <label className="block text-sm font-caption text-text-secondary mb-2">
                  Search locations:
                </label>
                <Input
                  type="search"
                  placeholder="Search city or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location List */}
              <div>
                <h4 className="text-sm font-caption text-text-secondary mb-2">
                  {searchQuery ? 'Search Results' : 'Popular Locations'}
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {filteredLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(location)}
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
                    >
                      <span className="text-lg">{location.flag}</span>
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-sm font-body text-text-primary">
                          {location.city}
                        </span>
                        <span className="text-xs font-caption text-text-secondary">
                          {location.country}
                        </span>
                      </div>
                      {currentLocation.city === location.city && (
                        <Icon name="Check" size={16} color="var(--color-success)" />
                      )}
                    </button>
                  ))}
                  
                  {filteredLocations.length === 0 && searchQuery && (
                    <div className="text-center py-4">
                      <Icon name="Search" size={24} color="var(--color-text-secondary)" className="mx-auto mb-2" />
                      <p className="text-sm text-text-secondary font-caption">
                        No locations found for "{searchQuery}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Services Notice */}
              <div className="mt-4 p-3 bg-surface-100 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                  <div>
                    <p className="text-xs font-caption text-text-secondary">
                      Location data helps provide relevant local services and accurate distance calculations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay to close menu */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsLocationMenuOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default LocationSelector;