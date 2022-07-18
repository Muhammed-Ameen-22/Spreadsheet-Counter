import { google } from 'googleapis';

import { createRequire } from 'module';
import Subscription from '../models/Subscription.js';
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





/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// function authorize(credentials, callback) {
// const { client_secret, client_id, redirect_uris } = credentials.web;
// const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0]);


export const populateDashboard = async (req, res) => {
  // check in the db for accesstoken
  console.log('email id',req.body)
  const userInstance = await Subscription.findOne({ email: req.body.email_id });
  if (userInstance != null) {

    // console.log('user instance',userInstance )
    const tokenId = userInstance.tokenId; 
    oAuth2Client.setCredentials(tokenId);
    
    const files = await getSheetsFromDrive(oAuth2Client)
    console.log('files user', files)
    return res.send(files);

  }
  else {
    const response = { "Status": "Failure", "Reason": "Please authenticate with Google OAuth first" }
    return res.status(400).send(response)
  }




}


// function getSheetsFromDrive(auth) {

// const getSheetsFromDrive = async (auth)=> {

//   console.log("Inside getsheets");
//   const drive =  google.drive({ version: 'v3', auth });
//     drive.files.list({
//     q: 'mimeType=\'application/vnd.google-apps.spreadsheet\'',
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;

//     console.log('res files',res.data.files)
//     if (files.length) {

//       console.log('Files:');

//       files.map((file) => {

//         console.log(`${file.name} (${file.id})`);
//       });
//       return res.data.files;
//       // return files;

//     } else {
//       console.log('No files found.');
//     }


//     //get the sheet date with the spreadsheet id

//     const sheets = google.sheets({ version: 'v4', auth });
//     sheets.spreadsheets.values.get({
//       spreadsheetId: files[0].id,
//       range: 'Sheet1!1:1',
//     }, (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const rows = res.data.values;
//       if (rows.length) {
//         console.log('Name, Major:');
//         // Print columns A and E, which correspond to indices 0 and 4.
//         rows.map((row) => {
//           console.log(`${row}`);
//         });
//       } else {
//         console.log('No data found.');
//       }
//     });


//   });
// }






const getSheetsFromDrive = async (auth) => {

  const drive = google.drive({ version: 'v3', auth });
  const api = google.sheets({ version: 'v4', auth: auth });
  try {

    try{
    var res = await drive.files.list({
      q: 'mimeType=\'application/vnd.google-apps.spreadsheet\'',
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    })
  }
  catch(err){
    console.log("Error while listing files:" + err)
  }

    const files = res.data.files;

    if (files.length) {

      console.log('Files:', typeof (files));

      await Promise.all(files.map(async (file) => {
        console.log(`${file.name} (${file.id})`);
        const sheet_data = await api.spreadsheets.get({ spreadsheetId: file.id });

        // (await api.spreadsheets.get({spreadsheetId: file.id})).data.sheets
        //     .map((sheet) =>{ 
        //       console.log("sheet name:",sheet.properties.title)
        //       file.sheet=sheet.properties.title
        // }  );

        console.log("inside file map");
        let sheetNames = [];
        await Promise.all(sheet_data.data.sheets.map( (sheet) => {
          console.log("Inside sheet map");
          console.log("sheet name:", sheet.properties.title);
          sheetNames.push(sheet.properties.title);
        }));
        file.sheetNames = sheetNames;
        
      }));

      console.log("before return", files);

      //   .filter(sheet => console.log("sheet name:",sheet.properties.title))

      // });

      // .map((file) => {
      //           console.log(`${file.name} (${file.id})`);
      //         });

      // return res.data.files;
      return files;

    } else {
      console.log('No files found.');
    }

  }  catch (err) {
    console.log('The API returned an error: ' + err);
  };
    //get the sheet data with the spreadsheet id
}

  function getDataFromSpreadsheetById(){
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
      spreadsheetId: files[0].id,
      range: 'Sheet1!1:1',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log('Name, Major:');
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(`${row}`);
        });
      } else {
        console.log('No data found.');
      }
    });


  }



