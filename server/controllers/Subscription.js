import Subscription from '../models/Subscription.js';
import { google } from 'googleapis';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const OAuth2Data = require('../credentials.json')
const CLIENT_ID = OAuth2Data.web.client_id
const CLIENT_SECRET = OAuth2Data.web.client_secret
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

const fs = require('fs');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email'];


export const getAccessToken = async (req,res)=>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('url:', authUrl);

    return res.status(200).send(authUrl);

}



export const authenticateToken = async (req, res) => {

    // console.log("req inside auth",req.query.code);
    
    if(req.query.code == null) return res.status(400).send("Invalid Request")
    oAuth2Client.getToken(req.query.code, (err, token) => {
        if (err) 
        return console.log('Error retrieving access token', err);
        console.log('token inside autheinticateToken',token)
        oAuth2Client.setCredentials(token);

        //for getting the user mail id from the id_token.
        oAuth2Client.verifyIdToken({
            idToken: token.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        }
        )
            .then((response) => {
                
                console.log('inside verify token')
                const email=response.payload.email;
                const userId=req.user.userId;
                Subscription.findOne({$and:[{email:email},{userId:userId}]}, function (data, err) {
                 if (err) {    
                 
                //if email already subscribed
                 console.log('email already subscribed')
                 const response = { "Status": "Failure", "Reason": "Google Account already subscribed" }
                 return res.status(400).redirect('http://localhost:3000/Subscriptions')
                 
                  }
                else 
                  {
                 console.log('email not subscribed')
                 const subscription = new Subscription({ userId: req.user.userId, email: response.payload.email, 
                                     tokenId: token });

                subscription.save();
                console.log("Authenticated user : ",response.payload.email);
                return res.redirect('http://localhost:3000/Subscriptions');
                 }
                })
               
            })
            .catch((err)=>{console.log("Error verifying token",err)});

    });

}


export const fetchSignedInEmails = async (req, res) => {

    // console.log('reached fetchSignedInEmails')
    try {


        //check if user has entry in subscription table
        // console.log('user id', req.user.userId)
        Subscription.find({ userId: req.user.userId }, function (err, data) {

            if (data) {
                //user has entry
                // console.log('res', data)
                return res.status(200).json(data);


            }

            else {
                const response = { "Status": "Failure", "Reason": "No Account found" }
                return res.status(400).send(response)

            }

        }
        ).select({ "email": 1, "_id": 0 })
    } catch (error) {

    }
}


