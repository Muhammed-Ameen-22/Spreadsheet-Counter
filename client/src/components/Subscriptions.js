import {useEffect, useState} from 'react';
import Navbar from './Navbar'
import {gapi} from 'gapi-script';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GoogleLogin from 'react-google-login';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function Subscriptions (){


  useEffect(() => {
    fetchSignedInEmails();

  }, []);


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '44825773041-q3f4993iapufebr6av6fepgnbjn2e6do.apps.googleusercontent.com',
        scope: 'email',
      },
      fetchSignedInEmails,[]);
    }

    gapi.load('client:auth2', start);
  }, []);

    const [email,setEmail]=useState('') 


    const responseSuccessGoogle = async(response) => {
        console.log('success',response)
        const tokenId=response.tokenId;
        // const email=response.profileObj.email
        const res=await axios.post(process.env.REACT_APP_SERVER_URL+"/api/subscribe",
        {tokenId},{withCredentials:true})
        .then(response=()=>
        {
          console.log('response success',response)
        })
        // setEmail(response.profileObj.email);
      }

    
    const responseFailureGoogle = (response) => {
        console.log('failure',response);
      }
     
    const fetchSignedInEmails=async(response)=>{
      const resp= await axios.post(process.env.REACT_APP_SERVER_URL+"/api/fetchEmail")
    .then(response=()=>{
      console.log('fetchSignedINEmail',response)
    })
    }


    return(
        
        <>
       
        <Navbar />

       <div style={{marginLeft:'350px'}}>        
        <h3 style={{display:'flex', margin:'62px 0px 0px 105px'}}>
        <HighlightOffIcon/>No Subscriptions added, click below to add your first subscription</h3>
        
        <div style={{display:'flex', margin:'18px 0px 0px 100px '}}>
        <GoogleLogin 
        buttonText="Add Subscription" 
        clientId="44825773041-q3f4993iapufebr6av6fepgnbjn2e6do.apps.googleusercontent.com"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        // theme:dark
        cookiePolicy={'single_host_origin'}/>
        
        </div>



    <Card  variant="outlined" sx={{ maxWidth: 520, height: '58px', margin:'45px 0px 0px 105px',background:'#bfdbfb', borderRadius: '50px'}}>
      <CardContent>
        <Typography sx={{ fontSize: 20, color:'#000000', position: 'absolute', margin:'-2px 0px 0px 30px' }} >
          {email}
        </Typography>
        <IconButton>
        <ArrowForwardIosIcon sx={{margin:'20px 0px 0px 215px',fontSize:100}} onClick={responseSuccessGoogle}/>
        </IconButton>
      </CardContent>
    </Card>

    </div>


        </>
    )
}

export default Subscriptions