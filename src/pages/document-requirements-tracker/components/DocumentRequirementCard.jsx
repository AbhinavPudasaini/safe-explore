import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentRequirementCard = ({ 
  requirement, 
  onStatusUpdate, 
  onUploadDocument, 
  onAddNote 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState(requirement.notes || '');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      'not-started': {
        color: 'text-text-secondary',
        bgColor: 'bg-surface-200',
        icon: 'Circle',
        label: 'Not Started'
      },
      'in-progress': {
        color: 'text-warning',
        bgColor: 'bg-warning-100',
        icon: 'Clock',
        label: 'In Progress'
      },
      'completed': {
        color: 'text-success',
        bgColor: 'bg-success-100',
        icon: 'CheckCircle',
        label: 'Completed'
      },
      'verified': {
        color: 'text-primary',
        bgColor: 'bg-primary-100',
        icon: 'Shield',
        label: 'Verified'
      }
    };
    return configs[status] || configs['not-started'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error',
      'medium': 'text-warning',
      'low': 'text-success'
    };
    return colors[priority] || 'text-text-secondary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const statusConfig = getStatusConfig(requirement.status);

  const handleSaveNote = () => {
    onAddNote(requirement.id, noteText);
    setIsAddingNote(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Main Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-body font-semibold text-text-primary">
                {requirement.name}
              </h3>
              {requirement.priority === 'high' && (
                <Icon 
                  name="AlertTriangle" 
                  size={16} 
                  color="var(--color-error)" 
                />
              )}
            </div>
            <p className="text-sm text-text-secondary font-caption mb-2">
              {requirement.description}
            </p>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-surface-100 rounded-lg transition-smooth min-touch-target"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              color="var(--color-text-secondary)" 
            />
          </button>
        </div>

        {/* Status and Due Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bgColor}`}>
              <Icon 
                name={statusConfig.icon} 
                size={14} 
                color={`var(--color-${statusConfig.color.replace('text-', '')})`}
              />
              <span className={`text-xs font-caption ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
            {requirement.priority && (
              <span className={`text-xs font-caption ${getPriorityColor(requirement.priority)} uppercase`}>
                {requirement.priority} Priority
              </span>
            )}
          </div>
          
          {requirement.dueDate && (
            <div className="flex items-center space-x-1">
              <Icon 
                name="Calendar" 
                size={14} 
                color={isOverdue(requirement.dueDate) ? "var(--color-error)" : "var(--color-text-secondary)"} 
              />
              <span className={`text-xs font-caption ${isOverdue(requirement.dueDate) ? 'text-error' : 'text-text-secondary'}`}>
                {formatDate(requirement.dueDate)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {requirement.status !== 'completed' && requirement.status !== 'verified' && (
            <Button
              variant="primary"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => onUploadDocument(requirement.id)}
            >
              Upload
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCircle"
            iconPosition="left"
            onClick={() => onStatusUpdate(requirement.id, 'completed')}
            disabled={requirement.status === 'completed' || requirement.status === 'verified'}
          >
            Mark Complete
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Get Help
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-surface-50">
          {/* Requirements Details */}
          {requirement.requirements && requirement.requirements.length > 0 && (
            <div className="mb-4">
              <h4 className="font-body font-semibold text-text-primary mb-2">
                Requirements:
              </h4>
              <ul className="space-y-1">
                {requirement.requirements.map((req, index) => (
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

          {/* Uploaded Documents */}
          {requirement.uploadedDocuments && requirement.uploadedDocuments.length > 0 && (
            <div className="mb-4">
              <h4 className="font-body font-semibold text-text-primary mb-2">
                Uploaded Documents:
              </h4>
              <div className="space-y-2">
                {requirement.uploadedDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-surface rounded-lg">
                    <Icon name="FileText" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-caption text-text-primary flex-1">
                      {doc.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {doc.uploadDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-body font-semibold text-text-primary">
                Notes:
              </h4>
              <Button
                variant="ghost"
                size="sm"
                iconName="Plus"
                onClick={() => setIsAddingNote(!isAddingNote)}
              >
                Add Note
              </Button>
            </div>
            
            {isAddingNote && (
              <div className="mb-3">
                <Input
                  type="text"
                  placeholder="Add a note about this requirement..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="mb-2"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveNote}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {requirement.notes && (
              <p className="text-sm text-text-secondary font-caption bg-surface p-3 rounded-lg">
                {requirement.notes}
              </p>
            )}
          </div>

          {/* Smart Suggestions */}
          {requirement.suggestions && requirement.suggestions.length > 0 && (
            <div>
              <h4 className="font-body font-semibold text-text-primary mb-2">
                Smart Suggestions:
              </h4>
              <div className="space-y-2">
                {requirement.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-accent-50 rounded-lg">
                    <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
                    <span className="text-sm text-text-secondary font-caption">
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentRequirementCard;