import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import WorldMap from './components/WorldMap';
import CountryCard from './components/CountryCard';
import LocationDetector from './components/LocationDetector';
import FeaturedDestinations from './components/FeaturedDestinations';
import Icon from '../../components/AppIcon';


const CountryLocationSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [userType, setUserType] = useState('tourist');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [recentSelections, setRecentSelections] = useState([]);
  const handleDetect = async ({ latitude, longitude }) => {
    console.log("Location:", latitude, longitude);
    const weather = await getWeather(latitude, longitude);
    console.log("Weather:", weather);
  };

  

  // Get user type from navigation state or localStorage
  useEffect(() => {
    const typeFromState = location.state?.userType;
    const typeFromStorage = localStorage.getItem('userType');
    const type = typeFromState || typeFromStorage || 'tourist';
    setUserType(type);
  }, [location.state]);

  // Mock data for countries
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', continent: 'North America' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'North America' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
    { code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' }
  ];

  // Featured destinations based on user type
  const featuredDestinations = userType === 'tourist' ? [
    { 
      country: 'France', 
      city: 'Paris', 
      flag: '🇫🇷', 
      description: 'Art, culture, and romance',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River'],
      image: 'paris'
    },
    { 
      country: 'Japan', 
      city: 'Tokyo', 
      flag: '🇯🇵', 
      description: 'Modern meets traditional',
      highlights: ['Tokyo Tower', 'Shibuya', 'Cherry Blossoms'],
      image: 'tokyo'
    },
    { 
      country: 'Italy', 
      city: 'Rome', 
      flag: '🇮🇹', 
      description: 'Ancient history and cuisine',
      highlights: ['Colosseum', 'Trevi Fountain', 'Vatican'],
      image: 'rome'
    }
  ] : [
    { 
      country: 'Canada', 
      city: 'Toronto', 
      flag: '🇨🇦', 
      description: 'Diverse and welcoming',
      highlights: ['Strong economy', 'Healthcare', 'Education'],
      image: 'toronto'
    },
    { 
      country: 'Germany', 
      city: 'Berlin', 
      flag: '🇩🇪', 
      description: 'Innovation and opportunity',
      highlights: ['Tech hub', 'Work visas', 'Quality of life'],
      image: 'berlin'
    },
    { 
      country: 'Australia', 
      city: 'Sydney', 
      flag: '🇦🇺', 
      description: 'Lifestyle and career growth',
      highlights: ['Points system', 'High wages', 'Great weather'],
      image: 'sydney'
    }
  ];

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    // Store selection
    const newSelection = {
      country: country.name,
      code: country.code,
      flag: country.flag,
      timestamp: new Date()
    };
    setRecentSelections(prev => [newSelection, ...prev.slice(0, 4)]);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleLocationDetection = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock location detection result
          setTimeout(() => {
            const mockLocation = {
              country: 'United States',
              city: 'San Francisco',
              code: 'US',
              flag: '🇺🇸',
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            };
            setSelectedCountry(mockLocation);
            setSelectedCity(mockLocation.city);
            setIsDetectingLocation(false);
          }, 2000);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setIsDetectingLocation(false);
          // Handle error - could show a notification
        }
      );
    } else {
      setIsDetectingLocation(false);
      console.error('Geolocation not supported');
    }
  };

  const handleContinue = () => {
    if (selectedCountry) {
      // Store selections
      localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
      localStorage.setItem('selectedCity', selectedCity);
      localStorage.setItem('userType', userType);
      
      // Navigate to dashboard
      navigate('/personalized-dashboard', {
        state: {
          userType,
          country: selectedCountry,
          city: selectedCity
        }
      });
    }
  };

  const handleBack = () => {
    navigate('/user-type-selection-landing');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBack}
            >
              Back
            </Button>
            
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Select Your Destination
              </h1>
              <p className="text-text-secondary">
                {userType === 'tourist' ?'Where would you like to explore?' :'Where are you planning to settle?'
                }
              </p>
            </div>
          </div>

          {/* User Type Badge */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-primary-100 rounded-full">
            <Icon 
              name={userType === 'tourist' ? 'Camera' : 'Home'} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="text-sm font-body text-primary capitalize">
              {userType}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search & Selection */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div>
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Search Countries
              </h2>
              <Input
                type="text"
                placeholder="Search countries or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconName="Search"
                iconPosition="left"
              />
            </div>

            {/* Location Detection */}
            <LocationDetector
              onDetect={handleLocationDetection}
              isDetecting={isDetectingLocation}
            />

            {/* Recent Selections */}
            {recentSelections.length > 0 && (
              <div>
                <h3 className="text-base font-heading font-semibold text-text-primary mb-3">
                  Recent Selections
                </h3>
                <div className="space-y-2">
                  {recentSelections.map((selection, index) => (
                    <button
                      key={index}
                      onClick={() => handleCountrySelect(selection)}
                      className="w-full flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth"
                    >
                      <span className="text-xl">{selection.flag}</span>
                      <span className="text-sm font-body text-text-primary">
                        {selection.country}
                      </span>
                      <Icon name="Clock" size={14} color="var(--color-text-secondary)" className="ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Country List */}
            <div>
              <h3 className="text-base font-heading font-semibold text-text-primary mb-3">
                Popular Countries
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.code}
                    country={country}
                    isSelected={selectedCountry?.code === country.code}
                    onClick={() => handleCountrySelect(country)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Interactive Map
              </h2>
              <WorldMap
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                countries={countries}
              />
            </div>
          </div>

          {/* Right Column - Details & Featured */}
          <div className="lg:col-span-1 space-y-6">
            {/* Selection Details */}
            {selectedCountry && (
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Selected Location
                </h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="font-heading font-semibold text-text-primary">
                      {selectedCountry.name}
                    </h4>
                    {selectedCity && (
                      <p className="text-sm text-text-secondary">{selectedCity}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-secondary">
                      {selectedCountry.continent}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm text-text-secondary">
                      {userType === 'tourist' ? 'Tourist-friendly' : 'Immigration-friendly'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleContinue}
                >
                  Continue to Dashboard
                </Button>
              </div>
            )}

            {/* Featured Destinations */}
            <FeaturedDestinations
              destinations={featuredDestinations}
              userType={userType}
              onDestinationSelect={(destination) => {
                const country = countries.find(c => c.name === destination.country);
                if (country) {
                  handleCountrySelect(country);
                  handleCitySelect(destination.city);
                }
              }}
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        {selectedCountry && (
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:hidden">
            <div className="max-w-sm mx-auto">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleContinue}
              >
                Continue to {selectedCountry.name}
              </Button>
            </div>
          </div>
        )}
      </main>

      <EmergencyAccessButton />
    </div>
  );
};

export default CountryLocationSelector;