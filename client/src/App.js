import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/Signup'
import Navbar from './components/Navbar'
import Subscriptions from './components/Subscriptions';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <Router>
        <Routes>
      

          <Route path='/' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path='/subscriptions' element={<Subscriptions/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
  </Router>
  </>
  );
}

export default App;
