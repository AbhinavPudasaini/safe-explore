import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = ({ 
  suggestions, 
  onAcceptSuggestion, 
  onDismissSuggestion 
}) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);

  const getSuggestionIcon = (type) => {
    const iconMap = {
      'document': 'FileText',
      'deadline': 'Calendar',
      'requirement': 'CheckCircle',
      'tip': 'Lightbulb',
      'warning': 'AlertTriangle'
    };
    return iconMap[type] || 'Info';
  };

  const getSuggestionColor = (type) => {
    const colorMap = {
      'document': 'primary',
      'deadline': 'warning',
      'requirement': 'success',
      'tip': 'accent',
      'warning': 'error'
    };
    return colorMap[type] || 'primary';
  };

  const handleToggleExpanded = (suggestionId) => {
    setExpandedSuggestion(
      expandedSuggestion === suggestionId ? null : suggestionId
    );
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={20} color="var(--color-accent)" />
        <h3 className="font-body font-semibold text-text-primary">
          Smart Suggestions
        </h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => {
          const isExpanded = expandedSuggestion === suggestion.id;
          const color = getSuggestionColor(suggestion.type);
          
          return (
            <div 
              key={suggestion.id} 
              className={`border border-${color}-200 bg-${color}-50 rounded-lg overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon 
                      name={getSuggestionIcon(suggestion.type)} 
                      size={16} 
                      color={`var(--color-${color})`} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-body font-semibold text-text-primary">
                        {suggestion.title}
                      </h4>
                      {suggestion.priority && (
                        <span className={`text-xs font-caption px-2 py-1 rounded-full bg-${color}-200 text-${color}-700`}>
                          {suggestion.priority}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-text-secondary font-caption mb-3">
                      {suggestion.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {suggestion.actionable && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onAcceptSuggestion(suggestion.id)}
                        >
                          {suggestion.actionText || 'Apply'}
                        </Button>
                      )}
                      
                      {suggestion.details && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                          iconPosition="right"
                          onClick={() => handleToggleExpanded(suggestion.id)}
                        >
                          {isExpanded ? 'Less' : 'More'} Details
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => onDismissSuggestion(suggestion.id)}
                        className="ml-auto"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && suggestion.details && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="space-y-3">
                      {suggestion.details.steps && (
                        <div>
                          <h5 className="font-body font-semibold text-text-primary mb-2">
                            Steps to Complete:
                          </h5>
                          <ol className="space-y-1">
                            {suggestion.details.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className={`w-5 h-5 bg-${color} text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5`}>
                                  {index + 1}
                                </span>
                                <span className="text-sm text-text-secondary font-caption">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {suggestion.details.requirements && (
                        <div>
                          <h5 className="font-body font-semibold text-text-primary mb-2">
                            Requirements:
                          </h5>
                          <ul className="space-y-1">
                            {suggestion.details.requirements.map((req, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Icon 
                                  name="ArrowRight" 
                                  size={14} 
                                  color="var(--color-text-secondary)" 
                                  className="mt-0.5" 
                                />
                                <span className="text-sm text-text-secondary font-caption">
                                  {req}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {suggestion.details.timeline && (
                        <div>
                          <h5 className="font-body font-semibold text-text-primary mb-2">
                            Estimated Timeline:
                          </h5>
                          <p className="text-sm text-text-secondary font-caption">
                            {suggestion.details.timeline}
                          </p>
                        </div>
                      )}

                      {suggestion.details.tips && (
                        <div>
                          <h5 className="font-body font-semibold text-text-primary mb-2">
                            Pro Tips:
                          </h5>
                          <ul className="space-y-1">
                            {suggestion.details.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Icon 
                                  name="Lightbulb" 
                                  size={14} 
                                  color="var(--color-accent)" 
                                  className="mt-0.5" 
                                />
                                <span className="text-sm text-text-secondary font-caption">
                                  {tip}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Assistant Prompt */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} color="var(--color-primary)" />
            <span className="text-sm font-caption text-text-secondary">
              Need more personalized help?
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestions;