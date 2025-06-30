import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionsBar = ({ bookmarks, recentSearches }) => {
  const navigate = useNavigate();

  const handleBookmarkClick = (bookmark) => {
    if (bookmark.route) {
      navigate(bookmark.route);
    }
  };

  const handleSearchClick = (search) => {
    // In a real app, this would trigger a search with the query
    console.log('Searching for:', search.query);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 shadow-soft">
      <h3 className="font-heading font-semibold text-text-primary mb-3">Quick Actions</h3>
      
      <div className="space-y-4">
        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <div>
            <h4 className="text-xs font-caption text-text-secondary mb-2 uppercase tracking-wide flex items-center space-x-1">
              <Icon name="Bookmark" size={12} color="var(--color-text-secondary)" />
              <span>Bookmarked</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {bookmarks.slice(0, 4).map((bookmark, index) => (
                <button
                  key={index}
                  onClick={() => handleBookmarkClick(bookmark)}
                  className="flex items-center space-x-2 px-3 py-2 bg-surface-100 border border-border rounded-lg hover:bg-surface-200 transition-smooth"
                >
                  <Icon name={bookmark.icon} size={14} color="var(--color-primary)" />
                  <span className="text-sm font-body text-text-primary">{bookmark.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <h4 className="text-xs font-caption text-text-secondary mb-2 uppercase tracking-wide flex items-center space-x-1">
              <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
              <span>Recent Searches</span>
            </h4>
            <div className="space-y-1">
              {recentSearches.slice(0, 3).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchClick(search)}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-surface-100 rounded-lg transition-smooth"
                >
                  <Icon name="Search" size={14} color="var(--color-text-secondary)" />
                  <div className="flex-1">
                    <span className="text-sm font-body text-text-primary">{search.query}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-caption text-text-secondary">{search.category}</span>
                      <span className="text-xs font-caption text-text-secondary">•</span>
                      <span className="text-xs font-caption text-text-secondary">{search.timestamp}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-caption text-text-secondary mb-2 uppercase tracking-wide flex items-center space-x-1">
            <Icon name="Zap" size={12} color="var(--color-text-secondary)" />
            <span>Quick Links</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate('/emergency-information-contacts')}
              className="flex items-center space-x-2 p-2 bg-error-50 border border-error-200 rounded-lg hover:bg-error-100 transition-smooth"
            >
              <Icon name="Phone" size={16} color="var(--color-error)" />
              <span className="text-sm font-body text-error">Emergency</span>
            </button>
            <button
              onClick={() => navigate('/local-services-finder')}
              className="flex items-center space-x-2 p-2 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-smooth"
            >
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
              <span className="text-sm font-body text-primary">Services</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsBar;