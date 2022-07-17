import { useEffect, useState } from 'react';
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
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';


function Subscriptions() {


  useEffect(() => {
    fetchSignedInEmails();

  }, []);


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: 'email',
      },
      );
    }

    gapi.load('client:auth2', start);
    fetchSignedInEmails();
  }, []);

  const handleOk = () => {
    setOpenDialog(false);
  };
  const [email, setEmail] = useState('')
  const [openDialog,setOpenDialog]=useState(false)

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


  const [signedEmails, setSignedEmails] = useState([]);

  const fetchSignedInEmails = async (response) => {

    let resp = await fetch(process.env.REACT_APP_SERVER_URL + "/api/fetchSignedInEmails", {
      credentials: 'include'
    })

    resp = await resp.json();

    console.log("this is res", resp);

    setSignedEmails(resp)
    console.log('signed Emails',signedEmails.length)


  }

  const  renderCard = (card, index) => {
  return (

    <>

      <div style={{ marginLeft: '350px' }}>
      
        <Fade left>

          <Card variant="outlined" sx={{ maxWidth: 520, height: '58px', margin: '45px 0px 0px 105px', background: '#bfdbfb', borderRadius: '50px' }}>
            <CardContent>
              <Typography sx={{ fontSize: 20, color: '#000000', position: 'absolute', margin: '-2px 0px 0px 30px' }} >
                {card.email}
              </Typography>
              <IconButton>
                <ArrowForwardIosIcon sx={{ margin: '20px 0px 0px 215px', fontSize: 100 }} />
              </IconButton>
            </CardContent>
          </Card>
        </Fade>
      </div>


    </>
  )
  }

  return<>
  <Navbar/>

  
         {(signedEmails.length === 0) ? <h3 style={{ display: 'flex', margin: '62px 0px 0px 105px' }}><HighlightOffIcon />No Subscriptions added, click below to add your first subscription</h3>:<></>} 
          
        <div style={{ display: 'flex', margin: '18px 0px 0px 100px ' }}>
          <GoogleLogin
            buttonText="Add Subscription"
            clientId='44825773041-q3f4993iapufebr6av6fepgnbjn2e6do.apps.googleusercontent.com'
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            // theme:dark
            cookiePolicy={'single_host_origin'} />
        </div>

      <div className="grid" 
      style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        {signedEmails.map(renderCard)}
      </div>

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
       
      </Dialog>
     

  </>
}

export default Subscriptions