import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import LawSearchBar from './components/LawSearchBar';
import LawCategoryCard from './components/LawCategoryCard';
import BookmarkedLawsPanel from './components/BookmarkedLawsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LocalLawsRegulationsGuide = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['traffic']);
  const [bookmarkedLaws, setBookmarkedLaws] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Germany');
  const [showAIChat, setShowAIChat] = useState(false);

  // Mock data for law categories
  const lawCategories = [
    {
      id: 'traffic',
      title: 'Traffic & Transportation',
      icon: 'Car',
      criticalCount: 3,
      laws: [
        {
          id: 'traffic-1',
          title: 'Speed Limits in Residential Areas',
          description: 'Speed limits in residential areas are strictly enforced. Standard limit is 30 km/h in most zones, with some areas having 20 km/h limits.',
          severity: 'important',
          category: 'traffic',
          penalties: 'Fines from €35-€680 depending on speed excess. License suspension possible for severe violations.',
          examples: [
            'School zones often have 20 km/h limits during school hours',
            'Some residential areas have permanent 20 km/h zones',
            'Speed cameras are common in residential areas'
          ]
        },
        {
          id: 'traffic-2',
          title: 'Right of Way at Roundabouts',
          description: 'Vehicles already in the roundabout have absolute right of way. You must yield before entering.',
          severity: 'critical',
          category: 'traffic',
          penalties: 'Fines up to €120 and 1 point on license. Higher penalties if accident occurs.',
          examples: [
            'Always signal when exiting a roundabout',
            'Stop completely if pedestrians are crossing at the entrance',
            'Large roundabouts may have multiple lanes with specific rules'
          ]
        },
        {
          id: 'traffic-3',
          title: 'Bicycle Lane Regulations',
          description: 'Cars are prohibited from using bicycle lanes. Parking in bike lanes results in immediate fines and towing.',
          severity: 'critical',
          category: 'traffic',
          penalties: 'Fine of €55-€100 plus towing costs (€150-€300). Emergency vehicles may be blocked.',
          examples: [
            'Red-colored asphalt indicates dedicated bike lanes',
            'Some bike lanes are separated by physical barriers',
            'Delivery vehicles have specific time windows for access'
          ]
        }
      ]
    },
    {
      id: 'public',
      title: 'Public Behavior',
      icon: 'Users',
      criticalCount: 1,
      laws: [
        {
          id: 'public-1',
          title: 'Public Drinking Laws',
          description: 'Alcohol consumption is generally allowed in public spaces, but banned in certain areas and times.',
          severity: 'advisory',
          category: 'public',
          penalties: 'Fines from €15-€50. Confiscation of alcohol.',
          examples: [
            'No alcohol near schools or playgrounds',
            'Some cities ban alcohol in central areas after midnight',
            'Public transportation prohibits alcohol consumption'
          ]
        },
        {
          id: 'public-2',
          title: 'Noise Regulations (Quiet Hours)',
          description: 'Quiet hours (Ruhezeiten) are strictly enforced. Generally 22:00-06:00 on weekdays, extended on Sundays.',
          severity: 'important',
          category: 'public',
          penalties: 'Fines from €50-€2,500 for noise violations. Police intervention possible.',
          examples: [
            'No loud music, construction, or parties during quiet hours',
            'Sunday quiet hours often extended to all day',
            'Apartment buildings may have stricter rules'
          ]
        },
        {
          id: 'public-3',
          title: 'Littering and Waste Disposal',
          description: 'Strict penalties for littering. Improper waste disposal is taken very seriously.',
          severity: 'critical',
          category: 'public',
          penalties: 'Fines from €35-€500. Higher fines for cigarette butts and large items.',
          examples: [
            'Cigarette butts: €75 fine minimum',
            'Improper recycling can result in fines',
            'Dumping large items illegally: up to €2,500 fine'
          ]
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Sensitivities',
      icon: 'Heart',
      criticalCount: 0,
      laws: [
        {
          id: 'cultural-1',
          title: 'Photography Restrictions',
          description: 'Taking photos of people without consent is illegal. Strict rules around photography in certain areas.',
          severity: 'important',
          category: 'cultural',
          penalties: 'Legal action possible. Fines up to €10,000 for privacy violations.',
          examples: [
            'Always ask permission before photographing people',
            'No photography in some government buildings',
            'Be cautious with street photography including background people'
          ]
        },
        {
          id: 'cultural-2',
          title: 'Religious Site Etiquette',
          description: 'Specific dress codes and behavior expected in religious buildings and areas.',
          severity: 'advisory',
          category: 'cultural',
          penalties: 'Asked to leave premises. Possible fines for disruptive behavior.',
          examples: [
            'Cover shoulders and legs in churches',
            'Remove hats when entering religious buildings',
            'Silence phones and speak quietly'
          ]
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Regulations',
      icon: 'Briefcase',
      criticalCount: 1,
      laws: [
        {
          id: 'business-1',
          title: 'Shop Opening Hours',
          description: 'Strict regulations on when businesses can operate. Sunday shopping is very limited.',
          severity: 'advisory',
          category: 'business',
          penalties: 'Business closure orders. Fines for business owners.',
          examples: [
            'Most shops closed on Sundays except essential services',
            'Limited hours on public holidays',
            'Gas stations and pharmacies have extended hours'
          ]
        },
        {
          id: 'business-2',
          title: 'Work Permit Requirements',
          description: 'Working without proper permits is illegal and can result in deportation.',
          severity: 'critical',
          category: 'business',
          penalties: 'Deportation, fines up to €500,000, ban on re-entry.',
          examples: [
            'Students have limited work hours allowed',
            'Tourist visas do not permit work',
            'Freelancing requires specific permits'
          ]
        }
      ]
    },
    {
      id: 'unique',
      title: 'Unique Local Laws',
      icon: 'Zap',
      criticalCount: 2,
      laws: [
        {
          id: 'unique-1',
          title: 'Car Washing Restrictions',
          description: 'Washing cars on the street or in public spaces is prohibited in many German cities.',
          severity: 'advisory',
          category: 'unique',
          penalties: 'Fines from €50-€500 depending on city and environmental impact.',
          examples: [
            'Use designated car wash facilities only',
            'No washing in apartment complex parking areas',
            'Environmental protection laws strictly enforced'
          ]
        },
        {
          id: 'unique-2',
          title: 'Denial of Holocaust Laws',
          description: 'Holocaust denial or Nazi symbol display is a serious criminal offense.',
          severity: 'critical',
          category: 'unique',
          penalties: 'Prison sentence up to 5 years. Immediate deportation for non-citizens.',
          examples: [
            'Any Nazi symbols or gestures are forbidden',
            'Denying historical facts about Holocaust is illegal',
            'This applies to online content and social media posts'
          ]
        },
        {
          id: 'unique-3',
          title: 'Bottle Return System (Pfand)',
          description: 'Mandatory deposit system for bottles and cans. Not returning bottles is not illegal but culturally expected.',
          severity: 'advisory',
          category: 'unique',
          penalties: 'No legal penalties, but significant social pressure and waste of money.',
          examples: [
            'Most bottles and cans have 8-25 cent deposits',
            'Return machines available in most supermarkets',
            'Leaving bottles for collectors is common and appreciated'
          ]
        }
      ]
    }
  ];

  // Filter laws based on search and filters
  const getFilteredCategories = () => {
    return lawCategories.map(category => {
      const filteredLaws = category.laws.filter(law => {
        const matchesSearch = !searchQuery || 
          law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          law.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          law.penalties?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilters = activeFilters.length === 0 || 
          activeFilters.includes(law.severity) ||
          activeFilters.includes(law.category);

        return matchesSearch && matchesFilters;
      });

      return {
        ...category,
        laws: filteredLaws,
        criticalCount: filteredLaws.filter(law => law.severity === 'critical').length
      };
    }).filter(category => category.laws.length > 0);
  };

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLawBookmark = (lawId) => {
    setBookmarkedLaws(prev => {
      const isBookmarked = prev.some(bookmark => bookmark.id === lawId);
      
      if (isBookmarked) {
        return prev.filter(bookmark => bookmark.id !== lawId);
      } else {
        // Find the law in categories
        const law = lawCategories
          .flatMap(cat => cat.laws)
          .find(l => l.id === lawId);
        
        if (law) {
          return [...prev, { ...law, bookmarkedAt: new Date().toISOString() }];
        }
        return prev;
      }
    });
  };

  const handleRemoveBookmark = (lawId) => {
    setBookmarkedLaws(prev => prev.filter(bookmark => bookmark.id !== lawId));
  };

  const handleLawSelect = (law) => {
    // Scroll to law in main content
    setShowBookmarks(false);
    const categoryToExpand = law.category;
    if (!expandedCategories.includes(categoryToExpand)) {
      setExpandedCategories(prev => [...prev, categoryToExpand]);
    }
    // In a real app, you might scroll to the specific law
  };

  const handleAIAssistant = () => {
    navigate('/ai-chat-assistant');
  };

  const filteredCategories = getFilteredCategories();
  const totalLaws = filteredCategories.reduce((sum, cat) => sum + cat.laws.length, 0);
  const criticalLaws = filteredCategories.reduce((sum, cat) => sum + cat.criticalCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Icon name="Scale" size={22} color="white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                  Local Laws & Regulations
                </h1>
                <p className="text-text-secondary">
                  Essential legal information for {selectedLocation}
                </p>
              </div>
            </div>

            {/* AI Assistant Button */}
            <Button
              variant="primary"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleAIAssistant}
              className="hidden sm:flex"
            >
              Ask AI
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                {totalLaws}
              </div>
              <div className="text-sm text-text-secondary">Total Laws</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-heading font-bold text-error mb-1">
                {criticalLaws}
              </div>
              <div className="text-sm text-text-secondary">Critical</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {bookmarkedLaws.length}
              </div>
              <div className="text-sm text-text-secondary">Bookmarked</div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                {filteredCategories.length}
              </div>
              <div className="text-sm text-text-secondary">Categories</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <LawSearchBar
              onSearch={setSearchQuery}
              onFilterChange={setActiveFilters}
              activeFilters={activeFilters}
              searchPlaceholder="Search laws, regulations, keywords..."
            />

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-smooth min-touch-target ${
                    showBookmarks 
                      ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon name="Bookmark" size={16} color="currentColor" />
                  <span className="text-sm">Bookmarks</span>
                  {bookmarkedLaws.length > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      showBookmarks ? 'bg-white bg-opacity-20' : 'bg-primary text-white'
                    }`}>
                      {bookmarkedLaws.length}
                    </span>
                  )}
                </button>

                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:border-primary hover:text-primary transition-smooth min-touch-target">
                  <Icon name="Download" size={16} color="currentColor" />
                  <span className="text-sm">Download Guide</span>
                </button>
              </div>

              {/* Mobile AI Assistant */}
              <Button
                variant="primary"
                size="sm"
                iconName="MessageCircle"
                onClick={handleAIAssistant}
                className="sm:hidden"
              />
            </div>

            {/* Results Summary */}
            {(searchQuery || activeFilters.length > 0) && (
              <div className="bg-info-50 border border-info-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-info">
                  <Icon name="Search" size={16} color="currentColor" />
                  <span className="text-sm font-medium">
                    Found {totalLaws} laws across {filteredCategories.length} categories
                  </span>
                </div>
              </div>
            )}

            {/* Law Categories */}
            <div className="space-y-4">
              {filteredCategories.map(category => (
                <LawCategoryCard
                  key={category.id}
                  category={category}
                  isExpanded={expandedCategories.includes(category.id)}
                  onToggle={() => handleCategoryToggle(category.id)}
                  onLawBookmark={handleLawBookmark}
                  bookmarkedLaws={bookmarkedLaws.map(b => b.id)}
                />
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 rounded-full flex items-center justify-center">
                    <Icon name="Search" size={24} color="var(--color-text-secondary)" />
                  </div>
                  <h3 className="font-heading font-semibold text-text-primary mb-2">
                    No Laws Found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilters([]);
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Bookmarked Laws Panel */}
              {showBookmarks && (
                <BookmarkedLawsPanel
                  bookmarkedLaws={bookmarkedLaws}
                  onRemoveBookmark={handleRemoveBookmark}
                  onLawSelect={handleLawSelect}
                  className="lg:hidden"
                />
              )}

              {/* Desktop Bookmarks */}
              <div className="hidden lg:block">
                <BookmarkedLawsPanel
                  bookmarkedLaws={bookmarkedLaws}
                  onRemoveBookmark={handleRemoveBookmark}
                  onLawSelect={handleLawSelect}
                />
              </div>

              {/* Emergency Information */}
              <div className="bg-error-50 border border-error-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="AlertTriangle" size={18} color="var(--color-error)" />
                  <h3 className="font-heading font-semibold text-error">
                    Emergency Legal Help
                  </h3>
                </div>
                <p className="text-sm text-error mb-4">
                  If you're facing legal issues or need immediate assistance
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => navigate('/emergency-information-contacts')}
                >
                  Emergency Contacts
                </Button>
              </div>

              {/* Quick Tips */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  Quick Tips
                </h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>Always carry proper identification</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>Keep important documents backed up</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>When in doubt, ask locals or authorities</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>Use AI assistant for clarification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmergencyAccessButton />
    </div>
  );
};

export default LocalLawsRegulationsGuide;