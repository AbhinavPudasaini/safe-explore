import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/personalized-dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'AI Assistant',
      path: '/ai-chat-assistant',
      icon: 'MessageCircle',
      badge: null
    },
    {
      label: 'Services',
      path: '/local-services-finder',
      icon: 'MapPin',
      badge: null
    },
    {
      label: 'Documents',
      path: '/document-requirements-tracker',
      icon: 'FileText',
      badge: 3
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-surface border-t border-border shadow-heavy">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center min-touch-target px-2 py-2 rounded-lg transition-smooth relative ${
                isActive(item.path)
                  ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-100'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-semibold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-caption mt-1 ${
                isActive(item.path) ? 'font-semibold' : 'font-normal'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Horizontal Navigation */}
      <nav className="hidden lg:block sticky top-16 z-10 bg-surface border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-4">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth relative min-touch-target ${
                  isActive(item.path)
                    ? 'text-primary bg-primary-50 border border-primary-200' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    color={isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`font-body ${
                  isActive(item.path) ? 'font-semibold' : 'font-normal'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrimaryTabNavigation;