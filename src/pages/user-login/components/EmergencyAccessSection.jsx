import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyAccessSection = () => {
  const navigate = useNavigate();

  const emergencyFeatures = [
    {
      title: 'Emergency Contacts',
      description: 'Access local emergency numbers and embassy contacts',
      icon: 'Phone',
      action: () => navigate('/emergency-information-contacts')
    },
    {
      title: 'Safety Information',
      description: 'Get immediate safety alerts and guidance',
      icon: 'Shield',
      action: () => navigate('/emergency-information-contacts')
    },
    {
      title: 'Local Services',
      description: 'Find nearby hospitals, police stations, and help centers',
      icon: 'MapPin',
      action: () => navigate('/local-services-finder')
    }
  ];

  const handleEmergencyAccess = () => {
    navigate('/emergency-information-contacts');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Emergency Access Header */}
      <div className="bg-error-50 border border-error-200 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Need Emergency Help?
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Access critical information without signing in
            </p>
          </div>
        </div>

        {/* Quick Emergency Access Button */}
        <Button
          variant="danger"
          size="lg"
          fullWidth
          iconName="Zap"
          iconPosition="left"
          onClick={handleEmergencyAccess}
          className="min-touch-target mb-4"
        >
          Emergency Access
        </Button>

        {/* Emergency Features List */}
        <div className="space-y-3">
          {emergencyFeatures.map((feature, index) => (
            <button
              key={index}
              onClick={feature.action}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-error-100 transition-smooth min-touch-target"
            >
              <div className="w-8 h-8 bg-error-200 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={16} color="var(--color-error)" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-body text-text-primary font-semibold">
                  {feature.title}
                </p>
                <p className="text-xs font-caption text-text-secondary">
                  {feature.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Disclaimer */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <p className="text-xs font-caption text-text-secondary">
              <strong>Emergency Access</strong> provides limited functionality for immediate safety needs. 
              For full features and personalized assistance, please sign in to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAccessSection;