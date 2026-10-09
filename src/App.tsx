import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AdvisoryWorkflowProvider } from './context/AdvisoryWorkflowContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Screens
import { WelcomeScreen } from './pages/WelcomeScreen';
import { FarmerInfoScreen } from './pages/FarmerInfoScreen';
import { FarmSoilScreen } from './pages/FarmSoilScreen';
import { CropSelectScreen } from './pages/CropSelectScreen';
import { CropSuitabilityScreen } from './pages/CropSuitabilityScreen';
import { WeatherScreen } from './pages/WeatherScreen';
import { IrrigationScreen } from './pages/IrrigationScreen';
import { LeafUploadScreen } from './pages/LeafUploadScreen';
import { DiseaseResultScreen } from './pages/DiseaseResultScreen';
import { PersonalizedAdvisoryScreen } from './pages/PersonalizedAdvisoryScreen';
import { HistoryScreen } from './pages/HistoryScreen';
import { DashboardScreen } from './pages/DashboardScreen';
import { MandiScreen } from './pages/MandiScreen';
import { SchemesScreen } from './pages/SchemesScreen';
import { AdminScreen } from './pages/AdminScreen';

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdvisoryWorkflowProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-theme-page text-theme-primary font-sans antialiased selection:bg-emerald-400/30 selection:text-emerald-200 transition-colors duration-300">
              {/* Top Navigation Bar */}
              <Navbar />

              {/* Main Content Area */}
              <main className="flex-1 w-full">
                <Routes>
                  {/* Screen 1: Welcome & Language */}
                  <Route path="/" element={<WelcomeScreen />} />

                  {/* Workflow Screens (Screens 2 - 10) */}
                  <Route path="/advisory/farmer-info" element={<FarmerInfoScreen />} />
                  <Route path="/advisory/farm-soil" element={<FarmSoilScreen />} />
                  <Route path="/advisory/crop-select" element={<CropSelectScreen />} />
                  <Route path="/advisory/crop-suitability" element={<CropSuitabilityScreen />} />
                  <Route path="/advisory/weather" element={<WeatherScreen />} />
                  <Route path="/advisory/irrigation" element={<IrrigationScreen />} />
                  <Route path="/advisory/leaf-upload" element={<LeafUploadScreen />} />
                  <Route path="/advisory/disease-result" element={<DiseaseResultScreen />} />
                  <Route path="/advisory/summary" element={<PersonalizedAdvisoryScreen />} />

                  {/* Independent Farmer Modules (Screens 11 - 12 + Market, Schemes, Admin) */}
                  <Route path="/weather" element={<WeatherScreen />} />
                  <Route path="/history" element={<HistoryScreen />} />
                  <Route path="/dashboard" element={<DashboardScreen />} />
                  <Route path="/mandi" element={<MandiScreen />} />
                  <Route path="/schemes" element={<SchemesScreen />} />
                  <Route path="/admin" element={<AdminScreen />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </BrowserRouter>
        </AdvisoryWorkflowProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
