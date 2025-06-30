import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExperienceCard = ({ 
  experience, 
  onFavorite, 
  onBooking, 
  onShare,
  isFavorited = false,
  showMap = false,
  className = ""
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPriceRangeColor = (priceRange) => {
    switch (priceRange) {
      case 'free': return 'text-success';
      case 'budget': return 'text-info';
      case 'moderate': return 'text-warning';
      case 'premium': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getPriceRangeIcon = (priceRange) => {
    const count = priceRange === 'free' ? 0 : 
                  priceRange === 'budget' ? 1 :
                  priceRange === 'moderate' ? 2 : 3;
    
    return Array.from({ length: 4 }, (_, i) => (
      <Icon 
        key={i}
        name="DollarSign" 
        size={12} 
        color={i < count ? 'currentColor' : 'var(--color-text-muted)'}
      />
    ));
  };

  const getDurationIcon = (duration) => {
    if (duration.includes('hour')) return 'Clock';
    if (duration.includes('day')) return 'Calendar';
    return 'Clock';
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

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div className={`bg-surface border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth ${className}`}>
      {/* Image Section */}
      <div className="relative h-48 bg-surface-100">
        {!imageError ? (
          <img
            src={experience.image || '/assets/images/no_image.png'}
            alt={experience.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Image" size={32} color="var(--color-text-muted)" />
          </div>
        )}
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-caption text-white bg-black bg-opacity-70 backdrop-blur-sm`}>
            <Icon 
              name={getCategoryIcon(experience.category)} 
              size={12} 
              color="white" 
            />
            <span className="capitalize">{experience.category}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(experience.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-smooth min-touch-target ${
            isFavorited 
              ? 'bg-error text-white' :'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
          }`}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon 
            name={isFavorited ? "Heart" : "Heart"} 
            size={16} 
            color="currentColor"
            className={isFavorited ? 'fill-current' : ''}
          />
        </button>

        {/* Price Range */}
        <div className="absolute bottom-3 left-3">
          <div className={`flex items-center space-x-0.5 px-2 py-1 rounded-full text-xs bg-white bg-opacity-90 backdrop-blur-sm ${getPriceRangeColor(experience.priceRange)}`}>
            {experience.priceRange === 'free' ? (
              <span className="font-medium">FREE</span>
            ) : (
              getPriceRangeIcon(experience.priceRange)
            )}
          </div>
        </div>

        {/* Show on Map Button */}
        {showMap && (
          <button
            className="absolute bottom-3 right-3 p-2 bg-primary text-white rounded-full hover:bg-primary-600 transition-smooth min-touch-target"
            title="Show on map"
          >
            <Icon name="Map" size={16} color="white" />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-text-primary line-clamp-2 pr-2">
            {experience.title}
          </h3>
          {experience.rating && (
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Icon name="Star" size={14} color="var(--color-warning)" className="fill-current" />
              <span className="text-sm font-medium text-text-primary">
                {formatRating(experience.rating)}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
          {experience.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
          <div className="flex items-center space-x-3">
            {/* Duration */}
            {experience.duration && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getDurationIcon(experience.duration)} 
                  size={12} 
                  color="currentColor" 
                />
                <span>{experience.duration}</span>
              </div>
            )}

            {/* Distance */}
            {experience.distance && (
              <div className="flex items-center space-x-1">
                <Icon name="Navigation" size={12} color="currentColor" />
                <span>{experience.distance}</span>
              </div>
            )}

            {/* Reviews Count */}
            {experience.reviewCount && (
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={12} color="currentColor" />
                <span>{experience.reviewCount} reviews</span>
              </div>
            )}
          </div>

          {/* Accessibility */}
          {experience.accessibility && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Users" size={12} color="currentColor" />
              <span>Accessible</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {experience.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-surface-100 text-text-secondary rounded-full"
              >
                {tag}
              </span>
            ))}
            {experience.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-surface-100 text-text-secondary rounded-full">
                +{experience.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Book/View Button */}
          <button
            onClick={() => onBooking?.(experience)}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-smooth text-sm font-medium min-touch-target"
          >
            {experience.bookable ? 'Book Now' : 'View Details'}
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShare?.(experience)}
            className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-smooth min-touch-target"
            title="Share experience"
          >
            <Icon name="Share" size={16} color="currentColor" />
          </button>

          {/* More Actions */}
          <button
            className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-smooth min-touch-target"
            title="More options"
          >
            <Icon name="MoreHorizontal" size={16} color="currentColor" />
          </button>
        </div>

        {/* Special Offers */}
        {experience.specialOffer && (
          <div className="mt-3 p-2 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={14} color="var(--color-success)" />
              <span className="text-sm text-success font-medium">
                {experience.specialOffer}
              </span>
            </div>
          </div>
        )}

        {/* Weather Alert */}
        {experience.weatherDependent && experience.weatherAlert && (
          <div className="mt-3 p-2 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Cloud" size={14} color="var(--color-warning)" />
              <span className="text-sm text-warning">
                {experience.weatherAlert}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;