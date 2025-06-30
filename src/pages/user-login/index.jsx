import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import EmergencyAccessSection from './components/EmergencyAccessSection';
import AIAssistantHelper from './components/AIAssistantHelper';
import CreateAccountPrompt from './components/CreateAccountPrompt';
import LanguageSelector from './components/LanguageSelector';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/personalized-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Minimal Header */}
      <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-smooth"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                SafeExplore
              </span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Welcome & Benefits */}
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center lg:text-left">
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-4">
                  Welcome Back to SafeExplore
                </h1>
                <p className="text-lg text-text-secondary font-body leading-relaxed">
                  Your trusted companion for safe international travel and immigration guidance. 
                  Sign in to access personalized assistance and continue your journey with confidence.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Award" size={20} color="var(--color-accent)" />
                  <h3 className="font-heading font-semibold text-text-primary">
                    Trusted by Travelers Worldwide
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-heading font-bold text-primary">50K+</div>
                    <div className="text-sm font-caption text-text-secondary">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-primary">180+</div>
                    <div className="text-sm font-caption text-text-secondary">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-primary">4.8★</div>
                    <div className="text-sm font-caption text-text-secondary">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="hidden lg:block">
                <h3 className="font-heading font-semibold text-xl text-text-primary mb-4">
                  What You'll Get Access To:
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: 'Bot',
                      title: 'AI-Powered Assistant',
                      description: '24/7 intelligent help for travel and immigration questions'
                    },
                    {
                      icon: 'Shield',
                      title: 'Safety Alerts',
                      description: 'Real-time location-based safety information and warnings'
                    },
                    {
                      icon: 'FileText',
                      title: 'Document Tracking',
                      description: 'Track visa applications, permits, and requirement deadlines'
                    },
                    {
                      icon: 'MapPin',
                      title: 'Local Services',
                      description: 'Find nearby healthcare, legal aid, and essential services'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-text-primary">
                          {feature.title}
                        </h4>
                        <p className="text-sm font-caption text-text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Login Forms */}
            <div className="space-y-8">
              {/* Login Form */}
              <div className="bg-surface border border-border rounded-lg p-6 lg:p-8 shadow-soft">
                <div className="text-center mb-6">
                  <h2 className="font-heading font-semibold text-2xl text-text-primary mb-2">
                    Sign In to Your Account
                  </h2>
                  <p className="text-text-secondary font-body">
                    Enter your credentials to access your personalized dashboard
                  </p>
                </div>

                <LoginForm />
              </div>

              {/* Social Login */}
              <div className="bg-surface border border-border rounded-lg p-6 lg:p-8 shadow-soft">
                <SocialLoginOptions />
              </div>

              {/* Create Account Prompt */}
              <div className="bg-surface border border-border rounded-lg p-6 lg:p-8 shadow-soft">
                <CreateAccountPrompt />
              </div>
            </div>
          </div>

          {/* Emergency Access Section */}
          <div className="mt-12">
            <EmergencyAccessSection />
          </div>
        </div>
      </main>

      {/* AI Assistant Helper */}
      <AIAssistantHelper />

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                <Icon name="Shield" size={14} color="white" />
              </div>
              <span className="text-sm font-caption text-text-secondary">
                © {new Date().getFullYear()} SafeExplore. Empowering safe international travel.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-sm font-caption text-text-secondary hover:text-primary transition-smooth">
                Privacy Policy
              </button>
              <button className="text-sm font-caption text-text-secondary hover:text-primary transition-smooth">
                Terms of Service
              </button>
              <button className="text-sm font-caption text-text-secondary hover:text-primary transition-smooth">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;