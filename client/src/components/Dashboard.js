import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

function Dashboard() {


  useEffect(() => {
    fetchSheets();
  },[]);

  const location = useLocation();
  // console.log('loc.state',location.state.name)
  const email_id = location.state.name;

  const [selectedSheet, setSelectedSheet] = useState('')
  const [selectedTab, setSelectedTab] = useState('')
  const [fetchedSheets, setFetchedSheets] = useState([])
  const [tabs, setTabs] = useState([])
  const [countOfColumn,setCountOfColum]=useState('')

  const fetchSheets = async (response) => {

    console.log('email in fetchsheets', location.state.name)
    
    console.log('email in fetchsheets2', email_id)
    let resp = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/populatedashboard", { email_id },
      { withCredentials: true })

    console.log('data',resp.data)

    // if there is no spreadsheet in the drive
    if (!resp.data) {
      window.alert('No spreadsheet in the drive')
      window.location.replace('/subscriptions')
    }
    setFetchedSheets(resp.data);
  }

  var select = {};

  (fetchedSheets).map((x) => {
    select[x.name] = x.sheetNames;

  })

  console.log('select', select)

  const sheetList = Object.keys(select).map(key => ({
    name: key

  }));

  console.log('sheetlist', sheetList)

  const handleChangeSheet = (e) => {

    const sheetSelected = e.target.value;
    const tabSelected = sheetSelected !== "" ? select[sheetSelected] : [];
    setSelectedSheet(sheetSelected)
    setTabs(tabSelected)
    setSelectedTab('');
  };

  const handleChangeTab = (e) => {
    const tabSelected = e.target.value;
    setSelectedTab(tabSelected);
  };

const handleSubmit=async()=>{

  const email_id = location.state.name;
  // console.log('reached handlesubmit')
  // console.log('sheet',selectedSheet)
  // console.log('tab',selectedTab)
  fetchedSheets.filter(function(x){
    if(x.name == selectedSheet)
    {
      console.log('x.id',x.id)
      const sheet_id = x.id
     

      let resp =  axios.post(process.env.REACT_APP_SERVER_URL + "/api/getDataFromSpreadsheetById", 
      { email_id ,sheet_id,selectedTab},
      { withCredentials: true })

      .then((response)=>{

        setCountOfColum(response.data)
      })
      .catch((err)=>{
        console.log('err',err)
      })

    }

  })
}



  return (
    <>

      <Navbar />

      <h1 style={{ margin: '30px 0px 0px 600px' }}> DASHBOARD</h1>

      <div className='container' style={{ margin: '60px 0px 0px 620px' }}>

      <Box sx={{ m:1, minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-sheet-label">Sheet</InputLabel>
        <Select sx={{ width: 150 }}
          labelId="select-sheet-label"
          id="select-sheet"
          value={selectedSheet}
          label="Sheet"
          onChange={(e) => {handleChangeSheet(e)}}
        >
          <MenuItem value="">Select the Sheet</MenuItem>
          {sheetList.map((spreadSheet, key) => (
            <MenuItem key={key} value={spreadSheet.name}>
              {spreadSheet.name}
            </MenuItem>
          ))}

        </Select>
        </FormControl>
        </Box>

        <Box sx={{ m:1, minWidth: 120 }}>
      <FormControl fullWidth>  
        <InputLabel id="select-tab-label">Tab</InputLabel>
        <Select sx={{ width: 150 }}
          labelId="select-tab-label"
          id="select-tab"
          value={selectedTab}
          label="Tab"
          onChange={(e) => {handleChangeTab(e)}}
        >
          <MenuItem value="">Select the Tab</MenuItem>

          {tabs.map((selTab, key) => (
            <MenuItem key={key} value={selTab}>
              {selTab}
            </MenuItem>
          ))}

        </Select>
        </FormControl>
        </Box>

        <Button onClick={handleSubmit} variant='contained' sx={{marginLeft:'40px'}}> Submit </Button>
           <h5 style={{margin:'10px 0px 0px 10px'}}>COUNT OF NON ZERO COLUMNS : {countOfColumn}</h5>
      </div>

    </>
  )
}

export default Dashboard;