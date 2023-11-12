import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/viewPage' element={<Dashboard />} />
        <Route path='/adminPage' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
