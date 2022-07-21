import {useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

// import Fade from 'react-reveal/Fade';
import '../index.css'

function SignUp(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('')

    const [openDialog, setOpenDialog] = useState(false);

   const handleOk=()=>
   {
    window.location.replace('/login')
   }
    const handleClose = () => {
      setOpenDialog(false);
    };

    var format = /[!#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;

    const handleUserName=(e)=>
       {
 
          setUserName(e.target.value)
          
          //checking whether username contains any special characters

          if(format.test(userName))
          setErrorMessage("Username should not contain special characters")
          else
          setErrorMessage('')
        }


    const handleSubmit=async(e)=>
    
    {
          if(!userName || !password || !confirmPassword)

          {
            setErrorMessage('Field should not be blank')
          }
 
          else if(userName && password && confirmPassword)

          {

              e.preventDefault();

              if(password.length < 6)

                  setErrorMessage("Password must be greater than 5 characters")

              else
              
              {

                  if(password !== confirmPassword)
                      setErrorMessage("Password do not match")

                  else if(password === confirmPassword)
                  {
                      setErrorMessage("")
                      
                      //sendind data to backend
                      try{
                        const res= await axios.post(process.env.REACT_APP_SERVER_URL+"/api/register",
                        {userName,password},{ withCredentials: true } )
                        .then((response)=>
                        {
                        console.log(response)
                        setOpenDialog(true)
                        })
                        .catch((err,response)=>{
                          // console.log('Error',err.response.data.Reason)
                          setErrorMessage(err.response.data.Reason)
                        })
                    }
                
                    catch(err)
                    {
                        console.log('ERROR',err)
                    }
                      
                  }
              }
          
              
               
              
          
        }
    }

    
    
return(

    <div>
    <div class="forms-container">

      <div class="signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
          <i><PersonPinIcon/></i>
            <input type="text" placeholder="Username" onChange={(e)=>{handleUserName(e)}} required="true" />
          </div>
          <div class="input-field">
             
             <i><LockIcon/></i>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required="true" />
            </div>
            <div class="input-field">
            <i><LockIcon/></i>
            <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} required="true" />
          </div>

         


          <input type="submit" value="Sign up" onClick={handleSubmit} class="btn solid" />
           <h3 style={{color:"red", fontSize:"13px"}}>{errorMessage}</h3>
           <h3 style={{color:"blue", fontSize:"12px", marginTop : 15}}>Already have an account  ?   <a style={
            {color:'blue'}
           } href='/login'>Sign in</a></h3>
           
        </form>
      </div>
      
    </div>


     {/* dialog box  */}

    
    <Dialog
        open={openDialog}
        onClose={handleClose}
      >
        
        <DialogTitle>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          Registration successful, login to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
       
      </Dialog>
     
  </div>
)
}
    
 
export default SignUp;