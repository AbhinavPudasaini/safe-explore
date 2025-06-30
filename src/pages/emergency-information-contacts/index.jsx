import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import LocationContextIndicator from '../../components/ui/LocationContextIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EmergencyServiceCard from './components/EmergencyServiceCard';
import ContactCard from './components/ContactCard';
import MedicalInformationCard from './components/MedicalInformationCard';
import EmergencyPhrasesCard from './components/EmergencyPhrasesCard';
import LocationSharingCard from './components/LocationSharingCard';

const EmergencyInformationContacts = () => {
  const navigate = useNavigate();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('San Francisco, CA');
  const [activeSection, setActiveSection] = useState('services');

  // Mock emergency services data
  const emergencyServices = [
    {
      id: 1,
      name: "Police",
      type: "police",
      number: "911",
      alternateNumber: "(415) 553-0123",
      description: "Law enforcement and crime reporting",
      available24h: true,
      languages: ["English", "Spanish", "Chinese"]
    },
    {
      id: 2,
      name: "Medical Emergency",
      type: "medical",
      number: "911",
      alternateNumber: "(415) 206-8000",
      description: "Ambulance and medical emergencies",
      available24h: true,
      languages: ["English", "Spanish"]
    },
    {
      id: 3,
      name: "Fire Department",
      type: "fire",
      number: "911",
      alternateNumber: "(415) 558-3200",
      description: "Fire emergencies and rescue services",
      available24h: true,
      languages: ["English", "Spanish"]
    },
    {
      id: 4,
      name: "Poison Control",
      type: "general",
      number: "1-800-222-1222",
      description: "Poison emergencies and information",
      available24h: true,
      languages: ["English", "Spanish"]
    }
  ];

  // Mock emergency contacts data
  const emergencyContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Family",
      primaryPhone: "+1-555-0123",
      secondaryPhone: "+1-555-0124",
      email: "sarah.johnson@email.com",
      address: "456 Oak Street, Seattle, WA 98101",
      timezone: "PST",
      isPrimary: true,
      notes: "Sister - knows medical history"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      relationship: "Doctor",
      primaryPhone: "+1-555-0125",
      email: "dr.chen@healthcenter.com",
      address: "789 Medical Plaza, San Francisco, CA 94102",
      timezone: "PST",
      isPrimary: true,
      notes: "Primary care physician"
    },
    {
      id: 3,
      name: "Embassy of United States",
      relationship: "Embassy",
      primaryPhone: "+1-555-0126",
      secondaryPhone: "+1-555-0127",
      email: "emergency@usembassy.gov",
      address: "1 Embassy Row, Washington, DC 20008",
      timezone: "EST",
      isPrimary: false,
      notes: "Citizen services and emergency assistance"
    },
    {
      id: 4,
      name: "James Wilson",
      relationship: "Friend",
      primaryPhone: "+1-555-0128",
      email: "james.wilson@email.com",
      address: "321 Pine Street, San Francisco, CA 94103",
      timezone: "PST",
      isPrimary: false,
      notes: "Local emergency contact"
    }
  ];

  // Mock medical information
  const medicalInformation = {
    fullName: "Alex Rodriguez",
    dateOfBirth: "March 15, 1990",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish", "Peanuts"],
    medications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    emergencyContact: "+1-555-0123",
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001234"
    }
  };

  const sections = [
    { id: 'services', label: 'Emergency Services', icon: 'Phone' },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Users' },
    { id: 'medical', label: 'Medical Info', icon: 'Heart' },
    { id: 'phrases', label: 'Emergency Phrases', icon: 'Languages' },
    { id: 'location', label: 'Location Sharing', icon: 'MapPin' }
  ];

  const handleEmergencyModeToggle = () => {
    setIsEmergencyMode(!isEmergencyMode);
  };

  const handleServiceCall = (number, serviceName) => {
    console.log(`Calling ${serviceName} at ${number}`);
    // In a real app, this would initiate a phone call
  };

  const handleContactCall = (number, contactName) => {
    console.log(`Calling ${contactName} at ${number}`);
    // In a real app, this would initiate a phone call
  };

  const handleLocationShare = (location, contactIds) => {
    console.log('Location shared:', location, 'with contacts:', contactIds);
    // In a real app, this would send location to selected contacts
  };

  const handleAddContact = () => {
    // In a real app, this would open a contact form
    console.log('Add new emergency contact');
  };

  const handleEditContact = (contact) => {
    // In a real app, this would open an edit form
    console.log('Edit contact:', contact);
  };

  const handleDeleteContact = (contactId) => {
    // In a real app, this would delete the contact
    console.log('Delete contact:', contactId);
  };

  const handleEditMedicalInfo = (medicalInfo) => {
    // In a real app, this would open an edit form
    console.log('Edit medical info:', medicalInfo);
  };

  useEffect(() => {
    // Auto-enable emergency mode if accessed via emergency button
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('emergency') === 'true') {
      setIsEmergencyMode(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
        {/* Emergency Mode Header */}
        <div className={`mb-6 p-4 rounded-xl transition-smooth ${
          isEmergencyMode 
            ? 'bg-error-50 border-2 border-error' :'bg-surface border border-border'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isEmergencyMode ? 'bg-error text-white animate-pulse' : 'bg-primary-50'
              }`}>
                <Icon 
                  name="AlertTriangle" 
                  size={24} 
                  color={isEmergencyMode ? 'white' : 'var(--color-primary)'} 
                />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-text-primary">
                  Emergency Information & Contacts
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <LocationContextIndicator />
                  <div className={`flex items-center space-x-2 ${
                    isEmergencyMode ? 'text-error' : 'text-text-secondary'
                  }`}>
                    <Icon name="Clock" size={14} />
                    <span className="text-sm font-caption">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant={isEmergencyMode ? "danger" : "outline"}
              size="lg"
              iconName={isEmergencyMode ? "AlertTriangle" : "Shield"}
              iconPosition="left"
              onClick={handleEmergencyModeToggle}
              className="min-touch-target"
            >
              {isEmergencyMode ? 'Emergency Mode ON' : 'Activate Emergency Mode'}
            </Button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth min-touch-target ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
                }`}
              >
                <Icon 
                  name={section.icon} 
                  size={16} 
                  color={activeSection === section.id ? 'white' : 'var(--color-text-secondary)'} 
                />
                <span className="font-body text-sm">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Services Section */}
        {activeSection === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Emergency Services
              </h2>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span>{currentLocation}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergencyServices.map((service) => (
                <EmergencyServiceCard
                  key={service.id}
                  service={service}
                  onCall={handleServiceCall}
                  isEmergencyMode={isEmergencyMode}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Quick Emergency Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                  onClick={() => navigate('/ai-chat-assistant')}
                  className="min-touch-target"
                >
                  AI Emergency Guide
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={() => setActiveSection('location')}
                  className="min-touch-target"
                >
                  Share Location
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Languages"
                  iconPosition="left"
                  onClick={() => setActiveSection('phrases')}
                  className="min-touch-target"
                >
                  Emergency Phrases
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts Section */}
        {activeSection === 'contacts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Emergency Contacts
              </h2>
              <Button
                variant="primary"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddContact}
                className="min-touch-target"
              >
                Add Contact
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onCall={handleContactCall}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              ))}
            </div>
          </div>
        )}

        {/* Medical Information Section */}
        {activeSection === 'medical' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Medical Information
              </h2>
            </div>
            
            <MedicalInformationCard
              medicalInfo={medicalInformation}
              onEdit={handleEditMedicalInfo}
              isEmergencyMode={isEmergencyMode}
            />
          </div>
        )}

        {/* Emergency Phrases Section */}
        {activeSection === 'phrases' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Emergency Phrases
              </h2>
            </div>
            
            <EmergencyPhrasesCard
              currentLanguage="Spanish"
              onLanguageChange={(language) => console.log('Language changed to:', language)}
            />
          </div>
        )}

        {/* Location Sharing Section */}
        {activeSection === 'location' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Location Sharing
              </h2>
            </div>
            
            <LocationSharingCard
              onLocationShare={handleLocationShare}
              emergencyContacts={emergencyContacts}
            />
          </div>
        )}
      </main>

      <EmergencyAccessButton />
    </div>
  );
};

export default EmergencyInformationContacts;