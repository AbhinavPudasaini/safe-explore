import React, { useState, useRef } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, onVoiceInput, onFileUpload, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic would go here
      if (onVoiceInput) {
        onVoiceInput('voice recording stopped');
      }
    } else {
      setIsRecording(true);
      // Start recording logic would go here
      if (onVoiceInput) {
        onVoiceInput('voice recording started');
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-t border-border bg-surface p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* File Upload Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconName="Paperclip"
          onClick={triggerFileUpload}
          disabled={disabled}
          className="flex-shrink-0 min-touch-target"
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end space-x-2 bg-surface-100 rounded-2xl border border-border focus-within:border-primary transition-smooth">
            <div className="flex-1 px-4 py-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "Recording..." : "Ask me anything about travel, immigration, or local information..."}
                disabled={disabled || isRecording}
                className="w-full bg-transparent border-none outline-none resize-none text-sm font-body text-text-primary placeholder-text-secondary max-h-32 min-h-[20px]"
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '20px',
                  maxHeight: '128px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
              />
            </div>

            {/* Voice Input Button */}
            <Button
              type="button"
              variant={isRecording ? "danger" : "ghost"}
              size="sm"
              iconName={isRecording ? "Square" : "Mic"}
              onClick={handleVoiceToggle}
              disabled={disabled}
              className={`flex-shrink-0 mr-2 min-touch-target ${
                isRecording ? 'animate-pulse' : ''
              }`}
            />
          </div>

          {/* Character Count */}
          {message.length > 0 && (
            <div className="absolute -bottom-6 right-0 text-xs font-caption text-text-secondary">
              {message.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          iconName="Send"
          disabled={!message.trim() || disabled || isRecording}
          className="flex-shrink-0 min-touch-target"
        />
      </form>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-3 p-2 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm font-caption text-error">Recording... Tap to stop</span>
          </div>
        </div>
      )}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center space-x-2 mt-3 px-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm font-caption text-text-secondary">AI is typing...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;