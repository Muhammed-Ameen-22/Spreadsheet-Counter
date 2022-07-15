import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout=async()=>
  {
    const res= await axios.post(process.env.REACT_APP_SERVER_URL+'/api/logout')
    return res && window.location.replace("/login");
  }
  
  return (
    <>
      <nav className='navbar'>
          <ul className= 'nav-menu active'>
            <li className='nav-item'>
              <Link 
              to='/Subscriptions' 
              className='nav-links' 
              >
                Subscriptions
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Dashboard'
                className='nav-links'
              >
                Dashboard
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/Login'
                className='nav-links'
              >
                Logout
              </Link>
            </li> */}
          </ul>
          <Button buttonStyle='btn--outline' onClick={handleLogout}>Log Out</Button>
      </nav>
    </>
  );
}

export default Navbar;
