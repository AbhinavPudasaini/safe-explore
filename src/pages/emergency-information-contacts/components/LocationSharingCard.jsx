import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSharingCard = ({ onLocationShare, emergencyContacts }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState('unknown');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Simulate getting current location
    const mockLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "123 Market Street, San Francisco, CA 94102",
      accuracy: 'high'
    };
    
    setCurrentLocation(mockLocation);
    setLocationAccuracy(mockLocation.accuracy);
    setLastUpdated(new Date());
  }, []);

  const handleShareLocation = async (contactIds = []) => {
    setIsSharing(true);
    
    try {
      // In a real app, this would send location to selected contacts
      const locationMessage = `EMERGENCY LOCATION SHARE:\n\nI need help! My current location is:\n${currentLocation.address}\n\nCoordinates: ${currentLocation.latitude}, ${currentLocation.longitude}\n\nPlease contact me immediately or send help.\n\nTime: ${new Date().toLocaleString()}`;
      
      // Simulate sharing with contacts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onLocationShare) {
        onLocationShare(currentLocation, contactIds);
      }
      
      // In a real app, this would use SMS API or messaging service
      console.log('Location shared with contacts:', contactIds);
      
    } catch (error) {
      console.error('Failed to share location:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleEmergencyShare = () => {
    // Share with all emergency contacts
    const emergencyContactIds = emergencyContacts
      .filter(contact => contact.isPrimary)
      .map(contact => contact.id);
    
    handleShareLocation(emergencyContactIds);
  };

  const handleCopyLocation = () => {
    if (currentLocation) {
      const locationText = `${currentLocation.address}\nCoordinates: ${currentLocation.latitude}, ${currentLocation.longitude}`;
      navigator.clipboard.writeText(locationText);
      // Show toast notification in real app
    }
  };

  const getAccuracyColor = () => {
    switch (locationAccuracy) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getAccuracyIcon = () => {
    switch (locationAccuracy) {
      case 'high':
        return 'MapPin';
      case 'medium':
        return 'Navigation';
      case 'low':
        return 'MapPin';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl shadow-medium">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Location Sharing
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Share your location in emergencies
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getAccuracyColor()}`}>
              <Icon name={getAccuracyIcon()} size={14} />
              <span className="text-xs font-caption capitalize">
                {locationAccuracy}
              </span>
            </div>
          </div>
        </div>

        {/* Current Location Display */}
        {currentLocation && (
          <div className="bg-surface-100 p-4 rounded-lg mb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-body font-semibold text-text-primary mb-1">
                  Current Location
                </h4>
                <p className="text-sm text-text-primary">
                  {currentLocation.address}
                </p>
                <p className="text-xs text-text-secondary font-mono mt-1">
                  {currentLocation.latitude}, {currentLocation.longitude}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={handleCopyLocation}
                className="min-touch-target"
              >
                Copy
              </Button>
            </div>
            
            {lastUpdated && (
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Clock" size={12} />
                <span>Updated {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        )}

        {/* Emergency Share Button */}
        <div className="space-y-3 mb-4">
          <Button
            variant="danger"
            size="lg"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={handleEmergencyShare}
            loading={isSharing}
            fullWidth
            className="min-touch-target"
          >
            {isSharing ? 'Sharing Location...' : 'Emergency Share Location'}
          </Button>
          
          <p className="text-xs text-text-secondary text-center">
            Shares location with all primary emergency contacts
          </p>
        </div>

        {/* Individual Contact Sharing */}
        <div className="space-y-3">
          <h4 className="font-body font-semibold text-text-primary">
            Share with Specific Contacts
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyContacts.slice(0, 4).map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleShareLocation([contact.id])}
                disabled={isSharing}
                className="flex items-center space-x-3 p-3 bg-surface-100 hover:bg-surface-200 rounded-lg transition-smooth min-touch-target disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-sm text-text-primary">
                    {contact.name}
                  </p>
                  <p className="text-xs text-text-secondary font-caption">
                    {contact.relationship}
                  </p>
                </div>
                <Icon name="Send" size={16} color="var(--color-text-secondary)" />
              </button>
            ))}
          </div>
        </div>

        {/* Location Services Info */}
        <div className="mt-6 p-4 bg-accent-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <h4 className="font-body font-semibold text-text-primary mb-1">
                Privacy & Security
              </h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Location shared only when you initiate</li>
                <li>• Data encrypted during transmission</li>
                <li>• Recipients receive one-time location link</li>
                <li>• Location history not stored on servers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        {currentLocation && (
          <div className="mt-4">
            <h4 className="font-body font-semibold text-text-primary mb-2">
              Location Preview
            </h4>
            <div className="w-full h-48 bg-surface-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Current Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&z=16&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharingCard;