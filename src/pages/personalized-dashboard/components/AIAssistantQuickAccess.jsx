import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistantQuickAccess = ({ recentQueries }) => {
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate('/ai-chat-assistant');
  };

  const handleQuickQuery = (query) => {
    navigate('/ai-chat-assistant', { state: { quickQuery: query } });
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="MessageCircle" size={16} color="white" />
          </div>
          <h3 className="font-heading font-semibold text-text-primary">AI Assistant</h3>
        </div>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      </div>

      <p className="text-sm font-body text-text-secondary mb-4">
        Get instant help with travel questions, document requirements, and local guidance.
      </p>

      <div className="space-y-3">
        {/* Quick Access Button */}
        <Button 
          variant="primary" 
          iconName="MessageSquare" 
          iconPosition="left"
          onClick={handleOpenChat}
          fullWidth
        >
          Start New Conversation
        </Button>

        {/* Recent Queries */}
        {recentQueries.length > 0 && (
          <div>
            <h4 className="text-xs font-caption text-text-secondary mb-2 uppercase tracking-wide">
              Recent Questions
            </h4>
            <div className="space-y-2">
              {recentQueries.slice(0, 2).map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuery(query.text)}
                  className="w-full text-left p-2 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth"
                >
                  <div className="flex items-start space-x-2">
                    <Icon name="Clock" size={12} color="var(--color-text-secondary)" className="mt-1" />
                    <div className="flex-1">
                      <p className="text-xs font-body text-text-primary line-clamp-2">
                        {query.text}
                      </p>
                      <span className="text-xs font-caption text-text-secondary">
                        {query.timestamp}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleQuickQuery("What documents do I need for visa application?")}
            className="p-2 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth text-center"
          >
            <Icon name="FileText" size={16} color="var(--color-primary)" className="mx-auto mb-1" />
            <span className="text-xs font-caption text-text-primary">Documents</span>
          </button>
          <button
            onClick={() => handleQuickQuery("What are the local emergency numbers?")}
            className="p-2 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth text-center"
          >
            <Icon name="Phone" size={16} color="var(--color-error)" className="mx-auto mb-1" />
            <span className="text-xs font-caption text-text-primary">Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantQuickAccess;