import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { attachPublicEnvForDevtools } from './config/publicEnv';
import { RequireAuth } from './components/RequireAuth';
import { Dashboard } from './components/Dashboard';
import { DashboardDataProvider } from './context/DashboardDataProvider';
import { FirebaseAuthProvider } from './context/FirebaseAuthProvider';
import { FirebaseDataModeProvider } from './context/FirebaseDataModeProvider';
import { AppLayout } from './layout/AppLayout';
import { CouponCodesPage } from './pages/CouponCodesPage';
import { LoginPage } from './pages/LoginPage';
import { NgosPage } from './pages/NgosPage';
import { WaitlistPage } from './pages/WaitlistPage';

attachPublicEnvForDevtools();

function App() {
  return (
    <FirebaseDataModeProvider>
      <FirebaseAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<AppLayout />}>
                <Route
                  index
                  element={
                    <DashboardDataProvider>
                      <Dashboard />
                    </DashboardDataProvider>
                  }
                />
                <Route path="ngos" element={<NgosPage />} />
                <Route path="coupon-codes" element={<CouponCodesPage />} />
                <Route path="waitlist" element={<WaitlistPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FirebaseAuthProvider>
    </FirebaseDataModeProvider>
  );
}

export default App;
