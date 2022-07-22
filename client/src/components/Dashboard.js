import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';

function Dashboard() {


  useEffect(() => {
    fetchSheets();
  }, []);

  const location = useLocation();
  // console.log('loc.state',location.state.name)

  const [selectedSheet, setSelectedSheet] = useState('')
  const [selectedTab, setSelectedTab] = useState('')
  const [fetchedSheets, setFetchedSheets] = useState([])
  const [tabs, setTabs] = useState([])

  const fetchSheets = async (response) => {

    console.log('email in fetchsheets', location.state.name)
    const email_id = location.state.name;
    console.log('email in fetchsheets2', email_id)
    let resp = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/populatedashboard", { email_id },
      { withCredentials: true })

    console.log('data',resp.data)
    
    if (resp.data === null) {
      window.location.replace('/subscriptions')
    }

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


  return (
    <>

      <Navbar />

      <h1 style={{ margin: '30px 0px 0px 600px' }}> DASHBOARD</h1>

      <div className='container' style={{ margin: '60px 0px 0px 620px' }}>
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
      </div>

    </>
  )
}

export default Dashboard;