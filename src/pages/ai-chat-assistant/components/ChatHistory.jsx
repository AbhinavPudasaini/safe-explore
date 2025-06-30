import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHistory = ({ conversations, onConversationSelect, currentConversationId, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleConversationClick = (conversationId) => {
    if (onConversationSelect) {
      onConversationSelect(conversationId);
    }
  };

  const handleDeleteConversation = (e, conversationId) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      // Delete logic would go here
      console.log('Deleting conversation:', conversationId);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const truncateMessage = (message, maxLength = 60) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (!conversations || conversations.length === 0) {
    return (
      <div className={`bg-surface-50 border-r border-border ${className}`}>
        <div className="p-4 text-center">
          <Icon name="MessageCircle" size={48} color="var(--color-text-secondary)" className="mx-auto mb-3" />
          <p className="text-sm font-body text-text-secondary">
            No chat history yet. Start a conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface-50 border-r border-border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Chat History
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            onClick={() => window.location.reload()}
            className="min-touch-target"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="overflow-y-auto h-full">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              className={`w-full text-left p-3 rounded-lg transition-smooth hover:bg-surface-100 group ${
                currentConversationId === conversation.id 
                  ? 'bg-primary-50 border border-primary-200' :'border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Conversation Title */}
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={conversation.isEmergency ? "AlertTriangle" : "MessageCircle"} 
                      size={14} 
                      color={conversation.isEmergency ? "var(--color-error)" : "var(--color-primary)"} 
                    />
                    <span className="text-sm font-body font-medium text-text-primary truncate">
                      {conversation.title || 'Untitled Chat'}
                    </span>
                  </div>

                  {/* Last Message Preview */}
                  <p className="text-xs font-caption text-text-secondary mb-2 line-clamp-2">
                    {truncateMessage(conversation.lastMessage)}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
                    <span>{formatDate(conversation.lastActivity)}</span>
                    <div className="flex items-center space-x-2">
                      <span>{conversation.messageCount} messages</span>
                      {conversation.hasBookmarks && (
                        <Icon name="Bookmark" size={12} color="var(--color-warning)" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Trash2"
                    onClick={(e) => handleDeleteConversation(e, conversation.id)}
                    className="text-error hover:bg-error-50"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load More */}
        {conversations.length >= 10 && (
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="ChevronDown"
              iconPosition="right"
            >
              Load More Conversations
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;