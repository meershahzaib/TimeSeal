import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCapsulePage from './pages/CreateCapsulePage';
import MyCapsulesPage from './pages/MyCapsulesPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="create-capsule" element={<CreateCapsulePage />} />
            <Route path="my-capsules" element={<MyCapsulesPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;