import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import Button from '../../components/ui/Button';
import UserTypeCard from './components/UserTypeCard';
import LanguageSelector from './components/LanguageSelector';
import Icon from '../../components/AppIcon';

const UserTypeSelectionLanding = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleUserTypeSelection = (userType) => {
    // Store user type preference
    localStorage.setItem('userType', userType);
    // Navigate to country/location selector
    navigate('/country-location-selector', { 
      state: { userType } 
    });
  };

  const handleEmergencyAccess = () => {
    navigate('/emergency-information-contacts');
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // In a real app, this would trigger language change throughout the app
    console.log('Language changed to:', language);
  };

  const touristFeatures = [
    { icon: 'Camera', text: 'Explore Local Attractions' },
    { icon: 'MapPin', text: 'Navigate with Confidence' },
    { icon: 'Languages', text: 'Translation & Communication' },
    { icon: 'Shield', text: 'Safety & Emergency Support' },
    { icon: 'FileText', text: 'Document Scanner' },
    { icon: 'Scale', text: 'Local Laws & Regulations' }
  ];

  const immigrantFeatures = [
    { icon: 'FileText', text: 'Visa & Documentation' },
    { icon: 'Home', text: 'Settlement & Housing' },
    { icon: 'Briefcase', text: 'Employment & Work Permits' },
    { icon: 'GraduationCap', text: 'Education & Integration' },
    { icon: 'Heart', text: 'Healthcare & Services' },
    { icon: 'Scale', text: 'Legal Requirements & Rights' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-50 to-primary-50">
      {/* Minimal Header */}
      <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                SafeExplore
              </span>
            </div>

            {/* Language Selector & Emergency */}
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <Button
                variant="danger"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={handleEmergencyAccess}
                className="min-touch-target"
              >
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6">
            <Icon name="Globe" size={32} color="white" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
            Welcome to SafeExplore
          </h1>
          
          <p className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Your AI-powered companion for safe and confident travel, whether you're exploring as a tourist or building a new life abroad.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} color="var(--color-primary)" />
            <span>Trusted by 50,000+ travelers worldwide</span>
          </div>
        </div>

        {/* User Type Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <UserTypeCard
            type="tourist"
            title="I'm a Tourist"
            subtitle="Exploring & Discovering"
            description="Perfect for short-term visits, vacation travel, and cultural exploration. Get instant help with navigation, translations, local attractions, and safety information."
            features={touristFeatures}
            primaryColor="from-accent to-accent-600"
            illustration="tourist"
            onSelect={() => handleUserTypeSelection('tourist')}
          />

          <UserTypeCard
            type="immigrant"
            title="I'm an Immigrant"
            subtitle="Settling & Integrating"
            description="Comprehensive support for long-term relocation, visa processes, legal requirements, housing, employment, and building your new life abroad."
            features={immigrantFeatures}
            primaryColor="from-primary to-primary-600"
            illustration="immigrant"
            onSelect={() => handleUserTypeSelection('immigrant')}
          />
        </div>

        {/* Benefits Section */}
        <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-3">
              Why Choose SafeExplore?
            </h2>
            <p className="text-text-secondary">
              Powered by AI, designed for your safety and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                <Icon name="Brain" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                AI-Powered Assistance
              </h3>
              <p className="text-sm text-text-secondary">
                Get instant, personalized help with translation, document scanning, and local guidance
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-xl mb-4">
                <Icon name="MapPin" size={24} color="var(--color-secondary)" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                Location-Aware
              </h3>
              <p className="text-sm text-text-secondary">
                Automatically adapts to your location with relevant local laws, services, and information
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-xl mb-4">
                <Icon name="Shield" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                Safety First
              </h3>
              <p className="text-sm text-text-secondary">
                24/7 emergency access, safety alerts, and comprehensive support when you need it most
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            Not sure which option is right for you?
          </p>
          <Button
            variant="outline"
            size="lg"
            iconName="HelpCircle"
            iconPosition="left"
            onClick={() => navigate('/ai-chat-assistant')}
          >
            Ask Our AI Assistant
          </Button>
        </div>
      </main>

      {/* Emergency Access Button */}
      <EmergencyAccessButton />

      {/* Privacy Notice */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-80 bg-surface border border-border rounded-lg p-4 shadow-soft">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-xs text-text-secondary">
              Your selection helps us personalize your experience. You can change this anytime in settings.
            </p>
            <button className="text-xs text-primary hover:text-primary-600 mt-1">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectionLanding;