import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onQuickAction, onLinkClick }) => {
  const isUser = message.sender === 'user';
  const isEmergency = message.type === 'emergency';

  const formatMessageContent = (content) => {
    if (typeof content === 'string') {
      return content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return content;
  };

  const handleQuickAction = (action) => {
    if (onQuickAction) {
      onQuickAction(action);
    }
  };

  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex-shrink-0 mr-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isEmergency ? 'bg-error' : 'bg-primary'
            }`}>
              <Icon 
                name={isEmergency ? "AlertTriangle" : "Bot"} 
                size={16} 
                color="white" 
              />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-3' 
            : `bg-surface border border-border ${isEmergency ? 'border-error-200 bg-error-50' : ''}`
        }`}>
          {/* Message Text */}
          <div className={`text-sm font-body leading-relaxed ${
            isUser ? 'text-primary-foreground' : 'text-text-primary'
          }`}>
            {formatMessageContent(message.content)}
          </div>

          {/* Rich Content */}
          {message.richContent && (
            <div className="mt-3 space-y-3">
              {/* Links */}
              {message.richContent.links && message.richContent.links.length > 0 && (
                <div className="space-y-2">
                  {message.richContent.links.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(link)}
                      className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-smooth text-sm"
                    >
                      <Icon name="ExternalLink" size={14} />
                      <span className="underline">{link.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Lists */}
              {message.richContent.list && message.richContent.list.length > 0 && (
                <ul className="space-y-1 ml-4">
                  {message.richContent.list.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Quick Actions */}
              {message.richContent.quickActions && message.richContent.quickActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.richContent.quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="xs"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Document/Image */}
              {message.richContent.document && (
                <div className="bg-surface-100 rounded-lg p-3 border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="text-sm font-body text-text-primary">
                        {message.richContent.document.name}
                      </p>
                      <p className="text-xs font-caption text-text-secondary">
                        {message.richContent.document.type} • {message.richContent.document.size}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs font-caption mt-2 ${
            isUser ? 'text-primary-200' : 'text-text-secondary'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="flex-shrink-0 ml-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;