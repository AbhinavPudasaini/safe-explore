import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIAssistantHelper = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const helpTopics = [
    {
      question: "I forgot my password",
      answer: "Click \'Forgot password?\' above the sign-in button to reset your password via email."
    },
    {
      question: "I can\'t remember my email",
      answer: "Try common email addresses you use. If still stuck, you can create a new account or contact support."
    },
    {
      question: "Account locked or suspended",
      answer: "This usually happens after multiple failed login attempts. Wait 15 minutes and try again, or contact support."
    },
    {
      question: "Need help with social login",
      answer: "Make sure you\'re using the same social account you originally signed up with. Check your browser\'s popup settings."
    }
  ];

  const handleQuickHelp = (topic) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      alert(`AI Assistant: ${topic.answer}`);
    }, 1000);
  };

  const handleChatAssistant = () => {
    navigate('/ai-chat-assistant');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {/* Expanded Help Panel */}
      {isExpanded && (
        <div className="mb-4 w-80 bg-surface border border-border rounded-lg shadow-heavy animate-slide-up">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-text-primary">AI Assistant</h4>
                  <p className="text-xs text-text-secondary font-caption">Login Help</p>
                </div>
              </div>
              <button
                onClick={toggleExpanded}
                className="p-1 rounded-lg hover:bg-surface-100 transition-smooth"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 mb-4 p-3 bg-surface-100 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-text-secondary font-caption">AI is thinking...</span>
              </div>
            )}

            {/* Quick Help Topics */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-body text-text-primary font-semibold">Common Login Issues:</p>
              {helpTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickHelp(topic)}
                  disabled={isTyping}
                  className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-surface-100 transition-smooth min-touch-target disabled:opacity-50"
                >
                  <span className="text-sm font-body text-text-primary">{topic.question}</span>
                  <Icon name="ChevronRight" size={14} color="var(--color-text-secondary)" />
                </button>
              ))}
            </div>

            {/* Full Chat Button */}
            <Button
              variant="primary"
              size="sm"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleChatAssistant}
              className="min-touch-target"
            >
              Open Full Chat Assistant
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={toggleExpanded}
        className="rounded-full w-14 h-14 shadow-heavy hover:scale-105 transition-transform duration-200"
      >
        <div className="relative">
          <Icon name={isExpanded ? "X" : "HelpCircle"} size={24} color="white" />
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          )}
        </div>
      </Button>
    </div>
  );
};

export default AIAssistantHelper;