import { Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './components/Auth/PublicRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute >
            <Home/>
          </ProtectedRoute>
        }/>
        {/* Login route */}
        <Route path="/login" element={
          <PublicRoute >
            <Login/>
          </PublicRoute>
        }/>
        {/* Signup route */}
        <Route path="/signup" element={
          <PublicRoute >
            <Signup/>
          </PublicRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
