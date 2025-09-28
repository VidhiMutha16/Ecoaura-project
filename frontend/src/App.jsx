import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- THIS LINE IS THE FIX
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages & Components
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import EventsPage from './pages/EventsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DmaicPage from './pages/DmaicPage';
import EventDetailPage from './pages/EventDetailPage';
import LearningResources from './pages/LearningResources';
import SmartRedirect from './components/SmartRedirect';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Parent Route for pages that use the dashboard layout */}
        <Route element={<DashboardLayout />}>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>

          {/* Organizer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Organizer']} />}>
            <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
            <Route path="/dashboard/events" element={<EventsPage />} />
            <Route path="/dashboard/event/:eventId" element={<EventDetailPage />} />
            <Route path="/dashboard/learning" element={<LearningResources />} />
            <Route path="/dashboard/analytics/:eventId" element={<AnalyticsPage />} />
            <Route path="/dashboard/dmaic/:eventId" element={<DmaicPage />} />
            <Route path="/dashboard/analytics" element={<SmartRedirect targetPage="analytics" />} />
            <Route path="/dashboard/dmaic" element={<SmartRedirect targetPage="dmaic" />} />
          </Route>

          {/* Vendor Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Vendor']} />}>
            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
          </Route>

          {/* Volunteer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Volunteer']} />}>
            <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
          </Route>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;