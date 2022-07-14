import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import Subscriptions from './components/Subscriptions';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <Router>
        <Routes>
      

          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Navbar' element={<Navbar/>}/>
          <Route path='/Subscriptions' element={<Subscriptions/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          </Routes>
  </Router>
  </>
  );
}

export default App;
