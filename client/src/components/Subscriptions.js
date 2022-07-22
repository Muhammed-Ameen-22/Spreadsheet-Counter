import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import Navbar from './Navbar'
import { gapi } from 'gapi-script';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GoogleLogin from 'react-google-login';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Fade from 'react-reveal/Fade';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import axios from 'axios';


function Subscriptions() {

let navigate =useNavigate();

  const scopes= ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email'];

  const[url,setUrl]=useState('')
  const [signedEmails, setSignedEmails] = useState([]);
  const [render,setRender]=useState(false)
  useEffect(() => {
    fetchSignedInEmails();
  }, [render]);

  const handleOk = () => {
    setOpenDialog(false);
  };
  const [email, setEmail] = useState('')
  const [openDialog,setOpenDialog]=useState(false)


  const getAuthURL = async(response)=>{
    console.log('getAuth')
    let res= await fetch(process.env.REACT_APP_SERVER_URL + "/api/getoAuthurl", {
      credentials: 'include'
    })
     .then(async (response)=>{
      console.log('respo',await response.text())  
      setUrl(await response.text());
     })
     .catch((err)=>{
      console.log('err',err)
     })
      
    
  }


  const responseSuccessGoogle = async (response) => {
    console.log('success', response)
    const tokenId = response.tokenId;
 
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/subscribe",
      { tokenId }, { withCredentials: true })
      .then((response) => {

        fetchSignedInEmails();
        // console.log('response success', response)
        // // removeCookies('token', { path: '/' })
        // // response
        // console.log('cookie1',response.cookie)
      })
      .catch((err)=>{
        setOpenDialog(true)
        // window.alert('Email already subscribed, try again with another email id')
        // console.log('cookie2',response.clearCookie())
        
      })

  }


  const responseFailureGoogle = (response) => {
    console.log('failure', response);
  }

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
    // fetchSignedInEmails();

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
              {/* <IconButton >
                <ArrowForwardIosIcon sx={{ margin: '-5px 0px 0px 457px', fontSize: 20 }} />
              </IconButton> */}
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
{/* 
      <Dialog
        open={openDialog}>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          Email already subscribed, try again with another email id
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
       
      </Dialog> */}
     

  </>
}

export default Subscriptions