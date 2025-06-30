import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TravelAdvisoryCard = ({ advisories }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-primary bg-primary-50 border-primary-200';
      default:
        return 'text-text-secondary bg-surface-100 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'AlertTriangle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-text-primary">Travel Advisories</h3>
        <div className="flex items-center space-x-1">
          <Icon name="Bell" size={16} color="var(--color-primary)" />
          {advisories.length > 0 && (
            <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-semibold">
              {advisories.length}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {advisories.length === 0 ? (
          <div className="text-center py-4">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" className="mx-auto mb-2" />
            <p className="text-sm font-body text-success">No active advisories</p>
            <p className="text-xs font-caption text-text-secondary">Your destination is clear</p>
          </div>
        ) : (
          advisories.slice(0, 2).map((advisory, index) => (
            <div key={index} className={`border rounded-lg p-3 ${getPriorityColor(advisory.priority)}`}>
              <div className="flex items-start space-x-2">
                <Icon 
                  name={getPriorityIcon(advisory.priority)} 
                  size={16} 
                  color={`var(--color-${advisory.priority === 'high' ? 'error' : advisory.priority === 'medium' ? 'warning' : 'primary'})`}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-body font-semibold mb-1">
                    {advisory.title}
                  </h4>
                  <p className="text-xs font-caption text-text-secondary">
                    {advisory.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="Calendar" size={12} color="var(--color-text-secondary)" />
                    <span className="text-xs font-caption text-text-secondary">
                      {advisory.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {advisories.length > 2 && (
          <Button variant="outline" size="sm" fullWidth>
            View All {advisories.length} Advisories
          </Button>
        )}
      </div>
    </div>
  );
};

export default TravelAdvisoryCard;