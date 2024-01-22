import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import EditUser from "./pages/EditUser"
import AdminUsers from './pages/Admin-User';
import AdminContact from './pages/Admin-Contact';
import { useAuth } from './store/auth';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ReplyContact from './pages/ReplyContact';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth()
  const allowedRoute = ['/', '/login', '/register', '/forgotPassword']

  if (!isLoggedIn && !allowedRoute.includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  const showNavbar = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/forgotPassword')

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContact />} />
          <Route path="users/:id/edit" element={<EditUser />} />
          <Route path="contacts/:id/reply" element={<ReplyContact />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
