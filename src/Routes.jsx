import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserLogin from "pages/user-login";
import LocalServicesFinder from "pages/local-services-finder";
import EmergencyInformationContacts from "pages/emergency-information-contacts";
import PersonalizedDashboard from "pages/personalized-dashboard";
import AiChatAssistant from "pages/ai-chat-assistant";
import DocumentRequirementsTracker from "pages/document-requirements-tracker";
import UserTypeSelectionLanding from "pages/user-type-selection-landing";
import CountryLocationSelector from "pages/country-location-selector";
import LocalLawsRegulationsGuide from "pages/local-laws-regulations-guide";
import TouristExploreHub from "pages/tourist-explore-hub";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserTypeSelectionLanding />} />
        <Route path="/user-type-selection-landing" element={<UserTypeSelectionLanding />} />
        <Route path="/country-location-selector" element={<CountryLocationSelector />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/local-services-finder" element={<LocalServicesFinder />} />
        <Route path="/emergency-information-contacts" element={<EmergencyInformationContacts />} />
        <Route path="/personalized-dashboard" element={<PersonalizedDashboard />} />
        <Route path="/ai-chat-assistant" element={<AiChatAssistant />} />
        <Route path="/document-requirements-tracker" element={<DocumentRequirementsTracker />} />
        <Route path="/local-laws-regulations-guide" element={<LocalLawsRegulationsGuide />} />
        <Route path="/tourist-explore-hub" element={<TouristExploreHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;