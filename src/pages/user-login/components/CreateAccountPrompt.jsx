import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CreateAccountPrompt = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'Shield',
      title: 'Personalized Safety',
      description: 'Get location-specific safety alerts and recommendations'
    },
    {
      icon: 'FileText',
      title: 'Document Tracking',
      description: 'Track visa, permit, and document requirements progress'
    },
    {
      icon: 'Bot',
      title: 'AI Assistant',
      description: '24/7 AI-powered help for travel and immigration questions'
    },
    {
      icon: 'Heart',
      title: 'Saved Preferences',
      description: 'Bookmark important information and customize your experience'
    }
  ];

  const handleCreateAccount = () => {
    // In a real app, this would navigate to registration page
    alert('Registration page would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
          New to SafeExplore?
        </h3>
        <p className="text-text-secondary font-body">
          Join thousands of travelers who trust SafeExplore for their international journeys
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 bg-surface border border-border rounded-lg hover:shadow-soft transition-smooth"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name={benefit.icon} size={20} color="var(--color-primary)" />
              </div>
              <h4 className="font-body font-semibold text-sm text-text-primary">
                {benefit.title}
              </h4>
              <p className="text-xs font-caption text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Account Button */}
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        iconName="UserPlus"
        iconPosition="left"
        onClick={handleCreateAccount}
        className="min-touch-target mb-4"
      >
        Create Free Account
      </Button>

      {/* Trust Indicators */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} color="var(--color-accent)" />
            <span className="text-sm font-caption text-text-secondary">50K+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} color="var(--color-accent)" />
            <span className="text-sm font-caption text-text-secondary">4.8 Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} color="var(--color-accent)" />
            <span className="text-sm font-caption text-text-secondary">180+ Countries</span>
          </div>
        </div>
      </div>

      {/* Quick Registration Benefits */}
      <div className="mt-6 space-y-3">
        <p className="text-sm font-body text-text-primary font-semibold text-center">
          Quick & Easy Registration:
        </p>
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-success)" />
            <span className="text-sm font-caption text-text-secondary">2 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} color="var(--color-success)" />
            <span className="text-sm font-caption text-text-secondary">Email only</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-sm font-caption text-text-secondary">Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;