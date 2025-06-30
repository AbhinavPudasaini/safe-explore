import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactCard = ({ contact, onCall, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = (number) => {
    if (onCall) {
      onCall(number, contact.name);
    }
    window.location.href = `tel:${number}`;
  };

  const handleSMS = (number) => {
    const message = `Emergency: I need help. My current location is being shared. Please contact me immediately.`;
    window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;
  };

  const getRelationshipIcon = (relationship) => {
    switch (relationship.toLowerCase()) {
      case 'family':
        return 'Users';
      case 'friend':
        return 'User';
      case 'colleague':
        return 'Briefcase';
      case 'doctor':
        return 'Stethoscope';
      case 'lawyer':
        return 'Scale';
      case 'embassy':
        return 'Building';
      default:
        return 'User';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft hover:shadow-medium transition-smooth">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon 
                name={getRelationshipIcon(contact.relationship)} 
                size={20} 
                color="var(--color-primary)" 
              />
            </div>
            <div>
              <h3 className="font-body font-semibold text-text-primary">
                {contact.name}
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                {contact.relationship}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {contact.isPrimary && (
              <div className="bg-accent-50 px-2 py-1 rounded-full">
                <span className="text-xs font-caption text-accent font-semibold">Primary</span>
              </div>
            )}
            
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

        <div className="mt-4 flex items-center space-x-2">
          <Icon name="Phone" size={14} color="var(--color-text-secondary)" />
          <span className="font-mono text-sm text-text-primary">
            {contact.primaryPhone}
          </span>
          <div className="flex space-x-1 ml-auto">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              onClick={() => handleCall(contact.primaryPhone)}
              className="min-touch-target"
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              onClick={() => handleSMS(contact.primaryPhone)}
              className="min-touch-target"
            >
              SMS
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {contact.secondaryPhone && (
              <div className="flex items-center space-x-2">
                <Icon name="PhoneCall" size={14} color="var(--color-text-secondary)" />
                <span className="font-mono text-sm text-text-primary">
                  {contact.secondaryPhone}
                </span>
                <span className="text-xs text-text-secondary font-caption">
                  (Secondary)
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Phone"
                  onClick={() => handleCall(contact.secondaryPhone)}
                  className="ml-auto"
                >
                  Call
                </Button>
              </div>
            )}

            {contact.email && (
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} color="var(--color-text-secondary)" />
                <span className="text-sm text-text-primary">
                  {contact.email}
                </span>
              </div>
            )}

            {contact.address && (
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={14} color="var(--color-text-secondary)" className="mt-0.5" />
                <span className="text-sm text-text-primary">
                  {contact.address}
                </span>
              </div>
            )}

            {contact.notes && (
              <div className="flex items-start space-x-2">
                <Icon name="FileText" size={14} color="var(--color-text-secondary)" className="mt-0.5" />
                <span className="text-sm text-text-secondary">
                  {contact.notes}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                {contact.timezone && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
                    <span className="text-xs text-text-secondary font-caption">
                      {contact.timezone}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Edit"
                    onClick={() => onEdit(contact)}
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Trash2"
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;