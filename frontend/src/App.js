import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/viewPage' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
