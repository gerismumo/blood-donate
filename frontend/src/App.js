import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Donor from './pages/Donor';
import Home from './pages/Home';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Receiver from './pages/Receiver';
import ReceiverQuiz from './pages/ReceiverQuiz';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donorsPage' element={<Donor />} />
        <Route path='/usersPage' element={<AdminPage />} />
        <Route path='/receiversPage' element={<Receiver />} />
        <Route path='/questionsPage' element={<Questions />} />
        <Route path='/receiverQuestions' element={<ReceiverQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
