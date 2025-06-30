import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import page-specific components
import DocumentCategoryCard from './components/DocumentCategoryCard';
import DocumentRequirementCard from './components/DocumentRequirementCard';
import FilterSortControls from './components/FilterSortControls';
import ProgressOverview from './components/ProgressOverview';
import SmartSuggestions from './components/SmartSuggestions';

const DocumentRequirementsTracker = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview'); // overview, categories, documents
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    category: null,
    priority: null
  });
  const [sortBy, setSortBy] = useState('due-date');

  // Mock data for document categories
  const documentCategories = [
    {
      id: 'identity',
      name: 'Identity Documents',
      type: 'identity',
      description: 'Passport, national ID, birth certificate, and other identity verification documents',
      totalCount: 5,
      completedCount: 3,
      progressPercentage: 60
    },
    {
      id: 'visa',
      name: 'Visa & Immigration Papers',
      type: 'visa',
      description: 'Visa applications, immigration forms, sponsorship letters, and related documentation',
      totalCount: 8,
      completedCount: 4,
      progressPercentage: 50
    },
    {
      id: 'financial',
      name: 'Financial Records',
      type: 'financial',
      description: 'Bank statements, tax returns, proof of income, and financial support documents',
      totalCount: 6,
      completedCount: 5,
      progressPercentage: 83
    },
    {
      id: 'educational',
      name: 'Educational Certificates',
      type: 'educational',
      description: 'Diplomas, transcripts, language proficiency tests, and academic credentials',
      totalCount: 4,
      completedCount: 2,
      progressPercentage: 50
    },
    {
      id: 'health',
      name: 'Health Documentation',
      type: 'health',
      description: 'Medical records, vaccination certificates, health insurance, and medical examinations',
      totalCount: 3,
      completedCount: 1,
      progressPercentage: 33
    }
  ];

  // Mock data for individual document requirements
  const documentRequirements = [
    {
      id: 'passport',
      name: 'Valid Passport',
      description: 'Current passport with at least 6 months validity remaining',
      category: 'identity',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-03-15',
      requirements: [
        'Passport must be valid for at least 6 months from travel date',
        'Must have at least 2 blank pages for visa stamps',
        'Original document required for verification'
      ],
      uploadedDocuments: [
        { name: 'passport_scan.pdf', uploadDate: '2024-01-15' }
      ],
      notes: 'Passport renewed in January 2024, valid until 2034',
      suggestions: [
        'Consider getting additional passport pages if planning multiple trips',
        'Keep digital copies stored securely in cloud storage'
      ]
    },
    {
      id: 'visa-application',
      name: 'Student Visa Application',
      description: 'Complete visa application form with all required information',
      category: 'visa',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-28',
      requirements: [
        'Fill out DS-160 form completely and accurately',
        'Upload recent passport-style photograph',
        'Pay visa application fee',
        'Schedule visa interview appointment'
      ],
      uploadedDocuments: [],
      notes: 'Started application, need to complete sections 3-5',
      suggestions: [
        'Review form carefully before submission to avoid delays',
        'Prepare supporting documents before starting application'
      ]
    },
    {
      id: 'bank-statement',
      name: 'Bank Statements',
      description: 'Recent bank statements showing sufficient funds for study period',
      category: 'financial',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-02-20',
      requirements: [
        'Statements from last 3 months',
        'Must show minimum balance of $25,000',
        'Official bank letterhead required',
        'Statements must be in English or officially translated'
      ],
      uploadedDocuments: [
        { name: 'bank_statement_jan.pdf', uploadDate: '2024-01-20' },
        { name: 'bank_statement_feb.pdf', uploadDate: '2024-02-01' }
      ],
      notes: 'Obtained certified copies from bank',
      suggestions: []
    },
    {
      id: 'academic-transcripts',
      name: 'Official Academic Transcripts',
      description: 'Sealed official transcripts from all previously attended institutions',
      category: 'educational',
      status: 'not-started',
      priority: 'high',
      dueDate: '2024-02-25',
      requirements: [
        'Request official transcripts from registrar office',
        'Transcripts must be in sealed envelopes',
        'Include all undergraduate and graduate coursework',
        'Provide English translations if necessary'
      ],
      uploadedDocuments: [],
      notes: '',
      suggestions: [
        'Contact registrar office early as processing can take 2-3 weeks',
        'Order extra copies for multiple applications'
      ]
    },
    {
      id: 'health-insurance',
      name: 'Health Insurance Documentation',
      description: 'Proof of comprehensive health insurance coverage',
      category: 'health',
      status: 'not-started',
      priority: 'medium',
      dueDate: '2024-03-10',
      requirements: [
        'Coverage must meet university requirements',
        'Minimum coverage amount of $100,000',
        'Must include emergency medical evacuation',
        'Valid for entire study period'
      ],
      uploadedDocuments: [],
      notes: '',
      suggestions: [
        'Compare university insurance plan with private options',
        'Ensure coverage includes mental health services'
      ]
    }
  ];

  // Mock data for smart suggestions
  const smartSuggestions = [
    {
      id: 'deadline-reminder',
      type: 'deadline',
      title: 'Upcoming Deadline Alert',
      description: 'Your visa application is due in 5 days. Make sure all supporting documents are ready.',
      priority: 'high',
      actionable: true,
      actionText: 'Review Application',
      details: {
        steps: [
          'Review completed sections of visa application',
          'Gather any missing supporting documents',
          'Schedule visa interview if not already done',
          'Submit application before deadline'
        ],
        timeline: '2-3 hours to complete review and submission'
      }
    },
    {
      id: 'document-tip',
      type: 'tip',
      title: 'Document Organization Tip',
      description: 'Create digital copies of all documents and organize them in folders by category.',
      priority: 'medium',
      actionable: true,
      actionText: 'Set Up Folders',
      details: {
        tips: [
          'Use cloud storage for backup and easy access',
          'Name files clearly with document type and date',
          'Keep original documents in a secure physical location',
          'Share access with trusted family members'
        ]
      }
    },
    {
      id: 'requirement-update',
      type: 'requirement',
      title: 'New Requirement Added',
      description: 'Based on your destination country, you may need additional vaccination records.',
      priority: 'medium',
      actionable: true,
      actionText: 'Check Requirements',
      details: {
        requirements: [
          'COVID-19 vaccination certificate',
          'Yellow fever vaccination (if traveling from endemic areas)',
          'Routine vaccinations up to date'
        ],
        timeline: 'Allow 2-4 weeks for vaccination appointments'
      }
    }
  ];

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalDocuments = documentRequirements.length;
    const completedDocuments = documentRequirements.filter(doc => 
      doc.status === 'completed' || doc.status === 'verified'
    ).length;
    
    return {
      total: totalDocuments,
      completed: completedDocuments,
      percentage: Math.round((completedDocuments / totalDocuments) * 100)
    };
  };

  // Calculate category progress
  const calculateCategoryProgress = () => {
    return documentCategories.map(category => ({
      id: category.id,
      name: category.name,
      icon: category.type === 'identity' ? 'CreditCard' :
            category.type === 'visa' ? 'Passport' :
            category.type === 'financial' ? 'DollarSign' :
            category.type === 'educational' ? 'GraduationCap' : 'Heart',
      total: category.totalCount,
      completed: category.completedCount,
      percentage: category.progressPercentage
    }));
  };

  // Get upcoming deadlines
  const getUpcomingDeadlines = () => {
    return documentRequirements
      .filter(doc => doc.dueDate && doc.status !== 'completed' && doc.status !== 'verified')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)
      .map(doc => ({
        id: doc.id,
        name: doc.name,
        category: documentCategories.find(cat => cat.id === doc.category)?.name || doc.category,
        dueDate: doc.dueDate
      }));
  };

  // Filter and sort documents
  const getFilteredDocuments = () => {
    let filtered = documentRequirements;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilters.status && activeFilters.status !== 'all') {
      if (activeFilters.status === 'overdue') {
        filtered = filtered.filter(doc => {
          if (!doc.dueDate) return false;
          return new Date(doc.dueDate) < new Date() && doc.status !== 'completed' && doc.status !== 'verified';
        });
      } else {
        filtered = filtered.filter(doc => doc.status === activeFilters.status);
      }
    }

    // Apply category filter
    if (activeFilters.category) {
      filtered = filtered.filter(doc => doc.category === activeFilters.category);
    }

    // Apply priority filter
    if (activeFilters.priority) {
      filtered = filtered.filter(doc => doc.priority === activeFilters.priority);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'due-date':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'status':
          const statusOrder = { 'not-started': 0, 'in-progress': 1, 'completed': 2, 'verified': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Event handlers
  const handleCategoryClick = (categoryId) => {
    setActiveView('documents');
    setActiveFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handleToggleExpanded = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setActiveFilters({
        status: 'all',
        category: null,
        priority: null
      });
    } else if (typeof filterType === 'string' && value !== undefined) {
      setActiveFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    } else {
      // Handle single parameter case (status filter)
      setActiveFilters(prev => ({
        ...prev,
        status: filterType
      }));
    }
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleStatusUpdate = (documentId, newStatus) => {
    console.log(`Updating document ${documentId} status to ${newStatus}`);
    // In a real app, this would update the document status
  };

  const handleUploadDocument = (documentId) => {
    console.log(`Opening upload dialog for document ${documentId}`);
    // In a real app, this would open file upload dialog
  };

  const handleAddNote = (documentId, note) => {
    console.log(`Adding note to document ${documentId}: ${note}`);
    // In a real app, this would save the note
  };

  const handleAcceptSuggestion = (suggestionId) => {
    console.log(`Accepting suggestion ${suggestionId}`);
    // In a real app, this would apply the suggestion
  };

  const handleDismissSuggestion = (suggestionId) => {
    console.log(`Dismissing suggestion ${suggestionId}`);
    // In a real app, this would remove the suggestion
  };

  const handleViewAllDeadlines = () => {
    setActiveView('documents');
    setActiveFilters(prev => ({ ...prev, status: 'all' }));
    setSortBy('due-date');
  };

  const overallProgress = calculateOverallProgress();
  const categoryProgress = calculateCategoryProgress();
  const upcomingDeadlines = getUpcomingDeadlines();
  const filteredDocuments = getFilteredDocuments();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Document Requirements Tracker
              </h1>
              <p className="text-text-secondary font-body mt-1">
                Manage and track your immigration and travel documentation
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export Progress
              </Button>
              <Button
                variant="primary"
                iconName="Upload"
                iconPosition="left"
              >
                Upload Documents
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-surface-100 rounded-lg p-1 w-fit">
            <Button
              variant={activeView === 'overview' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('overview')}
            >
              Overview
            </Button>
            <Button
              variant={activeView === 'categories' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('categories')}
            >
              Categories
            </Button>
            <Button
              variant={activeView === 'documents' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('documents')}
            >
              All Documents
            </Button>
          </div>
        </div>

        {/* Overview View */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Overview */}
            <div className="lg:col-span-2">
              <ProgressOverview
                overallProgress={overallProgress}
                categoryProgress={categoryProgress}
                upcomingDeadlines={upcomingDeadlines}
                onViewAllDeadlines={handleViewAllDeadlines}
              />
            </div>

            {/* Smart Suggestions */}
            <div>
              <SmartSuggestions
                suggestions={smartSuggestions}
                onAcceptSuggestion={handleAcceptSuggestion}
                onDismissSuggestion={handleDismissSuggestion}
              />
            </div>
          </div>
        )}

        {/* Categories View */}
        {activeView === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentCategories.map((category) => (
                <DocumentCategoryCard
                  key={category.id}
                  category={category}
                  onCategoryClick={handleCategoryClick}
                  isExpanded={expandedCategories[category.id]}
                  onToggleExpanded={handleToggleExpanded}
                />
              ))}
            </div>
          </div>
        )}

        {/* Documents View */}
        {activeView === 'documents' && (
          <div className="space-y-6">
            {/* Filter and Sort Controls */}
            <FilterSortControls
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onSearchChange={handleSearchChange}
              activeFilters={activeFilters}
              searchQuery={searchQuery}
            />

            {/* Documents List */}
            <div className="space-y-4">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((requirement) => (
                  <DocumentRequirementCard
                    key={requirement.id}
                    requirement={requirement}
                    onStatusUpdate={handleStatusUpdate}
                    onUploadDocument={handleUploadDocument}
                    onAddNote={handleAddNote}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon 
                    name="FileText" 
                    size={64} 
                    color="var(--color-text-secondary)" 
                    className="mx-auto mb-4 opacity-50"
                  />
                  <h3 className="text-lg font-body font-semibold text-text-primary mb-2">
                    No documents found
                  </h3>
                  <p className="text-text-secondary font-caption mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilters({
                        status: 'all',
                        category: null,
                        priority: null
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Action Buttons */}
        <div className="lg:hidden fixed bottom-20 left-4 right-4 flex space-x-3">
          <Button
            variant="outline"
            iconName="Upload"
            fullWidth
          >
            Upload
          </Button>
          <Button
            variant="primary"
            iconName="MessageCircle"
            fullWidth
          >
            Get Help
          </Button>
        </div>
      </main>

      <EmergencyAccessButton />
    </div>
  );
};

export default DocumentRequirementsTracker;