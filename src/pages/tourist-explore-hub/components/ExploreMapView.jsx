import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ExploreMapView = ({ 
  experiences = [], 
  onExperienceSelect, 
  selectedExperience = null,
  userLocation = null,
  className = ""
}) => {
  const [mapMode, setMapMode] = useState('standard'); // standard, satellite, hybrid
  const [showRouting, setShowRouting] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const mapRef = useRef(null);

  const getCategoryColor = (category) => {
    const colors = {
      'attractions': '#3B82F6', // blue
      'cuisine': '#F97316', // orange
      'culture': '#8B5CF6', // purple
      'outdoor': '#10B981', // green
      'hidden': '#EF4444', // red
      'shopping': '#EC4899', // pink
      'nightlife': '#6366F1', // indigo
      'adventure': '#14B8A6' // teal
    };
    return colors[category] || '#6B7280';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'attractions': 'Camera',
      'cuisine': 'Utensils',
      'culture': 'Heart',
      'outdoor': 'Trees',
      'hidden': 'MapPin',
      'shopping': 'ShoppingBag',
      'nightlife': 'Moon',
      'adventure': 'Mountain'
    };
    return icons[category] || 'MapPin';
  };

  // Mock route data
  const routeOptions = [
    {
      id: 'walking',
      name: 'Walking Route',
      duration: '2h 30m',
      distance: '3.2 km',
      icon: 'Navigation',
      color: '#10B981'
    },
    {
      id: 'transit',
      name: 'Public Transit',
      duration: '45 min',
      distance: '12 km',
      icon: 'Bus',
      color: '#3B82F6'
    },
    {
      id: 'driving',
      name: 'Driving',
      duration: '20 min',
      distance: '8.5 km',
      icon: 'Car',
      color: '#F97316'
    }
  ];

  const handleMarkerClick = (experience) => {
    onExperienceSelect?.(experience);
  };

  const handleGetDirections = (experience) => {
    setSelectedRoute(experience);
    setShowRouting(true);
  };

  const handleRouteSelect = (routeType) => {
    // In a real app, this would integrate with mapping services
    console.log('Selected route:', routeType, 'to:', selectedRoute?.title);
    setShowRouting(false);
    setSelectedRoute(null);
  };

  return (
    <div className={`bg-surface border border-border rounded-xl overflow-hidden shadow-soft ${className}`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Map" size={18} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Explore Map
            </h3>
            <p className="text-sm text-text-secondary">
              {experiences.length} experiences in your area
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex items-center space-x-2">
          {/* Map Mode Toggle */}
          <div className="flex bg-surface-100 rounded-lg p-1">
            {[
              { id: 'standard', icon: 'Map', label: 'Map' },
              { id: 'satellite', icon: 'Globe', label: 'Satellite' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setMapMode(mode.id)}
                className={`px-3 py-1.5 rounded-md text-sm transition-smooth min-touch-target ${
                  mapMode === mode.id 
                    ? 'bg-white text-primary shadow-soft' 
                    : 'text-text-secondary hover:text-primary'
                }`}
                title={mode.label}
              >
                <Icon name={mode.icon} size={14} color="currentColor" />
              </button>
            ))}
          </div>

          {/* Full Screen Toggle */}
          <button
            className="p-2 bg-surface-100 hover:bg-surface-200 rounded-lg transition-smooth min-touch-target"
            title="Full screen"
          >
            <Icon name="Maximize" size={16} color="var(--color-text-secondary)" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 lg:h-[500px] bg-surface-100">
        {/* Mock Map Background */}
        <div 
          ref={mapRef} 
          className="w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 relative overflow-hidden"
        >
          {/* Mock Street Grid */}
          <div className="absolute inset-0 opacity-20">
            {/* Horizontal lines */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-text-muted"
                style={{ top: `${(i + 1) * 12.5}%` }}
              />
            ))}
            {/* Vertical lines */}
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-text-muted"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>

          {/* User Location */}
          {userLocation && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ 
                left: '50%', 
                top: '50%' 
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full opacity-30 animate-ping"></div>
              </div>
            </div>
          )}

          {/* Experience Markers */}
          {experiences.map((experience, index) => {
            const isSelected = selectedExperience?.id === experience.id;
            const color = getCategoryColor(experience.category);
            const icon = getCategoryIcon(experience.category);
            
            // Mock positioning
            const left = 20 + (index % 6) * 15;
            const top = 15 + Math.floor(index / 6) * 20;
            
            return (
              <div
                key={experience.id}
                className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10 ${
                  isSelected ? 'z-30' : ''
                }`}
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%` 
                }}
                onClick={() => handleMarkerClick(experience)}
              >
                {/* Marker */}
                <div className="relative">
                  <div 
                    className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${
                      isSelected ? 'scale-125' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <Icon name={icon} size={14} color="white" />
                  </div>
                  
                  {/* Price indicator */}
                  {experience.priceRange === 'free' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success text-white text-xs flex items-center justify-center rounded-full font-bold">
                      F
                    </div>
                  )}
                </div>

                {/* Tooltip */}
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-border rounded-lg shadow-elevated p-3 z-40">
                    <div className="flex items-start space-x-3">
                      <img
                        src={experience.image || '/assets/images/no_image.png'}
                        alt={experience.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary line-clamp-1 mb-1">
                          {experience.title}
                        </h4>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                          {experience.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-text-secondary">
                            {experience.rating && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" size={12} color="var(--color-warning)" />
                                <span>{experience.rating.toFixed(1)}</span>
                              </div>
                            )}
                            {experience.distance && (
                              <span>{experience.distance}</span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGetDirections(experience);
                            }}
                            className="text-primary hover:text-primary-600 text-sm font-medium"
                          >
                            Directions
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Map Attribution */}
          <div className="absolute bottom-2 right-2 text-xs text-text-muted bg-white bg-opacity-80 px-2 py-1 rounded">
            Map data © SafeExplore
          </div>
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute top-4 left-4 flex flex-col space-y-1 z-20">
          <button className="w-10 h-10 bg-white border border-border rounded-lg shadow-soft hover:bg-surface-50 transition-smooth flex items-center justify-center">
            <Icon name="Plus" size={16} color="var(--color-text-primary)" />
          </button>
          <button className="w-10 h-10 bg-white border border-border rounded-lg shadow-soft hover:bg-surface-50 transition-smooth flex items-center justify-center">
            <Icon name="Minus" size={16} color="var(--color-text-primary)" />
          </button>
        </div>

        {/* Center on User Location */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white border border-border rounded-lg shadow-soft hover:bg-surface-50 transition-smooth flex items-center justify-center z-20"
          title="Center on your location"
        >
          <Icon name="Navigation" size={16} color="var(--color-text-primary)" />
        </button>
      </div>

      {/* Route Planning Modal */}
      {showRouting && selectedRoute && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-text-primary">
                Get Directions
              </h3>
              <button
                onClick={() => setShowRouting(false)}
                className="p-1 hover:bg-surface-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-text-secondary mb-2">
                Directions to:
              </p>
              <p className="font-medium text-text-primary">
                {selectedRoute.title}
              </p>
            </div>

            <div className="space-y-2">
              {routeOptions.map(route => (
                <button
                  key={route.id}
                  onClick={() => handleRouteSelect(route.id)}
                  className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary hover:bg-surface-50 transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: route.color, color: 'white' }}
                    >
                      <Icon name={route.icon} size={16} color="white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary text-sm">
                        {route.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {route.duration} • {route.distance}
                      </p>
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={16} color="var(--color-text-secondary)" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-text-primary">Category Legend</h4>
          <button className="text-xs text-text-secondary hover:text-primary transition-smooth">
            Show all
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries({
            'attractions': 'Attractions',
            'cuisine': 'Cuisine',
            'culture': 'Culture',
            'outdoor': 'Outdoor',
            'hidden': 'Hidden Gems'
          }).map(([category, label]) => (
            <div key={category} className="flex items-center space-x-1.5">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <span className="text-xs text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMapView;