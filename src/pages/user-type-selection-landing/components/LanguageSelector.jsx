import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage = 'en', onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageSelect = (language) => {
    onLanguageChange?.(language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
      >
        <span className="text-lg">{selectedLang.flag}</span>
        <span className="text-sm font-body text-text-primary hidden sm:block">
          {selectedLang.name}
        </span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          color="var(--color-text-secondary)"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface-100 transition-smooth first:rounded-t-lg last:rounded-b-lg ${
                  selectedLanguage === language.code ? 'bg-primary-50 text-primary' : 'text-text-primary'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-body">{language.name}</span>
                {selectedLanguage === language.code && (
                  <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;