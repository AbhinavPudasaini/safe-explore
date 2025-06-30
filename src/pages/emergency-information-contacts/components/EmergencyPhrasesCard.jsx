import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyPhrasesCard = ({ currentLanguage = 'Spanish', onLanguageChange, speechSynthesis }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyPhrases = {
    Spanish: [
    { english: "Help me!", translation: "¡Ayúdame!", pronunciation: "ah-YOO-dah-meh" },
    { english: "I need a doctor", translation: "Necesito un médico", pronunciation: "neh-seh-SEE-toh oon MEH-dee-koh" },
    { english: "Call the police", translation: "Llama a la policía", pronunciation: "YAH-mah ah lah poh-lee-SEE-ah" },
    { english: "I\'m lost", translation: "Estoy perdido/a", pronunciation: "ehs-TOY pehr-DEE-doh/dah" },
    { english: "Where is the hospital?", translation: "¿Dónde está el hospital?", pronunciation: "DOHN-deh ehs-TAH ehl ohs-pee-TAHL" },
    { english: "I don't speak Spanish", translation: "No hablo español", pronunciation: "noh AH-bloh ehs-pah-NYOHL" },
    { english: "Emergency!", translation: "¡Emergencia!", pronunciation: "eh-mehr-HEHN-see-ah" },
    { english: "I need help", translation: "Necesito ayuda", pronunciation: "neh-seh-SEE-toh ah-YOO-dah" }],

    French: [
    { english: "Help me!", translation: "Aidez-moi!", pronunciation: "eh-day MWAH" },
    { english: "I need a doctor", translation: "J\'ai besoin d\'un médecin", pronunciation: "zhay buh-ZWAN duhn may-SAHN" },
    { english: "Call the police", translation: "Appelez la police", pronunciation: "ah-play lah poh-LEES" },
    { english: "I\'m lost", translation: "Je suis perdu(e)", pronunciation: "zhuh swee pehr-DOO" },
    { english: "Where is the hospital?", translation: "Où est l\'hôpital?", pronunciation: "oo eh loh-pee-TAHL" },
    { english: "I don't speak French", translation: "Je ne parle pas français", pronunciation: "zhuh nuh pahrl pah frahn-SEH" },
    { english: "Emergency!", translation: "Urgence!", pronunciation: "oor-ZHAHNSS" },
    { english: "I need help", translation: "J\'ai besoin d\'aide", pronunciation: "zhay buh-ZWAN dehd" }],

    German: [
    { english: "Help me!", translation: "Hilfe!", pronunciation: "HIL-feh" },
    { english: "I need a doctor", translation: "Ich brauche einen Arzt", pronunciation: "ikh BROW-kheh EYE-nen ahrst" },
    { english: "Call the police", translation: "Rufen Sie die Polizei", pronunciation: "ROO-fen zee dee poh-li-TSYE" },
    { english: "I\'m lost", translation: "Ich habe mich verlaufen", pronunciation: "ikh HAH-beh mikh fehr-LOW-fen" },
    { english: "Where is the hospital?", translation: "Wo ist das Krankenhaus?", pronunciation: "voh ist dahs KRAHN-ken-hows" },
    { english: "I don't speak German", translation: "Ich spreche kein Deutsch", pronunciation: "ikh SHPREH-kheh kyne doytsh" },
    { english: "Emergency!", translation: "Notfall!", pronunciation: "NOHT-fahl" },
    { english: "I need help", translation: "Ich brauche Hilfe", pronunciation: "ikh BROW-kheh HIL-feh" }]

  };

  const availableLanguages = Object.keys(emergencyPhrases);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  const handlePlayAudio = (phrase) => {
    // In a real app, this would use text-to-speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.translation);
      utterance.lang = selectedLanguage === 'Spanish' ? 'es-ES' : selectedLanguage === 'French' ? 'fr-FR' : 'de-DE';
      speechSynthesis.speak(utterance);
    }
  };

  const handleCopyPhrase = (phrase) => {
    navigator.clipboard.writeText(`${phrase.english} = ${phrase.translation}`);
    // Show toast notification in real app
  };

  return (
    <div className="bg-surface border border-border rounded-xl shadow-medium">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center">
              <Icon name="Languages" size={24} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Emergency Phrases
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Essential phrases for local communication
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-surface-100 rounded-lg transition-smooth min-touch-target">

            <Icon
              name={isExpanded ? "ChevronUp" : "ChevronDown"}
              size={16}
              color="var(--color-text-secondary)" />

          </button>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="block text-sm font-caption text-text-secondary mb-2">
            Select Language:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map((language) =>
            <button
              key={language}
              onClick={() => handleLanguageChange(language)}
              className={`px-3 py-2 rounded-lg text-sm font-body transition-smooth min-touch-target ${
              selectedLanguage === language ?
              'bg-accent text-accent-foreground' :
              'bg-surface-100 text-text-secondary hover:bg-surface-200'}`
              }>

                {language}
              </button>
            )}
          </div>
        </div>

        {/* Critical Phrases Always Visible */}
        <div className="space-y-3 mb-4">
          {emergencyPhrases[selectedLanguage].slice(0, 3).map((phrase, index) =>
          <div key={index} className="bg-surface-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-body font-semibold text-text-primary">
                  {phrase.english}
                </p>
                <div className="flex space-x-1">
                  <Button
                  variant="ghost"
                  size="xs"
                  iconName="Volume2"
                  onClick={() => handlePlayAudio(phrase)}
                  className="min-touch-target" />

                  <Button
                  variant="ghost"
                  size="xs"
                  iconName="Copy"
                  onClick={() => handleCopyPhrase(phrase)}
                  className="min-touch-target" />

                </div>
              </div>
              <p className="text-lg font-semibold text-accent mb-1">
                {phrase.translation}
              </p>
              <p className="text-sm text-text-secondary font-caption italic">
                {phrase.pronunciation}
              </p>
            </div>
          )}
        </div>

        {isExpanded &&
        <div className="space-y-3 pt-4 border-t border-border">
            {emergencyPhrases[selectedLanguage].slice(3).map((phrase, index) =>
          <div key={index + 3} className="bg-surface-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body font-semibold text-text-primary">
                    {phrase.english}
                  </p>
                  <div className="flex space-x-1">
                    <Button
                  variant="ghost"
                  size="xs"
                  iconName="Volume2"
                  onClick={() => handlePlayAudio(phrase)}
                  className="min-touch-target" />

                    <Button
                  variant="ghost"
                  size="xs"
                  iconName="Copy"
                  onClick={() => handleCopyPhrase(phrase)}
                  className="min-touch-target" />

                  </div>
                </div>
                <p className="text-lg font-semibold text-accent mb-1">
                  {phrase.translation}
                </p>
                <p className="text-sm text-text-secondary font-caption italic">
                  {phrase.pronunciation}
                </p>
              </div>
          )}

            {/* Additional Features */}
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <h4 className="font-body font-semibold text-text-primary mb-1">
                    Communication Tips
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Speak slowly and clearly</li>
                    <li>• Use gestures to support your words</li>
                    <li>• Show this screen to locals if needed</li>
                    <li>• Keep important phrases saved offline</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

};

export default EmergencyPhrasesCard;