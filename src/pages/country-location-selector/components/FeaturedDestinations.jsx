import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedDestinations = ({ destinations = [], userType, onDestinationSelect }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon 
          name={userType === 'tourist' ? 'Star' : 'TrendingUp'} 
          size={20} 
          color="var(--color-primary)" 
        />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {userType === 'tourist' ? 'Popular Destinations' : 'Top Immigration Destinations'}
        </h3>
      </div>

      <p className="text-sm text-text-secondary mb-6">
        {userType === 'tourist' ?'Discover amazing places to explore' :'Countries with favorable immigration policies'
        }
      </p>

      <div className="space-y-4">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start space-x-3 mb-3">
              <span className="text-2xl flex-shrink-0">{destination.flag}</span>
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-text-primary">
                  {destination.city}, {destination.country}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {destination.description}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {destination.highlights?.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary-100 text-primary text-xs font-caption rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => onDestinationSelect?.(destination)}
            >
              Select {destination.city}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
          <Icon name="Info" size={12} color="var(--color-text-secondary)" />
          <span>
            {userType === 'tourist' ?'Based on visitor ratings and reviews' :'Based on immigration success rates and policies'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;