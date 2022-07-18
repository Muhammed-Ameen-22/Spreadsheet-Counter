import {useEffect,useState,useMemo} from 'react';
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
import {useLocation} from 'react-router-dom'; 

function Dashboard()
{
  const location=useLocation();
  useEffect(() => {

    fetchSheets();
  }, [location.state.detail]);

  
  console.log('loc.state',location.state.id)
  console.log('loc.state',location.state.name)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = useState('');

    const [sheets,setSheets]=useState([])
    const fetchSheets = async (response) => {
      console.log('email in fetchsheets',location.state.name)
      const email_id = location.state.name;
      console.log('email in fetchsheets2',email_id)
      let resp = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/populatedashboard", {email_id},
      { withCredentials: true })
  
      // resp = await resp.json();
      

      console.log("this is res", resp.data);
      setSheets(resp.data)

    

    }
    const handleMakeChange = (event) => (
      setMake(event.target.value)
  );
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const handleModelChange = (event) => (
    setModel(event.target.value)
);

    const sheetNames = useMemo(() => {
      const modelsValues = {};
      (sheets).forEach(({ name, sheetNames }) => {
        modelsValues[name] = sheetNames;
      })
    
     return modelsValues;
    })
    const handleChange = (e) => {
      setAge(e.target.value);
    };
                           
    const  renderDropDown = (card, index) => {
    return(
    <>

{/* 
{make && <FormControl variant="outlined" >
         <InputLabel id="demo-simple-select-outlined-label">Model</InputLabel>
         <Select
             labelId="demo-simple-select-outlined-label"
             id="demo-simple-select-outlined"
             value={model}
             onChange={handleModelChange}
             label="Model"
         >
             <MenuItem value="">
                 <em>Choose a Model</em>
             </MenuItem>
             {sheetNames[make] 
                 ? sheetNames[make].map((model, index) => (
                     <MenuItem key={index} value={model.name}>{model.name}</MenuItem>
                 ))
                 : null
             }
    

     </Select>
</FormControl>} */}







    
    {/* <p>{card}</p> */}
     
    <Box  sx={{maxWidth: 150,display: 'inline', gap: 15 ,width: 150}}>
         <form>
         <InputLabel id="demo-simple-select-label">Sheet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Sheet"
          onChange={handleChange}
        >
          {/* <MenuItem value={card.id}>{card.id}}</MenuItem> */}
          <MenuItem value={20}>{card.name}</MenuItem>
          {/* <MenuItem value={30}>{card.name}</MenuItem> */}
        </Select>
         </form>
        </Box>

        <Box  sx={{maxWidth: 150,display: 'inline', gap: 15 ,width: 150}}>
         <form>
         <InputLabel id="demo-simple-select-label">Tab</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Tab"
          onChange={handleChange}
        >
          <MenuItem value={10}>{card.sheetNames[0]}</MenuItem>
          <MenuItem value={20}>{card.sheetNames[1]}</MenuItem>
          
        </Select>
         </form>
         </Box>
      
    </>
    )
    }

    return<>
    <Navbar />
    {sheets.map(renderDropDown)}
    </>
    
}
export default Dashboard;