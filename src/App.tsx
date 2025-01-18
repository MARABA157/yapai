import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Loading from './components/Loading';
import ErrorBoundary from './components/common/ErrorBoundary';
import RotatingBackground from './components/RotatingBackground';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import BackgroundSlider from './components/BackgroundSlider'; // Added import statement

// Lazy imports
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Explore = React.lazy(() => import('./pages/Explore'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Create = React.lazy(() => import('./pages/Create'));
const Messages = React.lazy(() => import('./pages/Messages'));
const AiChat = React.lazy(() => import('./pages/AiChat'));
const CreateVideo = React.lazy(() => import('./pages/CreateVideo'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 relative">
          <BackgroundSlider /> 
          <div className="relative z-10">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Router>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
                    <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
                    <Route path="/aichat" element={<AiChat />} />
                    <Route path="/create-video" element={<CreateVideo />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Suspense>
              </Router>
            </main>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;