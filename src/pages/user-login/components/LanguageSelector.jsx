import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsDropdownOpen(false);
    // In a real app, this would trigger language change
    console.log('Language changed to:', languageCode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-surface-100 transition-smooth min-touch-target"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-body text-text-primary hidden sm:block">
          {currentLanguage.name}
        </span>
        <Icon 
          name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          color="var(--color-text-secondary)" 
        />
      </button>

      {/* Language Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-heavy z-50 animate-slide-down">
          <div className="p-2 max-h-80 overflow-y-auto">
            {/* Header */}
            <div className="px-3 py-2 border-b border-border mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} color="var(--color-primary)" />
                <span className="text-sm font-body text-text-primary font-semibold">
                  Select Language
                </span>
              </div>
            </div>

            {/* Language Options */}
            <div className="space-y-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-smooth min-touch-target
                    ${selectedLanguage === language.code 
                      ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-surface-100 text-text-primary'
                    }
                  `}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body">{language.name}</span>
                      {selectedLanguage === language.code && (
                        <Icon name="Check" size={16} color="var(--color-primary)" />
                      )}
                    </div>
                    <span className="text-xs font-caption text-text-secondary">
                      {language.nativeName}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-t border-border mt-2">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={14} color="var(--color-text-secondary)" />
                <span className="text-xs font-caption text-text-secondary">
                  More languages coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LanguageSelector;