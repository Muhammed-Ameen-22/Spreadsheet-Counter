import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp'
function App() {
  return (
    <>
      <Router>
        <Routes>
      

          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>
          </Routes>
  </Router>
  </>
  );
}

export default App;
