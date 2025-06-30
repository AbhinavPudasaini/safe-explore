import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('Current Location');

  const handleEmergencyAccess = () => {
    navigate('/emergency-information-contacts');
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/personalized-dashboard');
  };

  const handleLocationClick = () => {
    // In a real app, this would open a location selector
    console.log('Location selector opened');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoginPage = location.pathname === '/user-login';

  return (
    <header className="sticky top-0 z-20 bg-surface border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-smooth"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary hidden sm:block">
                SafeExplore
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Location Indicator */}
            <button
              onClick={handleLocationClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth"
            >
              <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary font-caption">
                {userLocation}
              </span>
              <Icon name="ChevronDown" size={14} color="var(--color-text-secondary)" />
            </button>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={16} color="var(--color-text-secondary)" />
              </div>
              <input
                type="text"
                placeholder="Search services, documents..."
                className="w-64 pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-sm"
              />
            </div>

            {/* Emergency Access Button */}
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

            {/* User Menu */}
            {!isLoginPage && (
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary-600 transition-smooth">
                  <Icon name="User" size={16} color="white" />
                </button>
              </div>
            )}

            {/* Login Button for non-authenticated users */}
            {isLoginPage && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/user-login')}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Emergency Access - Mobile */}
            <Button
              variant="danger"
              size="sm"
              iconName="AlertTriangle"
              onClick={handleEmergencyAccess}
              className="min-touch-target"
            />

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={20} 
                color="var(--color-text-primary)" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Location Indicator - Mobile */}
              <button
                onClick={handleLocationClick}
                className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
              >
                <Icon name="MapPin" size={20} color="var(--color-text-secondary)" />
                <span className="text-text-secondary font-caption">
                  {userLocation}
                </span>
                <Icon name="ChevronDown" size={16} color="var(--color-text-secondary)" />
              </button>

              {/* Search - Mobile */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Search" size={16} color="var(--color-text-secondary)" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search services, documents..."
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface min-touch-target"
                  />
                </div>
              </div>

              {/* User Profile - Mobile */}
              {!isLoginPage && (
                <button className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-text-primary font-body">Profile</span>
                </button>
              )}

              {/* Login - Mobile */}
              {isLoginPage && (
                <div className="px-3 py-2">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      navigate('/user-login');
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              )}

              {/* Language Selector - Mobile */}
              <button className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target">
                <Icon name="Globe" size={20} color="var(--color-text-secondary)" />
                <span className="text-text-secondary font-caption">English</span>
                <Icon name="ChevronDown" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;