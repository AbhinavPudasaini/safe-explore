import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentProgressTracker = ({ documentProgress }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success-50 border-success-200';
      case 'in-progress':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'pending':
        return 'text-text-secondary bg-surface-100 border-border';
      case 'urgent':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-secondary bg-surface-100 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      case 'urgent':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const handleViewDetails = () => {
    navigate('/document-requirements-tracker');
  };

  const completedCount = documentProgress.items.filter(item => item.status === 'completed').length;
  const totalCount = documentProgress.items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-text-primary">Document Progress</h3>
        <Icon name="FileText" size={20} color="var(--color-primary)" />
      </div>

      {/* Progress Overview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-text-primary">
            {completedCount} of {totalCount} completed
          </span>
          <span className="text-sm font-body font-semibold text-primary">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-surface-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Document Items */}
      <div className="space-y-2 mb-4">
        {documentProgress.items.slice(0, 3).map((item, index) => (
          <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg border ${getStatusColor(item.status)}`}>
            <Icon 
              name={getStatusIcon(item.status)} 
              size={16} 
              color={`var(--color-${item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'warning' : item.status === 'urgent' ? 'error' : 'text-secondary'})`}
            />
            <div className="flex-1">
              <span className="text-sm font-body text-text-primary">{item.name}</span>
              {item.dueDate && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Calendar" size={12} color="var(--color-text-secondary)" />
                  <span className="text-xs font-caption text-text-secondary">
                    Due: {item.dueDate}
                  </span>
                </div>
              )}
            </div>
            {item.status === 'urgent' && (
              <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button 
          variant="primary" 
          size="sm" 
          iconName="ArrowRight" 
          iconPosition="right"
          onClick={handleViewDetails}
          fullWidth
        >
          View All Documents
        </Button>
        
        {documentProgress.urgentCount > 0 && (
          <div className="flex items-center space-x-2 p-2 bg-error-50 border border-error-200 rounded-lg">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <span className="text-sm font-body text-error">
              {documentProgress.urgentCount} urgent item{documentProgress.urgentCount > 1 ? 's' : ''} need attention
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentProgressTracker;