import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingAIChatButton = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const handleChatOpen = () => {
    setIsPressed(true);
    navigate('/ai-chat-assistant');
    
    // Reset pressed state after animation
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-20 lg:right-6 z-20">
      <div className="relative">
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-primary opacity-25 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-primary opacity-40 animate-pulse"></div>
        
        {/* Chat Button */}
        <button
          onClick={handleChatOpen}
          className={`
            relative w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary 
            rounded-full shadow-heavy flex items-center justify-center
            transform transition-transform duration-200 ease-out
            hover:scale-105 active:scale-95
            ${isPressed ? 'scale-95' : ''}
          `}
        >
          <Icon name="MessageCircle" size={24} color="white" />
          <span className="sr-only">Open AI Chat Assistant</span>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-text-primary text-text-inverse px-3 py-2 rounded-lg text-sm font-caption whitespace-nowrap shadow-medium">
            AI Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
          </div>
        </div>

        {/* Online Indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center shadow-medium">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        {/* Notification Badge */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-medium">
          <Icon name="Sparkles" size={12} color="white" />
        </div>
      </div>
    </div>
  );
};

export default FloatingAIChatButton;