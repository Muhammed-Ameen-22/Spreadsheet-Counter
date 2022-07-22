import { useEffect, useState, useMemo } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-dropdown';
import { useLocation } from 'react-router-dom';

function Dashboard() {


  useEffect(() => {
    fetchSheets();
  }, []);

  const location = useLocation();
  // console.log('loc.state',location.state.name)

  const [sheet, setSheet] = useState('')
  const [tab, setTab] = useState('')
  const [fetchedSheets, setFetchedSheets] = useState([])
  const [tabs, setTabs] = useState([])

  const fetchSheets = async (response) => {

    console.log('email in fetchsheets', location.state.name)
    const email_id = location.state.name;
    console.log('email in fetchsheets2', email_id)
    let resp = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/populatedashboard", { email_id },
      { withCredentials: true })

    if (resp.data === null) {
      window.location.replace('/subscriptions')
    }
    // resp = await resp.json();

    // console.log("values in object", Object.values(resp.data));
    setFetchedSheets(resp.data);

    // console.log('after setsheet', resp)

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


  const[sheetData,setSheetData]=useState([])


  const[selectedSheet,setSelectedSheet]=useState('') 
  const[selectedTab,setSelectedTab]=useState('')
  const handleChangeSheet = (e) => {

    const sheetSelected = e.target.value;
    const tabSelected = sheetSelected !== "" ? select[sheetSelected] : [];
    setSelectedSheet(sheetSelected)
    setTabs(tabSelected)
    setSelectedTab('');
  };

  const handleChangeTab = (e) => {
    const tabSelected=e.target.value;
    setSelectedTab(tabSelected);
  };


  return (
    <>

      <Navbar />
      {/* <Box sx={{ maxWidth: 150, display: 'inline', gap: 15, width: 150 }}>
        <form> */}
        <div className='container' style={{margin:'60px 0px 0px 600px'}}>
          <InputLabel id="select-sheet-label">Sheet</InputLabel>
          <Select sx={{width:150}}
            labelId="select-sheet-label"
            id="select-sheet"
            value={selectedSheet}
            label="Sheet"
            onChange={e=>handleChangeSheet(e)}
          >
            <MenuItem value="">Select the Sheet</MenuItem>
            {sheetList.map((spreadSheet, key) => (
              <MenuItem key={key} value={spreadSheet.name}>
                {spreadSheet.name}
              </MenuItem>
            ))}

          </Select>

        {/* </form>
      </Box> */}

  
      {/* <Box sx={{ maxWidth: 150, display: 'inline', gap: 15, width: 150 }}>
        <form > */}
          <InputLabel id="select-tab-label">Tab</InputLabel>
          <Select sx={{width:150}}
            labelId="select-tab-label"
            id="select-tab"
            value={selectedTab}
            label="Tab"
            onChange={e=>handleChangeTab(e)}
          >
            <MenuItem value="">Select the Tab</MenuItem>

            {tabs.map((selTab, key) => (
              <MenuItem key={key} value={selTab}>
                {selTab}
              </MenuItem>
            ))}
         
          </Select>
        {/* </form>
      </Box> */}

  </div>

    </>
  )
}

export default Dashboard;