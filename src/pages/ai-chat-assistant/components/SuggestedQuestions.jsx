import React from 'react';
import Button from '../../../components/ui/Button';

const SuggestedQuestions = ({ questions, onQuestionSelect, className = "" }) => {
  const handleQuestionClick = (question) => {
    if (onQuestionSelect) {
      onQuestionSelect(question);
    }
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className={`px-4 py-3 border-t border-border bg-surface-50 ${className}`}>
      <div className="mb-2">
        <span className="text-xs font-caption text-text-secondary uppercase tracking-wide">
          Suggested Questions
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="xs"
            onClick={() => handleQuestionClick(question)}
            className="text-xs font-body border-border-medium hover:border-primary hover:text-primary transition-smooth"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;