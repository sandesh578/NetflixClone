import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/watch' element={<Watch />}></Route>
        <Route path='/movies' element={<Home type='movies' />}></Route>
        <Route path='/series' element={<Home type='series' />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
