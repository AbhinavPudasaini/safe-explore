import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalInformationCard = ({ medicalInfo, onEdit, isEmergencyMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  const handleShareMedicalInfo = () => {
    const medicalData = `MEDICAL EMERGENCY INFORMATION:\n\nName: ${medicalInfo.fullName}\nBlood Type: ${medicalInfo.bloodType}\nAllergies: ${medicalInfo.allergies.join(', ')}\nMedications: ${medicalInfo.medications.join(', ')}\nConditions: ${medicalInfo.conditions.join(', ')}\nEmergency Contact: ${medicalInfo.emergencyContact}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Medical Emergency Information',
        text: medicalData
      });
    } else {
      navigator.clipboard.writeText(medicalData);
      // Show toast notification in real app
      alert('Medical information copied to clipboard');
    }
  };

  return (
    <div className={`bg-surface border-2 rounded-xl shadow-medium transition-smooth ${
      isEmergencyMode ? 'border-error bg-error-50' : 'border-border hover:border-primary-200'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isEmergencyMode ? 'bg-error text-white' : 'bg-error-50'
            }`}>
              <Icon 
                name="Heart" 
                size={24} 
                color={isEmergencyMode ? 'white' : 'var(--color-error)'} 
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Medical Information
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Critical health data for first responders
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              onClick={handleShareMedicalInfo}
              className="min-touch-target"
            >
              Share
            </Button>
            
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
        </div>

        {/* Critical Information Always Visible */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-surface-100 rounded-lg">
              <Icon name="Droplet" size={16} color="var(--color-error)" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Blood Type</span>
                <p className="font-mono font-semibold text-text-primary">
                  {medicalInfo.bloodType}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-surface-100 rounded-lg">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Critical Allergies</span>
                <p className="font-body text-sm text-text-primary">
                  {medicalInfo.allergies.length > 0 ? medicalInfo.allergies.slice(0, 2).join(', ') : 'None'}
                  {medicalInfo.allergies.length > 2 && '...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Full Name */}
            <div className="flex items-center space-x-3">
              <Icon name="User" size={16} color="var(--color-text-secondary)" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Full Name</span>
                <p className="font-body text-sm text-text-primary">
                  {medicalInfo.fullName}
                </p>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Date of Birth</span>
                <p className="font-body text-sm text-text-primary">
                  {medicalInfo.dateOfBirth}
                </p>
              </div>
            </div>

            {/* All Allergies */}
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div>
                <span className="text-xs font-caption text-text-secondary">All Allergies</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {medicalInfo.allergies.map((allergy, index) => (
                    <span 
                      key={index}
                      className="bg-warning-50 text-warning px-2 py-1 rounded-full text-xs font-caption"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div className="flex items-start space-x-3">
              <Icon name="Pill" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Current Medications</span>
                <div className="space-y-1 mt-1">
                  {medicalInfo.medications.map((medication, index) => (
                    <p key={index} className="text-sm text-text-primary font-body">
                      {medication}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="flex items-start space-x-3">
              <Icon name="FileText" size={16} color="var(--color-text-secondary)" className="mt-0.5" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Medical Conditions</span>
                <div className="space-y-1 mt-1">
                  {medicalInfo.conditions.map((condition, index) => (
                    <p key={index} className="text-sm text-text-primary font-body">
                      {condition}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} color="var(--color-accent)" />
              <div>
                <span className="text-xs font-caption text-text-secondary">Medical Emergency Contact</span>
                <p className="font-mono text-sm text-text-primary">
                  {medicalInfo.emergencyContact}
                </p>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="bg-surface-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-body font-semibold text-text-primary">Insurance Information</h4>
                <button
                  onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                  className="flex items-center space-x-1 text-xs text-primary hover:text-primary-600 transition-smooth"
                >
                  <Icon name={showSensitiveInfo ? "EyeOff" : "Eye"} size={12} />
                  <span>{showSensitiveInfo ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              
              {showSensitiveInfo && (
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-caption text-text-secondary">Provider</span>
                    <p className="text-sm text-text-primary font-body">
                      {medicalInfo.insurance.provider}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-caption text-text-secondary">Policy Number</span>
                    <p className="font-mono text-sm text-text-primary">
                      {medicalInfo.insurance.policyNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-caption text-text-secondary">Group Number</span>
                    <p className="font-mono text-sm text-text-primary">
                      {medicalInfo.insurance.groupNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} color="var(--color-accent)" />
                <span className="text-xs text-text-secondary font-caption">
                  Information encrypted and secure
                </span>
              </div>
              
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(medicalInfo)}
                >
                  Edit Medical Info
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalInformationCard;