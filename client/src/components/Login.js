import { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import '../index.css'
function Login(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('')

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const handleUserName=(e)=>
    {
        setUserName(e.target.value)
        if(format.test(userName))
        setErrorMessage("Username should not contain special characters")
        else
        setErrorMessage('')
    }


    const handleSubmit=(e)=>{

        e.preventDefault();
    if(format.test(userName))
    setErrorMessage("Username should not contain special characters")

    }
    useEffect=(()=>{
    },[]
    );
    
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
          
        </form>
      </div>
      
    </div>

  </div>
)
}
    
 
export default Login;