import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout=async()=>
  {
    
    const res= await fetch(process.env.REACT_APP_SERVER_URL+'/api/logout',{ credentials: 'include' })
    
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
            
            <li className='nav-links'>
             <Button sx={{color:'white'}} variant="contained" onClick={handleLogout}>Log Out</Button>
            </li>
          </ul>
          
      </nav>
    </>
  );
}

export default Navbar;
