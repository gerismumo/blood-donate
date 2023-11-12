import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Donor from './pages/Donor';
import Home from './pages/Home';
import Login from './pages/Login';
import Receiver from './pages/Receiver';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donorsPage' element={<Donor />} />
        <Route path='/adminPage' element={<AdminPage />} />
        <Route path='/receiversPage' element={<Receiver />} />
      </Routes>
    </Router>
  );
}

export default App;
