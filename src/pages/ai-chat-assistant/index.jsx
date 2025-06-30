import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import EmergencyAccessButton from '../../components/ui/EmergencyAccessButton';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import SuggestedQuestions from './components/SuggestedQuestions';
import ChatHistory from './components/ChatHistory';
import BookmarkedResponses from './components/BookmarkedResponses';
import Icon from '../../components/AppIcon';


const AIChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'history', 'bookmarks'

  // Mock data for conversations
  const mockConversations = [
    {
      id: 1,
      title: "Visa Requirements for Germany",
      lastMessage: "You'll need a student visa for stays longer than 90 days. Here are the required documents...",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12,
      isEmergency: false,
      hasBookmarks: true
    },
    {
      id: 2,
      title: "Emergency Medical Services",
      lastMessage: "In case of medical emergency, call 112. Here are the nearest hospitals...",
      lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8,
      isEmergency: true,
      hasBookmarks: false
    },
    {
      id: 3,
      title: "Cultural Etiquette in Japan",
      lastMessage: "Bowing is an important part of Japanese culture. Here\'s what you need to know...",
      lastActivity: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 15,
      isEmergency: false,
      hasBookmarks: true
    }
  ];

  // Mock data for bookmarked responses
  const mockBookmarks = [
    {
      id: 1,
      title: "Student Visa Requirements",
      content: "For a student visa in Germany, you need: 1) Acceptance letter from university, 2) Proof of financial resources (€10,332 per year), 3) Health insurance, 4) Academic transcripts, 5) Language proficiency certificate...",
      category: "visa",
      createdAt: new Date(Date.now() - 86400000),
      isEmergency: false
    },
    {
      id: 2,
      title: "Emergency Numbers Germany",
      content: "Emergency services in Germany: Police: 110, Fire/Medical: 112, Poison Control: 030-19240, Crisis Hotline: 0800-111-0-111. These numbers are free and available 24/7.",
      category: "emergency",
      createdAt: new Date(Date.now() - 172800000),
      isEmergency: true
    },
    {
      id: 3,
      title: "Japanese Business Card Etiquette",
      content: "When receiving a business card in Japan: 1) Use both hands, 2) Read it carefully, 3) Place it on the table during meetings, 4) Never write on it, 5) Store it respectfully in a card holder.",
      category: "culture",
      createdAt: new Date(Date.now() - 259200000),
      isEmergency: false
    }
  ];

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      sender: 'ai',
      content: `Hello! I'm your AI travel and immigration assistant. I'm here to help you navigate new countries with confidence.\n\nI can assist you with:\n• Visa and immigration requirements\n• Safety information and alerts\n• Cultural etiquette and customs\n• Emergency contacts and procedures\n• Document requirements\n• Local services and resources\n\nHow can I help you today?`,
      timestamp: new Date(),
      type: 'welcome',
      richContent: {
        quickActions: [
          { id: 'visa', label: 'Visa Requirements', action: 'visa_help' },
          { id: 'safety', label: 'Safety Information', action: 'safety_help' },
          { id: 'culture', label: 'Cultural Guide', action: 'culture_help' },
          { id: 'emergency', label: 'Emergency Help', action: 'emergency_help' }
        ]
      }
    };

    setMessages([welcomeMessage]);
    updateSuggestedQuestions('welcome');
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateSuggestedQuestions = (context) => {
    const questionSets = {
      welcome: [
        "What documents do I need for a student visa?",
        "How do I find emergency services in my area?",
        "What are important cultural customs to know?",
        "How do I register with local authorities?"
      ],
      visa: [
        "How long does visa processing take?",
        "What if my visa application is rejected?",
        "Can I work with a student visa?",
        "How do I extend my visa?"
      ],
      safety: [
        "What areas should I avoid?",
        "How do I report a crime?",
        "What should I do if I lose my passport?",
        "Emergency contact numbers"
      ],
      culture: [
        "What are common social customs?",
        "How do I greet people properly?",
        "What should I wear in different situations?",
        "How do tipping customs work?"
      ],
      emergency: [
        "Nearest hospital location",
        "How to call emergency services",
        "Embassy contact information",
        "What to do in natural disasters"
      ]
    };

    setSuggestedQuestions(questionSets[context] || questionSets.welcome);
  };

  const handleSendMessage = (messageText) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Update suggested questions based on response context
      if (messageText.toLowerCase().includes('visa')) {
        updateSuggestedQuestions('visa');
      } else if (messageText.toLowerCase().includes('emergency') || messageText.toLowerCase().includes('help')) {
        updateSuggestedQuestions('emergency');
      } else if (messageText.toLowerCase().includes('culture') || messageText.toLowerCase().includes('custom')) {
        updateSuggestedQuestions('culture');
      } else if (messageText.toLowerCase().includes('safety') || messageText.toLowerCase().includes('safe')) {
        updateSuggestedQuestions('safety');
      }
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      visa: {
        content: `For visa requirements, I'll need to know your specific situation. Here's general information:\n\n**Student Visa Requirements:**\n• Acceptance letter from educational institution\n• Proof of financial resources\n• Health insurance coverage\n• Academic transcripts and certificates\n• Language proficiency test results\n• Passport valid for at least 6 months\n\n**Processing Time:** Typically 2-8 weeks depending on country and visa type.\n\nWould you like specific information for a particular country?`,
        richContent: {
          quickActions: [
            { id: 'germany', label: 'Germany Requirements', action: 'germany_visa' },
            { id: 'usa', label: 'USA Requirements', action: 'usa_visa' },
            { id: 'uk', label: 'UK Requirements', action: 'uk_visa' },
            { id: 'canada', label: 'Canada Requirements', action: 'canada_visa' }
          ],
          links: [
            { title: 'Official Visa Information Portal', url: '#' },
            { title: 'Document Checklist Template', url: '#' }
          ]
        }
      },
      emergency: {
        content: `**Emergency Information:**\n\n**Universal Emergency Numbers:**\n• Police: Varies by country (911, 112, 999, 110)\n• Medical Emergency: Usually same as police\n• Fire Services: Usually same as police\n\n**Important Steps:**\n1. Stay calm and assess the situation\n2. Call emergency services immediately\n3. Provide clear location information\n4. Contact your embassy if needed\n5. Notify family/friends\n\n**Always keep these handy:**\n• Embassy contact information\n• Insurance policy details\n• Emergency contact numbers\n• Copy of important documents`,
        type: 'emergency',
        richContent: {
          quickActions: [
            { id: 'embassy', label: 'Find Embassy', action: 'find_embassy' },
            { id: 'hospital', label: 'Nearest Hospital', action: 'find_hospital' },
            { id: 'police', label: 'Police Station', action: 'find_police' }
          ]
        }
      },
      culture: {
        content: `**Cultural Etiquette Guide:**\n\n**General Tips:**\n• Research local customs before arrival\n• Observe and follow local behavior patterns\n• Ask locals when unsure about customs\n• Be respectful of religious and cultural practices\n• Learn basic greetings in local language\n\n**Common Areas to Consider:**\n• Greeting customs (handshakes, bows, kisses)\n• Dining etiquette and table manners\n• Dress codes for different occasions\n• Gift-giving traditions\n• Business meeting protocols\n• Religious site behavior\n\nWhich specific cultural aspect would you like to learn about?`,
        richContent: {
          quickActions: [
            { id: 'greetings', label: 'Greeting Customs', action: 'greeting_customs' },
            { id: 'dining', label: 'Dining Etiquette', action: 'dining_etiquette' },
            { id: 'business', label: 'Business Culture', action: 'business_culture' }
          ]
        }
      },
      safety: {
        content: `**Safety Information:**\n\n**General Safety Tips:**\n• Research your destination thoroughly\n• Register with your embassy upon arrival\n• Keep copies of important documents\n• Share your itinerary with family/friends\n• Stay aware of local news and alerts\n• Trust your instincts\n\n**Common Safety Concerns:**\n• Petty theft and pickpocketing\n• Scams targeting tourists/foreigners\n• Transportation safety\n• Natural disasters and weather\n• Political situations\n\n**Safety Resources:**\n• Local police and emergency services\n• Tourist police (where available)\n• Embassy safety alerts\n• Travel advisory websites`,
        richContent: {
          quickActions: [
            { id: 'alerts', label: 'Safety Alerts', action: 'safety_alerts' },
            { id: 'scams', label: 'Common Scams', action: 'common_scams' },
            { id: 'transport', label: 'Transport Safety', action: 'transport_safety' }
          ]
        }
      }
    };

    // Determine response type based on user message
    let responseType = 'general';
    const message = userMessage.toLowerCase();
    
    if (message.includes('visa') || message.includes('document')) responseType = 'visa';
    else if (message.includes('emergency') || message.includes('help') || message.includes('urgent')) responseType = 'emergency';
    else if (message.includes('culture') || message.includes('custom') || message.includes('etiquette')) responseType = 'culture';
    else if (message.includes('safety') || message.includes('safe') || message.includes('danger')) responseType = 'safety';

    const response = responses[responseType] || {
      content: `I understand you're asking about "${userMessage}". Let me help you with that.\n\nBased on your question, I can provide information about:\n• Visa and immigration procedures\n• Safety guidelines and emergency contacts\n• Cultural customs and etiquette\n• Document requirements and processes\n• Local services and resources\n\nCould you please be more specific about what aspect you'd like to know more about?`,
      richContent: {
        quickActions: [
          { id: 'visa', label: 'Visa Help', action: 'visa_help' },
          { id: 'safety', label: 'Safety Info', action: 'safety_help' },
          { id: 'culture', label: 'Cultural Guide', action: 'culture_help' }
        ]
      }
    };

    return {
      id: messages.length + 2,
      sender: 'ai',
      content: response.content,
      timestamp: new Date(),
      type: response.type || (isEmergencyMode ? 'emergency' : 'normal'),
      richContent: response.richContent
    };
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      visa_help: "What specific visa requirements do you need help with?",
      safety_help: "What safety information are you looking for?",
      culture_help: "Which cultural aspects would you like to learn about?",
      emergency_help: "What emergency information do you need?",
      germany_visa: "Tell me about student visa requirements for Germany",
      usa_visa: "What are the visa requirements for studying in the USA?",
      find_embassy: "Help me find my embassy contact information",
      find_hospital: "Where is the nearest hospital?",
      greeting_customs: "How should I greet people in this culture?",
      dining_etiquette: "What are the dining customs I should know?",
      safety_alerts: "Are there any current safety alerts I should know about?"
    };

    const message = actionMessages[action.action] || actionMessages[action.id] || action.label;
    handleSendMessage(message);
  };

  const handleQuestionSelect = (question) => {
    handleSendMessage(question);
  };

  const handleVoiceInput = (voiceText) => {
    if (voiceText && voiceText !== 'voice recording started' && voiceText !== 'voice recording stopped') {
      handleSendMessage(voiceText);
    }
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: `I've uploaded a document: ${file.name}`,
      timestamp: new Date(),
      richContent: {
        document: {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024).toFixed(1)} KB`
        }
      }
    };

    setMessages(prev => [...prev, fileMessage]);
    
    // Simulate AI response for document
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: `I can see you've uploaded "${file.name}". I can help you with:\n\n• Document verification requirements\n• Translation needs\n• Apostille/legalization processes\n• Submission procedures\n• Format requirements\n\nWhat specific help do you need with this document?`,
        timestamp: new Date(),
        richContent: {
          quickActions: [
            { id: 'verify', label: 'Verify Document', action: 'verify_document' },
            { id: 'translate', label: 'Translation Help', action: 'translation_help' },
            { id: 'apostille', label: 'Apostille Info', action: 'apostille_info' }
          ]
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleEmergencyToggle = (emergency) => {
    setIsEmergencyMode(emergency);
    if (emergency) {
      updateSuggestedQuestions('emergency');
    } else {
      updateSuggestedQuestions('welcome');
    }
  };

  const handleConversationSelect = (conversationId) => {
    // In a real app, this would load the conversation
    console.log('Loading conversation:', conversationId);
  };

  const handleBookmarkSelect = (bookmark) => {
    // Add bookmarked response to current chat
    const bookmarkMessage = {
      id: messages.length + 1,
      sender: 'ai',
      content: bookmark.content,
      timestamp: new Date(),
      type: bookmark.isEmergency ? 'emergency' : 'normal'
    };
    setMessages(prev => [...prev, bookmarkMessage]);
  };

  const handleBookmarkRemove = (bookmarkId) => {
    // Remove bookmark logic would go here
    console.log('Removing bookmark:', bookmarkId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-9rem)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-80 border-r border-border bg-surface-50">
          <div className="w-full flex flex-col">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-4 py-3 text-sm font-body transition-smooth ${
                  activeTab === 'history' ?'text-primary border-b-2 border-primary bg-surface' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex-1 px-4 py-3 text-sm font-body transition-smooth ${
                  activeTab === 'bookmarks' ?'text-primary border-b-2 border-primary bg-surface' :'text-text-secondary hover:text-primary hover:bg-surface-100'
                }`}
              >
                Bookmarks
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'history' && (
                <ChatHistory
                  conversations={mockConversations}
                  onConversationSelect={handleConversationSelect}
                  currentConversationId={1}
                  className="h-full"
                />
              )}
              {activeTab === 'bookmarks' && (
                <BookmarkedResponses
                  bookmarks={mockBookmarks}
                  onBookmarkSelect={handleBookmarkSelect}
                  onBookmarkRemove={handleBookmarkRemove}
                  className="h-full"
                />
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatHeader
            onEmergencyToggle={handleEmergencyToggle}
            isEmergencyMode={isEmergencyMode}
          />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onQuickAction={handleQuickAction}
                onLinkClick={(link) => console.log('Link clicked:', link)}
              />
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3 max-w-[85%] sm:max-w-[75%]">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isEmergencyMode ? 'bg-error' : 'bg-primary'
                    }`}>
                      <Icon name="Bot" size={16} color="white" />
                    </div>
                  </div>
                  <div className="bg-surface border border-border rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {suggestedQuestions.length > 0 && (
            <SuggestedQuestions
              questions={suggestedQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          )}

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            onFileUpload={handleFileUpload}
            disabled={isTyping}
          />
        </div>
      </div>

      <EmergencyAccessButton />
    </div>
  );
};

export default AIChatAssistant;