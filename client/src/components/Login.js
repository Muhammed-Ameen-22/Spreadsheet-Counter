import { useState } from 'react';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import '../index.css'

function Login(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('')

    var invalidFormat = /[!#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/;

    const handleUserName=(e)=>
    {
      setUserName(e.target.value)
          
      //checking whether username contains any special characters

      if(invalidFormat.test(userName))
      setErrorMessage("Username should not contain special characters")
      else
      setErrorMessage('')
    }


    const handleSubmit=async(e)=>
    
    {

        e.preventDefault();
        try{
          const res= await axios.post(process.env.REACT_APP_SERVER_URL+"/api/login",
          {userName,password},{ withCredentials: true } )
          .then((response)=>
          {
          console.log('response',response)
          window.location.replace('/subscriptions')
          
          })
          .catch((err,response)=>{
            console.log('Error',err.response.data.Reason)
            setErrorMessage(err.response.data.Reason)
          })
      }
  
      catch(err)
      {
          console.log('ERROR',err)
      }
        
    

    }
    
return(

    <div>
    <div class="forms-container">

      <div class="signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Login</h2>
          <div class="input-field">
          <i><PersonPinIcon/></i>
            <input type="text" placeholder="Username" onChange={(e)=>{handleUserName(e)}} required="true" />
          </div>
          <div class="input-field">
             
             <i><LockIcon/></i>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required="true" />
            </div>
           

          <h3 style={{color:"red", fontSize:"13px"}}>{errorMessage}</h3>
          

          <input type="submit" value="Login" onClick={handleSubmit} class="btn solid" />

          <h3 style={{color:"blue", fontSize:"12px", marginTop : 15}}>Don't have an account  ?   <a style={
            {color:'blue'}
           } href='/'>Sign up</a></h3>
          
        </form>
      </div>
      
    </div>

  </div>
)
}
    
 
export default Login;