import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UserTypeCard = ({
  type,
  title,
  subtitle,
  description,
  features = [],
  primaryColor = 'from-primary to-primary-600',
  illustration,
  onSelect
}) => {
  return (
    <div className="group relative bg-surface border border-border rounded-2xl p-6 lg:p-8 hover:shadow-md transition-all duration-300 hover:border-primary-200">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${primaryColor} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${primaryColor} rounded-xl`}>
            <Icon 
              name={type === 'tourist' ? 'Camera' : 'Home'} 
              size={24} 
              color="white" 
            />
          </div>
          
          <div className="text-right">
            <div className="text-xs font-caption text-text-secondary uppercase tracking-wide">
              {subtitle}
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
          {title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Features List */}
      <div className="relative z-10 mb-8">
        <h4 className="text-sm font-heading font-semibold text-text-primary mb-4">
          What you'll get:
        </h4>
        
        <div className="grid grid-cols-1 gap-3">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon 
                    name={feature.icon} 
                    size={12} 
                    color="var(--color-primary)" 
                  />
                </div>
              </div>
              <span className="text-sm text-text-secondary">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onSelect}
          className="group-hover:shadow-md transition-shadow"
        >
          Continue as {type === 'tourist' ? 'Tourist' : 'Immigrant'}
        </Button>
      </div>

      {/* Popular Badge */}
      {type === 'tourist' && (
        <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
          Popular
        </div>
      )}
    </div>
  );
};

export default UserTypeCard;