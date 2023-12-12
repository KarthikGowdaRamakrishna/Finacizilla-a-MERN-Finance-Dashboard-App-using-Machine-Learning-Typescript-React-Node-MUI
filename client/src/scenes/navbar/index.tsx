import {useState} from 'react';
import {Link} from "react-router-dom";
import {Box, Typography ,useTheme} from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import FunctionsIcon from '@mui/icons-material/Functions';



const Navbar = () => {
  const {palette} = useTheme();
  const [selected, setselected] = useState("dashboard");
    return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" justifyContent="space-between" color={palette.grey[300]}
    >{/* Left side */}
    <FlexBetween gap="0.75rem"> 
   
    <FunctionsIcon sx={{fontSize:"28px"}}/>
    <Typography variant="h4" fontSize="16px"> FinAczilla </Typography>
    </FlexBetween>
    {/* Right side */}
    <FlexBetween gap="1rem">
      <Box sx={{"🙲:hover":{color: palette.primary.main}}}>
        <Link to="/"
        onClick={()=> setselected("dashboard")}
        style={{
          color: selected ==="dashboard" ? "inherit": palette.grey[700],
          textDecoration: "inherit"
        }}
        >
          dashboard
        </Link>
      </Box>
      <Box sx={{"🙲:hover":{color: palette.primary.main}}}>
        <Link to="/predictions"
        onClick={()=> setselected("predictions")}
        style={{
          color: selected ==="predictions" ? "inherit": palette.grey[700],
          textDecoration: "inherit"
        }}
        >
          predictions
        </Link></Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar