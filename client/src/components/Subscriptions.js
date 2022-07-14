import Navbar from './Navbar'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GoogleLogin from 'react-google-login';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

function Subscriptions (){

    const responseGoogle = (response) => {
        console.log(response);
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
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // theme:dark
        cookiePolicy={'single_host_origin'}/>
        
        </div>



    <Card  variant="outlined" sx={{ maxWidth: 520, height: '58px', margin:'45px 0px 0px 105px',background:'#bfdbfb', borderRadius: '50px'}}>
      <CardContent>
        <Typography sx={{ fontSize: 20, color:'#000000', position: 'absolute', margin:'-2px 0px 0px 30px' }} >
          temp@gmail.com 
        </Typography>
        <IconButton>
        <ArrowForwardIosIcon sx={{margin:'20px 0px 0px 215px',fontSize:100}} onClick={responseGoogle}/>
        </IconButton>
      </CardContent>
    </Card>

    </div>


        </>
    )
}

export default Subscriptions