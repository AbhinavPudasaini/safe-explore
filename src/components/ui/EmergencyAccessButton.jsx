import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAccessButton = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const handleEmergencyAccess = () => {
    setIsPressed(true);
    navigate('/emergency-information-contacts');
    
    // Reset pressed state after animation
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30">
      <div className="relative">
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-error opacity-25 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-error opacity-40 animate-pulse"></div>
        
        {/* Emergency Button */}
        <Button
          variant="danger"
          size="lg"
          iconName="AlertTriangle"
          onClick={handleEmergencyAccess}
          className={`
            relative rounded-full w-14 h-14 lg:w-16 lg:h-16 shadow-heavy
            transform transition-transform duration-200 ease-out-custom
            hover:scale-105 active:scale-95
            ${isPressed ? 'scale-95' : ''}
          `}
        >
          <span className="sr-only">Emergency Access</span>
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-text-primary text-text-inverse px-3 py-2 rounded-lg text-sm font-caption whitespace-nowrap shadow-medium">
            Emergency Information
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
          </div>
        </div>
      </div>

      {/* Emergency Mode Indicator */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center shadow-medium">
        <Icon name="Zap" size={12} color="white" />
      </div>
    </div>
  );
};

export default EmergencyAccessButton;