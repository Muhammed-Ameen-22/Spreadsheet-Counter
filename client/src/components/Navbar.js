import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {

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
            <li className='nav-item'>
              <Link
                to='/Login'
                className='nav-links'
              >
                Logout
              </Link>
            </li>
          </ul>
          {/* <Button buttonStyle='btn--outline' >Log Out</Button> */}
      </nav>
    </>
  );
}

export default Navbar;
