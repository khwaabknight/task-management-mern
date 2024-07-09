import { Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './components/Auth/PublicRoute';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

function App() {
  // min-height: 100vh;
  // background: url("../public/images/bg-pattern.jpg") no-repeat;
  // background-size: cover;
  // background-position: center;

  return (
    <div className=''>
      <Routes>
        <Route path="/auth" element={
          <PublicRoute >
            <div>Hello</div>
            {/* <Home/> */}
          </PublicRoute>
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
