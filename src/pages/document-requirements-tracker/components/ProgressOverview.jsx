import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressOverview = ({ 
  overallProgress, 
  categoryProgress, 
  upcomingDeadlines,
  onViewAllDeadlines 
}) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const getDeadlineColor = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-error';
    if (diffDays <= 3) return 'text-warning';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft p-4 lg:p-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Overall Progress
          </h2>
          <span className={`text-2xl font-heading font-bold ${getProgressColor(overallProgress.percentage)}`}>
            {overallProgress.percentage}%
          </span>
        </div>
        
        <div className="w-full bg-surface-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressBgColor(overallProgress.percentage)}`}
            style={{ width: `${overallProgress.percentage}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-text-secondary font-caption">
          {overallProgress.completed} of {overallProgress.total} documents completed
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="mb-6">
        <h3 className="font-body font-semibold text-text-primary mb-4">
          Progress by Category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryProgress.map((category) => (
            <div key={category.id} className="bg-surface-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={category.icon} 
                  size={16} 
                  color="var(--color-primary)" 
                />
                <span className="text-sm font-caption text-text-primary">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">
                  {category.completed}/{category.total}
                </span>
                <span className={`text-xs font-semibold ${getProgressColor(category.percentage)}`}>
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${getProgressBgColor(category.percentage)}`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-body font-semibold text-text-primary">
            Upcoming Deadlines
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={onViewAllDeadlines}
          >
            View All
          </Button>
        </div>
        
        {upcomingDeadlines.length > 0 ? (
          <div className="space-y-3">
            {upcomingDeadlines.slice(0, 3).map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon 
                      name="FileText" 
                      size={16} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-body text-text-primary">
                      {deadline.name}
                    </p>
                    <p className="text-xs text-text-secondary font-caption">
                      {deadline.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-caption ${getDeadlineColor(deadline.dueDate)}`}>
                    {formatDate(deadline.dueDate)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {new Date(deadline.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Icon 
              name="Calendar" 
              size={48} 
              color="var(--color-text-secondary)" 
              className="mx-auto mb-3 opacity-50"
            />
            <p className="text-text-secondary font-caption">
              No upcoming deadlines
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-body font-semibold text-text-primary mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            iconName="Upload"
            iconPosition="left"
          >
            Upload Documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Get AI Help
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;