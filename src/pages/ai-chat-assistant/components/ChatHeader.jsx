import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onSettingsClick, onEmergencyToggle, isEmergencyMode = false }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/personalized-dashboard');
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const handleEmergencyToggle = () => {
    if (onEmergencyToggle) {
      onEmergencyToggle(!isEmergencyMode);
    }
    setIsMenuOpen(false);
  };

  const handleNewChat = () => {
    window.location.reload(); // Simple way to start new chat
    setIsMenuOpen(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear chat history?')) {
      localStorage.removeItem('chatHistory');
      window.location.reload();
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-10 bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            onClick={handleBackClick}
            className="min-touch-target"
          />
          
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isEmergencyMode ? 'bg-error' : 'bg-primary'
            }`}>
              <Icon 
                name={isEmergencyMode ? "AlertTriangle" : "MessageCircle"} 
                size={16} 
                color="white" 
              />
            </div>
            
            <div>
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                {isEmergencyMode ? 'Emergency Assistant' : 'AI Assistant'}
              </h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs font-caption text-text-secondary">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={handleSettingsClick}
            className="min-touch-target"
          />

          {/* Settings Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-medium z-50 animate-slide-down">
              <div className="py-2">
                <button
                  onClick={handleNewChat}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target"
                >
                  <Icon name="Plus" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body text-text-primary">New Chat</span>
                </button>

                <button
                  onClick={handleEmergencyToggle}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target"
                >
                  <Icon 
                    name={isEmergencyMode ? "Shield" : "AlertTriangle"} 
                    size={16} 
                    color={isEmergencyMode ? "var(--color-success)" : "var(--color-error)"} 
                  />
                  <span className="text-sm font-body text-text-primary">
                    {isEmergencyMode ? 'Exit Emergency Mode' : 'Emergency Mode'}
                  </span>
                </button>

                <div className="border-t border-border my-2"></div>

                <button
                  onClick={() => navigate('/document-requirements-tracker')}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target"
                >
                  <Icon name="FileText" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body text-text-primary">Document Tracker</span>
                </button>

                <button
                  onClick={() => navigate('/local-services-finder')}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target"
                >
                  <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body text-text-primary">Local Services</span>
                </button>

                <button
                  onClick={() => navigate('/emergency-information-contacts')}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target"
                >
                  <Icon name="Phone" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm font-body text-text-primary">Emergency Contacts</span>
                </button>

                <div className="border-t border-border my-2"></div>

                <button
                  onClick={handleClearHistory}
                  className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-surface-100 transition-smooth min-touch-target text-error"
                >
                  <Icon name="Trash2" size={16} color="var(--color-error)" />
                  <span className="text-sm font-body">Clear History</span>
                </button>
              </div>
            </div>
          )}

          {/* Overlay to close menu */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
        </div>
      </div>

      {/* Emergency Mode Banner */}
      {isEmergencyMode && (
        <div className="bg-error-50 border-b border-error-200 px-4 py-2">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <span className="text-sm font-caption text-error">
              Emergency Mode Active - Priority responses enabled
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;