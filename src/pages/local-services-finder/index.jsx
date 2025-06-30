import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import ServiceCategoryCard from './components/ServiceCategoryCard';
import ServiceListItem from './components/ServiceListItem';
import ServiceFilters from './components/ServiceFilters';
import ServiceMapView from './components/ServiceMapView';
import EmergencyServicesSection from './components/EmergencyServicesSection';
import LocationSelector from './components/LocationSelector';

const LocalServicesFinder = () => {
  const [currentLocation, setCurrentLocation] = useState({
    city: 'Current Location',
    country: '',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    accuracy: 'approximate'
  });
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filters, setFilters] = useState({
    search: '',
    languages: [],
    accessibility: false,
    costRange: null,
    openNow: false,
    hasBooking: false,
    maxDistance: 10
  });
  const [favoriteServices, setFavoriteServices] = useState(new Set());
  const [selectedService, setSelectedService] = useState(null);

  // Mock data for service categories
  const serviceCategories = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: 'Heart',
      iconColor: 'white',
      bgColor: 'bg-error',
      count: 24,
      hasUpdates: true
    },
    {
      id: 'legal',
      name: 'Legal Services',
      icon: 'Scale',
      iconColor: 'white',
      bgColor: 'bg-secondary',
      count: 12,
      hasUpdates: false
    },
    {
      id: 'education',
      name: 'Education',
      icon: 'GraduationCap',
      iconColor: 'white',
      bgColor: 'bg-accent',
      count: 18,
      hasUpdates: true
    },
    {
      id: 'government',
      name: 'Government Offices',
      icon: 'Building',
      iconColor: 'white',
      bgColor: 'bg-primary',
      count: 8,
      hasUpdates: false
    },
    {
      id: 'banking',
      name: 'Banking',
      icon: 'CreditCard',
      iconColor: 'white',
      bgColor: 'bg-warning',
      count: 15,
      hasUpdates: false
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: 'Car',
      iconColor: 'white',
      bgColor: 'bg-text-primary',
      count: 32,
      hasUpdates: true
    },
    {
      id: 'community',
      name: 'Community Resources',
      icon: 'Users',
      iconColor: 'white',
      bgColor: 'bg-secondary-600',
      count: 21,
      hasUpdates: false
    }
  ];

  // Mock data for emergency services
  const emergencyServices = [
    {
      id: 'police',
      name: 'Police',
      description: 'Emergency law enforcement',
      number: '911',
      icon: 'Shield',
      iconColor: 'white',
      bgColor: 'bg-primary'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      description: 'Fire & rescue services',
      number: '911',
      icon: 'Flame',
      iconColor: 'white',
      bgColor: 'bg-error'
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      description: 'Ambulance & medical care',
      number: '911',
      icon: 'Plus',
      iconColor: 'white',
      bgColor: 'bg-success'
    }
  ];

  // Mock data for services
  const mockServices = [
    {
      id: 1,
      name: 'City General Hospital',
      category: 'Healthcare',
      address: '123 Main Street, Downtown',
      distance: '0.8 km',
      phone: '+1 (555) 123-4567',
      rating: 4.5,
      reviewCount: 324,
      isOpen: true,
      isFavorite: false,
      languages: ['English', 'Spanish', 'French'],
      hasBooking: true,
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 2,
      name: 'Immigration Law Associates',
      category: 'Legal Services',
      address: '456 Legal Plaza, Business District',
      distance: '1.2 km',
      phone: '+1 (555) 234-5678',
      rating: 4.8,
      reviewCount: 156,
      isOpen: true,
      isFavorite: true,
      languages: ['English', 'Spanish', 'Portuguese', 'Chinese'],
      hasBooking: true,
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 3,
      name: 'International Student Center',
      category: 'Education',
      address: '789 University Ave, Campus Area',
      distance: '2.1 km',
      phone: '+1 (555) 345-6789',
      rating: 4.3,
      reviewCount: 89,
      isOpen: false,
      isFavorite: false,
      languages: ['English', 'Chinese', 'Korean', 'Arabic'],
      hasBooking: false,
      coordinates: { lat: 40.7282, lng: -73.9942 }
    },
    {
      id: 4,
      name: 'Department of Motor Vehicles',
      category: 'Government Offices',
      address: '321 Government Plaza, Civic Center',
      distance: '1.5 km',
      phone: '+1 (555) 456-7890',
      rating: 3.2,
      reviewCount: 245,
      isOpen: true,
      isFavorite: false,
      languages: ['English', 'Spanish'],
      hasBooking: true,
      coordinates: { lat: 40.7411, lng: -74.0018 }
    },
    {
      id: 5,
      name: 'First National Bank',
      category: 'Banking',
      address: '654 Financial Street, Banking District',
      distance: '0.9 km',
      phone: '+1 (555) 567-8901',
      rating: 4.1,
      reviewCount: 178,
      isOpen: true,
      isFavorite: false,
      languages: ['English', 'Spanish', 'French'],
      hasBooking: false,
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
      id: 6,
      name: 'Metro Transit Hub',
      category: 'Transportation',
      address: '987 Transit Way, Transportation Center',
      distance: '0.5 km',
      phone: '+1 (555) 678-9012',
      rating: 3.9,
      reviewCount: 412,
      isOpen: true,
      isFavorite: true,
      languages: ['English', 'Spanish', 'Chinese'],
      hasBooking: false,
      coordinates: { lat: 40.7527, lng: -73.9772 }
    }
  ];

  const [filteredServices, setFilteredServices] = useState(mockServices);

  // Filter services based on selected category and filters
  useEffect(() => {
    let filtered = mockServices;

    // Filter by category
    if (selectedCategory) {
      const categoryName = serviceCategories.find(cat => cat.id === selectedCategory)?.name;
      filtered = filtered.filter(service => service.category === categoryName);
    }

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        service.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.languages && filters.languages.length > 0) {
      filtered = filtered.filter(service =>
        filters.languages.some(lang => service.languages.includes(lang))
      );
    }

    if (filters.openNow) {
      filtered = filtered.filter(service => service.isOpen);
    }

    if (filters.hasBooking) {
      filtered = filtered.filter(service => service.hasBooking);
    }

    setFilteredServices(filtered);
  }, [selectedCategory, filters]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // In a real app, this might open a detailed view or modal
    console.log('Selected service:', service);
  };

  const handleFavoriteToggle = (serviceId) => {
    const newFavorites = new Set(favoriteServices);
    if (newFavorites.has(serviceId)) {
      newFavorites.delete(serviceId);
    } else {
      newFavorites.add(serviceId);
    }
    setFavoriteServices(newFavorites);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      languages: [],
      accessibility: false,
      costRange: null,
      openNow: false,
      hasBooking: false,
      maxDistance: 10
    });
  };

  const handleLocationChange = (newLocation) => {
    setCurrentLocation(newLocation);
  };

  const handleEmergencyCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
  };

  return (
    <>
      <Helmet>
        <title>Local Services Finder - SafeExplore</title>
        <meta name="description" content="Find essential services including healthcare, legal assistance, education, and government offices in your area with SafeExplore's location-based directory." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PrimaryTabNavigation />

        {/* Sub-header with location and view controls */}
        <div className="sticky top-32 z-10 bg-surface border-b border-border shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {selectedCategory && (
                  <button
                    onClick={handleBackToCategories}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
                  >
                    <Icon name="ArrowLeft" size={16} color="var(--color-text-primary)" />
                    <span className="text-sm font-body text-text-primary">Back</span>
                  </button>
                )}
                
                <LocationSelector
                  currentLocation={currentLocation}
                  onLocationChange={handleLocationChange}
                />
              </div>

              {selectedCategory && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'primary' : 'outline'}
                    size="sm"
                    iconName="Map"
                    onClick={() => setViewMode('map')}
                  >
                    Map
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
          {/* Emergency Services Section */}
          <EmergencyServicesSection
            emergencyServices={emergencyServices}
            onEmergencyCall={handleEmergencyCall}
          />

          {!selectedCategory ? (
            /* Service Categories Grid */
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  Local Services
                </h1>
                <p className="text-text-secondary font-body">
                  Find essential services and support in your area
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceCategories.map((category) => (
                  <ServiceCategoryCard
                    key={category.id}
                    category={category}
                    onCategorySelect={handleCategorySelect}
                  />
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-primary mb-1">
                    {serviceCategories.reduce((sum, cat) => sum + cat.count, 0)}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    Total Services
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-success mb-1">
                    {serviceCategories.filter(cat => cat.hasUpdates).length}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    Recently Updated
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-accent mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    Emergency Access
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-secondary mb-1">
                    12
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    Languages Supported
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Service Listings */
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {serviceCategories.find(cat => cat.id === selectedCategory)?.name}
                </h1>
                <p className="text-text-secondary font-body">
                  {filteredServices.length} services found in your area
                </p>
              </div>

              {/* Filters */}
              <ServiceFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />

              {viewMode === 'list' ? (
                /* List View */
                <div className="space-y-4">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <ServiceListItem
                        key={service.id}
                        service={{
                          ...service,
                          isFavorite: favoriteServices.has(service.id)
                        }}
                        onServiceSelect={handleServiceSelect}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        No services found
                      </h3>
                      <p className="text-text-secondary font-body mb-4">
                        Try adjusting your filters or search in a different area
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                /* Map View */
                <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                  <div className="lg:col-span-2">
                    <ServiceMapView
                      services={filteredServices}
                      selectedService={selectedService}
                      onServiceSelect={handleServiceSelect}
                      userLocation={currentLocation.coordinates}
                    />
                  </div>
                  <div className="mt-4 lg:mt-0 space-y-4 max-h-96 lg:max-h-full overflow-y-auto">
                    {filteredServices.map((service) => (
                      <ServiceListItem
                        key={service.id}
                        service={{
                          ...service,
                          isFavorite: favoriteServices.has(service.id)
                        }}
                        onServiceSelect={handleServiceSelect}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <EmergencyAccessButton />
      </div>
    </>
  );
};

export default LocalServicesFinder;