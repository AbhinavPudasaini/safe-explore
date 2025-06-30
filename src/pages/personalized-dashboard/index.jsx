import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import WeatherSafetyCard from './components/WeatherSafetyCard';
import TravelAdvisoryCard from './components/TravelAdvisoryCard';
import AIAssistantQuickAccess from './components/AIAssistantQuickAccess';
import DocumentProgressTracker from './components/DocumentProgressTracker';
import FeatureShortcutCard from './components/FeatureShortcutCard';
import QuickActionsBar from './components/QuickActionsBar';
import FloatingAIChatButton from './components/FloatingAIChatButton';
import Icon from '../../components/AppIcon';

const PersonalizedDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock data for location and weather
  const locationData = {
    city: "San Francisco",
    country: "United States",
    weather: {
      condition: "Partly Cloudy",
      temperature: 22
    },
    safety: {
      level: "safe",
      status: "Safe to Travel",
      description: "Current conditions are favorable for travel and outdoor activities."
    },
    lastUpdated: "5 minutes ago"
  };

  // Mock travel advisories
  const travelAdvisories = [
    {
      title: "Visa Processing Delays",
      description: "Student visa applications are experiencing 2-3 week delays due to high volume.",
      priority: "medium",
      date: "Dec 15, 2024"
    },
    {
      title: "Health Insurance Requirement",
      description: "New mandatory health insurance verification for all international students.",
      priority: "high",
      date: "Dec 10, 2024"
    }
  ];

  // Mock AI assistant recent queries
  const recentQueries = [
    {
      text: "What documents do I need for student visa renewal?",
      timestamp: "2 hours ago"
    },
    {
      text: "How to find affordable housing near university?",
      timestamp: "Yesterday"
    }
  ];

  // Mock document progress
  const documentProgress = {
    items: [
      {
        name: "Passport Renewal",
        status: "completed",
        dueDate: null
      },
      {
        name: "Student Visa Application",
        status: "in-progress",
        dueDate: "Jan 15, 2025"
      },
      {
        name: "Health Insurance Verification",
        status: "urgent",
        dueDate: "Dec 20, 2024"
      },
      {
        name: "University Enrollment Letter",
        status: "pending",
        dueDate: "Jan 30, 2025"
      },
      {
        name: "Financial Statement",
        status: "completed",
        dueDate: null
      }
    ],
    urgentCount: 1
  };

  // Mock feature shortcuts
  const featureShortcuts = [
    {
      title: "Country Guides",
      description: "Comprehensive guides for living, studying, and working in your destination country.",
      icon: "Globe",
      route: "/country-guides",
      featured: true,
      stats: [
        { icon: "Book", value: "50+ guides" },
        { icon: "Users", value: "Updated daily" }
      ]
    },
    {
      title: "Legal Requirements",
      description: "Stay compliant with visa, work permit, and residency requirements.",
      icon: "Scale",
      route: "/legal-requirements",
      badge: { type: "count", value: 3 },
      stats: [
        { icon: "CheckCircle", value: "85% complete" }
      ]
    },
    {
      title: "Cultural Tips",
      description: "Learn local customs, etiquette, and cultural norms to integrate smoothly.",
      icon: "Heart",
      route: "/cultural-tips",
      badge: { type: "new" },
      stats: [
        { icon: "Star", value: "4.9 rating" }
      ]
    },
    {
      title: "Emergency Contacts",
      description: "Quick access to emergency services, consulates, and support hotlines.",
      icon: "Phone",
      route: "/emergency-information-contacts",
      badge: { type: "urgent" },
      quickActions: {
        label: "Always accessible"
      }
    },
    {
      title: "Local Services",
      description: "Find healthcare, legal aid, educational services, and more in your area.",
      icon: "MapPin",
      route: "/local-services-finder",
      stats: [
        { icon: "Navigation", value: "500+ services" },
        { icon: "Clock", value: "Real-time" }
      ]
    },
    {
      title: "Language Support",
      description: "Translation tools, language learning resources, and communication aids.",
      icon: "Languages",
      route: "/language-support",
      stats: [
        { icon: "Globe", value: "25+ languages" }
      ]
    }
  ];

  // Mock bookmarks and recent searches
  const bookmarks = [
    { title: "Visa Renewal", icon: "FileText", route: "/document-requirements-tracker" },
    { title: "Health Services", icon: "Heart", route: "/local-services-finder" },
    { title: "Emergency Info", icon: "AlertTriangle", route: "/emergency-information-contacts" },
    { title: "Cultural Guide", icon: "Book", route: "/cultural-tips" }
  ];

  const recentSearches = [
    { query: "student visa requirements", category: "Documents", timestamp: "2 hours ago" },
    { query: "healthcare near me", category: "Services", timestamp: "Yesterday" },
    { query: "emergency contacts", category: "Safety", timestamp: "2 days ago" }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefresh(new Date());
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Welcome back, Alex
              </h1>
              <p className="text-text-secondary font-body">
                Here's your personalized travel assistance dashboard
              </p>
            </div>
            
            {/* Pull to Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                color="var(--color-primary)"
                className={isRefreshing ? 'animate-spin' : ''}
              />
              <span className="text-sm font-body text-primary">
                {isRefreshing ? 'Updating...' : 'Refresh'}
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-xs font-caption text-text-secondary">
            <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Priority Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WeatherSafetyCard locationData={locationData} />
          <TravelAdvisoryCard advisories={travelAdvisories} />
        </div>

        {/* AI Assistant and Document Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AIAssistantQuickAccess recentQueries={recentQueries} />
          <DocumentProgressTracker documentProgress={documentProgress} />
        </div>

        {/* Feature Shortcuts Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Quick Access
            </h2>
            <button className="text-sm font-body text-primary hover:text-primary-600 transition-smooth">
              View All Features
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureShortcuts.map((feature, index) => (
              <FeatureShortcutCard key={index} feature={feature} />
            ))}
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mb-6">
          <QuickActionsBar bookmarks={bookmarks} recentSearches={recentSearches} />
        </div>

        {/* Personalization Notice */}
        <div className="bg-gradient-subtle border border-primary-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Sparkles" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                Personalized for You
              </h3>
              <p className="text-sm font-body text-text-secondary mb-3">
                This dashboard adapts to your travel purpose, destination, and progress. 
                Content updates automatically based on your location and preferences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary-100 text-primary text-xs font-caption rounded-full">
                  Student Visa Holder
                </span>
                <span className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-caption rounded-full">
                  San Francisco, CA
                </span>
                <span className="px-2 py-1 bg-accent-100 text-accent text-xs font-caption rounded-full">
                  85% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <FloatingAIChatButton />
      <EmergencyAccessButton />
    </div>
  );
};

export default PersonalizedDashboard;