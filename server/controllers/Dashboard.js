import Subscriptions from '../models/Subscriptions.js';
import {OAuth2Client} from 'google-auth-library'



const client = new OAuth2Client('44825773041-q3f4993iapufebr6av6fepgnbjn2e6do.apps.googleusercontent.com')

export const subscribe=async(req,res)=>{
    console.log('req body',req.body)
    const  tokenId=req.body.tokenId;
 
    .then(response=>{
        const {email_verified,name,email} = response.payload
        // console.log('payload',response.payload)

        if(email_verified)
        {
            Subscriptions.findOne({email}, function (data,err) {
                if (err) 
                {
                    
                    //user exists
                    const response = { "Status": "Failure", "Reason": "Google Account already subscribed" }
                    return res.status(400).send(response)
    
                }
                else{
                    
                const userId=req.user.userId;
                const subscription = new Subscriptions({userId:userId,email:email, tokenId:tokenId });
                subscription.save();
                return res.status(200).send('Successful')
                }
            }
                 )
        }
        
    })
    .catch(error=>{
        console.log('Error',err)
    })

}


export const fetchSignedInEmails =async(req,res)=>{

    console.log('reached fetchSignedInEmails')
    try {
        

        //check if username already exists in db

        Subscriptions.findOne({ userId : req.user.userId }, function (data,err) {
            if (err) 
            {
                
                //user exists
                const response = { "Status": "Failure", "Reason": "Username already exist" }
                return res.status(400).send(response)

            }
            

            else{


                //adding user
                // const user = new User({ userName: userName, password:hashedPassword });
                // user.save();
                console.log('res',res.data)
                return res.status(200).send('Successful')

            }

        }
        )
        }catch (error) {
             
    }
}

