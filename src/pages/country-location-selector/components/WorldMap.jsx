import React from 'react';
import Icon from '../../../components/AppIcon';

const WorldMap = ({ selectedCountry, onCountrySelect, countries = [] }) => {
  // This is a simplified world map representation
  // In a real application, you'd integrate with a proper mapping library like Leaflet or Google Maps
  
  const continents = [
    { name: 'North America', countries: ['US', 'CA', 'MX'] },
    { name: 'Europe', countries: ['GB', 'DE', 'FR', 'ES', 'IT', 'NL'] },
    { name: 'Asia', countries: ['JP', 'CN', 'IN', 'KR'] },
    { name: 'Oceania', countries: ['AU', 'NZ'] },
    { name: 'Africa', countries: ['ZA', 'EG', 'NG'] },
    { name: 'South America', countries: ['BR', 'AR', 'CL'] }
  ];

  const handleContinentClick = (continent) => {
    // For now, select the first country in the continent
    const firstCountryCode = continent.countries[0];
    const country = countries.find(c => c.code === firstCountryCode);
    if (country) {
      onCountrySelect?.(country);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="aspect-[4/3] relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
        {/* Simplified World Map Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md max-h-48">
            {/* Continent Buttons */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-4">
              {continents.map((continent, index) => (
                <button
                  key={continent.name}
                  onClick={() => handleContinentClick(continent)}
                  className={`
                    flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed 
                    transition-all duration-200 hover:scale-105 text-center
                    ${selectedCountry && continent.countries.includes(selectedCountry.code)
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300 bg-white/80 text-text-secondary hover:text-primary'
                    }
                  `}
                >
                  <Icon 
                    name="Globe" 
                    size={16} 
                    color={selectedCountry && continent.countries.includes(selectedCountry.code) 
                      ? 'var(--color-primary)' 
                      : 'var(--color-text-secondary)'
                    } 
                  />
                  <span className="text-xs font-caption mt-1">
                    {continent.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Country Indicator */}
        {selectedCountry && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {selectedCountry.flag} {selectedCountry.name}
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-dashed border-border rounded"></div>
            <span className="text-xs text-text-secondary">Click regions</span>
          </div>
        </div>
      </div>

      {/* Map Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-text-secondary">
          Click on regions to explore countries, or use the search above for specific locations
        </p>
        
        {/* Quick Stats */}
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} color="var(--color-text-secondary)" />
            <span>195+ Countries</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} color="var(--color-text-secondary)" />
            <span>6 Continents</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} color="var(--color-text-secondary)" />
            <span>All Supported</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;