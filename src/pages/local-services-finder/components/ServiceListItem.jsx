import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceListItem = ({ service, onServiceSelect, onFavoriteToggle }) => {
  const handleServiceClick = () => {
    onServiceSelect(service);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(service.id);
  };

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(service.rating);
    const hasHalfStar = service.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} color="var(--color-warning)" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={12} color="var(--color-warning)" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(service.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} color="var(--color-border)" />
      );
    }
    
    return stars;
  };

  return (
    <div 
      onClick={handleServiceClick}
      className="bg-surface border border-border rounded-lg p-4 hover:bg-surface-100 hover:border-primary-200 transition-smooth cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-text-primary mb-1">
            {service.name}
          </h3>
          <p className="text-sm text-text-secondary font-body mb-2">
            {service.category}
          </p>
        </div>
        
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-lg hover:bg-surface-200 transition-smooth min-touch-target"
        >
          <Icon 
            name={service.isFavorite ? "Heart" : "Heart"} 
            size={16} 
            color={service.isFavorite ? "var(--color-error)" : "var(--color-text-secondary)"}
          />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary font-caption">
            {service.address}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Navigation" size={14} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary font-caption">
            {service.distance} away
          </span>
        </div>
        
        {service.phone && (
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} color="var(--color-text-secondary)" />
            <span className="text-sm text-text-secondary font-caption">
              {service.phone}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderRating()}
          </div>
          <span className="text-sm text-text-secondary font-caption">
            ({service.reviewCount} reviews)
          </span>
        </div>
        
        {service.isOpen && (
          <span className="text-xs text-success font-caption bg-success-50 px-2 py-1 rounded-full">
            Open now
          </span>
        )}
      </div>

      {service.languages && service.languages.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center space-x-1 mb-1">
            <Icon name="Globe" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary font-caption">Languages:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {service.languages.slice(0, 3).map((language, index) => (
              <span 
                key={index}
                className="text-xs bg-surface-100 text-text-secondary px-2 py-1 rounded-full font-caption"
              >
                {language}
              </span>
            ))}
            {service.languages.length > 3 && (
              <span className="text-xs text-text-secondary font-caption">
                +{service.languages.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Phone"
          iconPosition="left"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${service.phone}`, '_self');
          }}
        >
          Call
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Navigation"
          iconPosition="left"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://maps.google.com?q=${encodeURIComponent(service.address)}`, '_blank');
          }}
        >
          Directions
        </Button>
        
        {service.hasBooking && (
          <Button
            variant="primary"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={(e) => {
              e.stopPropagation();
              // Handle booking
            }}
          >
            Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceListItem;