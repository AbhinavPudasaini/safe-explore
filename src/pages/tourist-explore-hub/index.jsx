import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import ExperienceCard from './components/ExperienceCard';
import ExploreFilters from './components/ExploreFilters';
import ExploreMapView from './components/ExploreMapView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TouristExploreHub = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('recommended'); // recommended, rating, distance, price
  const [favorites, setFavorites] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Berlin, Germany');
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: '22°C',
    condition: 'Sunny',
    recommendation: 'Great weather for outdoor activities!'
  });

  // Mock experience data
  const allExperiences = [
    {
      id: 'exp-1',
      title: 'Brandenburg Gate & Historical Walk',
      description: 'Explore Berlin\'s most iconic landmark and learn about its fascinating history through an expert-guided walking tour.',
      category: 'attractions',
      image: '/assets/images/no_image.png',
      rating: 4.8,
      reviewCount: 1247,
      duration: '2 hours',
      distance: '0.5 km',
      priceRange: 'budget',
      tags: ['Historic', 'Walking Tour', 'Photography'],
      bookable: true,
      accessibility: true,
      weatherDependent: false,
      specialOffer: '20% off this week',
      location: { lat: 52.5163, lng: 13.3777 }
    },
    {
      id: 'exp-2',
      title: 'Traditional German Brewery Tour',
      description: 'Discover authentic German brewing traditions with tastings of local craft beers and traditional pub snacks.',
      category: 'cuisine',
      image: '/assets/images/no_image.png',
      rating: 4.6,
      reviewCount: 892,
      duration: '3 hours',
      distance: '1.2 km',
      priceRange: 'moderate',
      tags: ['Beer', 'Local Culture', 'Food Tasting'],
      bookable: true,
      accessibility: false,
      weatherDependent: false,
      location: { lat: 52.5200, lng: 13.4050 }
    },
    {
      id: 'exp-3',
      title: 'Museum Island Cultural Journey',
      description: 'UNESCO World Heritage site featuring world-class museums with ancient artifacts and priceless art collections.',
      category: 'culture',
      image: '/assets/images/no_image.png',
      rating: 4.9,
      reviewCount: 2156,
      duration: 'Half day',
      distance: '0.8 km',
      priceRange: 'moderate',
      tags: ['Museums', 'Art', 'History', 'UNESCO'],
      bookable: true,
      accessibility: true,
      weatherDependent: false,
      location: { lat: 52.5169, lng: 13.3984 }
    },
    {
      id: 'exp-4',
      title: 'Tiergarten Park & Cycling Adventure',
      description: 'Explore Berlin\'s green heart on a guided cycling tour through beautiful paths, gardens, and hidden spots.',
      category: 'outdoor',
      image: '/assets/images/no_image.png',
      rating: 4.5,
      reviewCount: 634,
      duration: '4 hours',
      distance: '2.1 km',
      priceRange: 'budget',
      tags: ['Cycling', 'Nature', 'Parks', 'Active'],
      bookable: true,
      accessibility: false,
      weatherDependent: true,
      weatherAlert: 'Best enjoyed in good weather',
      location: { lat: 52.5147, lng: 13.3501 }
    },
    {
      id: 'exp-5',
      title: 'Secret Underground Bunkers',
      description: 'Discover Berlin\'s hidden underground world with access to secret WWII bunkers and Cold War shelters.',
      category: 'hidden',
      image: '/assets/images/no_image.png',
      rating: 4.7,
      reviewCount: 445,
      duration: '90 minutes',
      distance: '3.5 km',
      priceRange: 'premium',
      tags: ['Underground', 'History', 'Unique', 'Small Groups'],
      bookable: true,
      accessibility: false,
      weatherDependent: false,
      location: { lat: 52.5074, lng: 13.3256 }
    },
    {
      id: 'exp-6',
      title: 'East Side Gallery Street Art',
      description: 'Free outdoor gallery showcasing vibrant murals on the remains of the Berlin Wall by international artists.',
      category: 'culture',
      image: '/assets/images/no_image.png',
      rating: 4.4,
      reviewCount: 1876,
      duration: '1 hour',
      distance: '4.2 km',
      priceRange: 'free',
      tags: ['Street Art', 'Berlin Wall', 'Photography', 'Free'],
      bookable: false,
      accessibility: true,
      weatherDependent: true,
      location: { lat: 52.5058, lng: 13.4394 }
    },
    {
      id: 'exp-7',
      title: 'Hackescher Markt Shopping District',
      description: 'Trendy shopping area with unique boutiques, vintage stores, cafes, and local designer shops.',
      category: 'shopping',
      image: '/assets/images/no_image.png',
      rating: 4.3,
      reviewCount: 567,
      duration: '2-4 hours',
      distance: '1.5 km',
      priceRange: 'moderate',
      tags: ['Shopping', 'Fashion', 'Local Brands', 'Cafes'],
      bookable: false,
      accessibility: true,
      weatherDependent: false,
      location: { lat: 52.5225, lng: 13.4021 }
    },
    {
      id: 'exp-8',
      title: 'Berlin Nightlife Pub Crawl',
      description: 'Experience Berlin\'s legendary nightlife with local guides showing you the best bars, clubs, and hidden venues.',
      category: 'nightlife',
      image: '/assets/images/no_image.png',
      rating: 4.2,
      reviewCount: 789,
      duration: '5 hours',
      distance: '2.8 km',
      priceRange: 'moderate',
      tags: ['Nightlife', 'Bars', 'Clubs', 'Social'],
      bookable: true,
      accessibility: false,
      weatherDependent: false,
      location: { lat: 52.5125, lng: 13.4234 }
    }
  ];

  // Filter and sort experiences
  const getFilteredExperiences = () => {
    let filtered = [...allExperiences];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filters
    if (filters.categories?.length > 0) {
      filtered = filtered.filter(exp => filters.categories.includes(exp.category));
    }

    // Apply price range filters
    if (filters.priceRange?.length > 0) {
      filtered = filtered.filter(exp => filters.priceRange.includes(exp.priceRange));
    }

    // Apply duration filters
    if (filters.duration?.length > 0) {
      filtered = filtered.filter(exp => {
        const duration = exp.duration.toLowerCase();
        return filters.duration.some(d => {
          switch (d) {
            case 'quick': return duration.includes('hour') && !duration.includes('3') && !duration.includes('4');
            case 'half-day': return duration.includes('3') || duration.includes('4') || duration.includes('half');
            case 'full-day': return duration.includes('day') && !duration.includes('half');
            case 'multi-day': return duration.includes('multi');
            default: return false;
          }
        });
      });
    }

    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(exp => exp.rating >= filters.minRating);
    }

    // Apply accessibility filter
    if (filters.accessibility?.includes('wheelchair')) {
      filtered = filtered.filter(exp => exp.accessibility);
    }

    // Apply special features filter
    if (filters.features?.length > 0) {
      filtered = filtered.filter(exp => {
        if (filters.features.includes('bookable') && !exp.bookable) return false;
        if (filters.features.includes('offers') && !exp.specialOffer) return false;
        if (filters.features.includes('indoor') && exp.weatherDependent) return false;
        return true;
      });
    }

    // Sort experiences
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'price':
          const priceOrder = { free: 0, budget: 1, moderate: 2, premium: 3 };
          return (priceOrder[a.priceRange] || 0) - (priceOrder[b.priceRange] || 0);
        case 'recommended':
        default:
          return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
      }
    });

    return filtered;
  };

  const handleFavoriteToggle = (experienceId) => {
    setFavorites(prev => 
      prev.includes(experienceId)
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    );
  };

  const handleBooking = (experience) => {
    // In a real app, this would open booking modal or redirect to booking page
    console.log('Booking experience:', experience.title);
  };

  const handleShare = (experience) => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: experience.title,
        text: experience.description,
        url: `${window.location.origin}/experience/${experience.id}`
      });
    } else {
      console.log('Sharing experience:', experience.title);
    }
  };

  const handleAIAssistant = () => {
    navigate('/ai-chat-assistant');
  };

  const handleDocumentScanner = () => {
    // In a real app, this would open document scanner functionality
    console.log('Opening document scanner...');
  };

  const filteredExperiences = getFilteredExperiences();
  const activeFilterCount = Object.values(filters).reduce((count, values) => {
    if (Array.isArray(values)) return count + values.length;
    if (values !== null && values !== undefined) return count + 1;
    return count;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Icon name="Compass" size={22} color="white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                  Explore Hub
                </h1>
                <p className="text-text-secondary">
                  Discover amazing experiences in {selectedLocation}
                </p>
              </div>
            </div>

            {/* AI Assistant & Document Scanner */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Scan"
                iconPosition="left"
                onClick={handleDocumentScanner}
                className="hidden sm:flex"
              >
                Scan Docs
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleAIAssistant}
                className="hidden sm:flex"
              >
                AI Assistant
              </Button>
            </div>
          </div>

          {/* Weather Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Sun" size={18} color="var(--color-blue-600)" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    {weatherInfo.temperature} • {weatherInfo.condition}
                  </p>
                  <p className="text-sm text-blue-700">
                    {weatherInfo.recommendation}
                  </p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                7-day forecast
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={18} color="var(--color-text-secondary)" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences, activities, attractions..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface min-touch-target"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name="X" size={16} color="currentColor" />
              </button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 sm:hidden mb-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Scan"
              onClick={handleDocumentScanner}
              className="flex-1"
            >
              Scan
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="MessageCircle"
              onClick={handleAIAssistant}
              className="flex-1"
            >
              AI Assistant
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ExploreFilters
                onFilterChange={setFilters}
                activeFilters={filters}
                onClearAll={() => setFilters({})}
                className={showFilters ? 'block' : 'hidden lg:block'}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* Results Count */}
                <p className="text-sm text-text-secondary">
                  {filteredExperiences.length} experiences found
                </p>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`lg:hidden flex items-center space-x-2 px-3 py-2 border rounded-lg transition-smooth min-touch-target ${
                    activeFilterCount > 0 
                      ? 'border-primary text-primary' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon name="Filter" size={16} color="currentColor" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-transparent min-touch-target"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Nearest</option>
                    <option value="price">Price: Low to High</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Icon name="ChevronDown" size={14} color="var(--color-text-secondary)" />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-surface-100 rounded-lg p-1">
                  {[
                    { id: 'grid', icon: 'Grid', label: 'Grid' },
                    { id: 'list', icon: 'List', label: 'List' },
                    { id: 'map', icon: 'Map', label: 'Map' }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={`px-3 py-2 rounded-md text-sm transition-smooth min-touch-target ${
                        viewMode === mode.id 
                          ? 'bg-white text-primary shadow-soft' 
                          : 'text-text-secondary hover:text-primary'
                      }`}
                      title={mode.label}
                    >
                      <Icon name={mode.icon} size={16} color="currentColor" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Based on View Mode */}
            {viewMode === 'map' ? (
              <ExploreMapView
                experiences={filteredExperiences}
                onExperienceSelect={setSelectedExperience}
                selectedExperience={selectedExperience}
                userLocation={{ lat: 52.5200, lng: 13.4050 }}
              />
            ) : (
              <div className={`${
                viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
              }`}>
                {filteredExperiences.map(experience => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    onFavorite={handleFavoriteToggle}
                    onBooking={handleBooking}
                    onShare={handleShare}
                    isFavorited={favorites.includes(experience.id)}
                    showMap={viewMode === 'list'}
                    className={viewMode === 'list' ? 'flex' : ''}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredExperiences.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 rounded-full flex items-center justify-center">
                  <Icon name="Search" size={24} color="var(--color-text-secondary)" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">
                  No Experiences Found
                </h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your search terms or filters to find more experiences
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredExperiences.length > 0 && filteredExperiences.length >= 12 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8">
                  Load More Experiences
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmergencyAccessButton />
    </div>
  );
};

export default TouristExploreHub;