import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkedResponses = ({ bookmarks, onBookmarkSelect, onBookmarkRemove, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'Bookmark' },
    { id: 'visa', label: 'Visa & Immigration', icon: 'FileText' },
    { id: 'safety', label: 'Safety', icon: 'Shield' },
    { id: 'culture', label: 'Culture', icon: 'Globe' },
    { id: 'emergency', label: 'Emergency', icon: 'AlertTriangle' }
  ];

  const filteredBookmarks = bookmarks?.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleBookmarkClick = (bookmark) => {
    if (onBookmarkSelect) {
      onBookmarkSelect(bookmark);
    }
  };

  const handleRemoveBookmark = (e, bookmarkId) => {
    e.stopPropagation();
    if (onBookmarkRemove) {
      onBookmarkRemove(bookmarkId);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-surface border-l border-border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
          Bookmarked Responses
        </h3>

        {/* Search */}
        <div className="relative mb-3">
          <Icon 
            name="Search" 
            size={16} 
            color="var(--color-text-secondary)"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              size="xs"
              iconName={category.icon}
              iconPosition="left"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="overflow-y-auto h-full">
        {filteredBookmarks.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bookmark" size={48} color="var(--color-text-secondary)" className="mx-auto mb-3" />
            <p className="text-sm font-body text-text-secondary mb-2">
              {searchTerm || selectedCategory !== 'all' ?'No bookmarks match your search' :'No bookmarked responses yet'
              }
            </p>
            <p className="text-xs font-caption text-text-secondary">
              Bookmark helpful AI responses for quick access later
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                onClick={() => handleBookmarkClick(bookmark)}
                className="p-3 border border-border rounded-lg hover:bg-surface-100 transition-smooth cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={categories.find(cat => cat.id === bookmark.category)?.icon || 'Bookmark'} 
                      size={14} 
                      color="var(--color-primary)" 
                    />
                    <span className="text-sm font-body font-medium text-text-primary">
                      {bookmark.title}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    onClick={(e) => handleRemoveBookmark(e, bookmark.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-error"
                  />
                </div>

                <p className="text-xs font-caption text-text-secondary mb-3 leading-relaxed">
                  {truncateContent(bookmark.content)}
                </p>

                <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
                  <span>{formatDate(bookmark.createdAt)}</span>
                  <div className="flex items-center space-x-2">
                    {bookmark.isEmergency && (
                      <span className="flex items-center space-x-1 text-error">
                        <Icon name="AlertTriangle" size={10} />
                        <span>Emergency</span>
                      </span>
                    )}
                    <span className="bg-surface-200 px-2 py-1 rounded text-xs">
                      {categories.find(cat => cat.id === bookmark.category)?.label || 'General'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedResponses;