import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import Navbar from './Navbar'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fade from 'react-reveal/Fade';
import Button from '@mui/material/Button';


function Subscriptions() {

let navigate =useNavigate();


  const [signedEmails, setSignedEmails] = useState([]);
  const [render,setRender]=useState(false)

  useEffect(() => {
    fetchSignedInEmails();
  }, [render]);


  const  redirectURL=(email)=>{
    console.log('email',email)
    navigate('/dashboard',{state:{name:email}});
  }



  const fetchSignedInEmails = async (response) => {

    let resp = await fetch(process.env.REACT_APP_SERVER_URL + "/api/fetchSignedInEmails", {
      credentials: 'include'
    })
    
    console.log("this is res", resp);
    resp = await resp.json();

    if(resp.isLoggedIn === false)
    {
      window.location.replace('/login')
    }
    setSignedEmails(resp)
    setRender(true)
    // console.log('signed Emails',signedEmails)

  }
  
  const  renderCard = (card, index) => {
  return (

    <>

      <div style={{ marginLeft: '350px' }} onClick={() => {redirectURL(card.email)}}>
      
        <Fade left>

          <Card variant="outlined" sx={{ maxWidth: 520, height: '58px', margin: '45px 0px 0px 105px', 
          background: '#bfdbfb', borderRadius: '50px' }}>
            <CardContent>
              <Typography sx={{ fontSize: 20, color: '#000000', position: 'absolute', margin: '-2px 0px 0px 30px' }} >
                {card.email}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </div>


    </>
  )
  }

  return<>
  <Navbar/>

  
         {(signedEmails.length === 0) ? <h3 style={{ display: 'flex', margin: '62px 0px 0px 105px' }}>
          <HighlightOffIcon />No Subscriptions added, click below to add your first subscription</h3>:<></>} 
          
        <div style={{ display: 'flex', margin: '18px 0px 0px 100px ' }}>

    <Button variant='contained' href='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=44825773041-q3f4993iapufebr6av6fepgnbjn2e6do.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fauthenticate'>
      Subscribe</Button>

          
        </div>

      <div className="grid" 
      style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        {signedEmails.map(renderCard)}
      </div>

  </>
}

export default Subscriptions