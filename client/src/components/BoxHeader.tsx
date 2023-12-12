import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material';


type Props = {
    title: string;
    sideText: string;
    subtitle?:string;
    icon?: React.ReactNode;
}


const BoxHeader = ({icon, title, subtitle, sideText}: Props) => {

  return (
    <FlexBetween 
        color={"#c2c5ce"} 
        margin={"1.5rem 1rem 0 1rem"}
        justifyContent="space-between"
        > 
            <FlexBetween>
                {icon}
                <Box width="100%">
                    <Typography variant="h4" mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <Typography variant='h5' fontWeight="700"  color={"#f2b455"}>
                {sideText}
            </Typography>
        </FlexBetween>
   
  )
}

export default BoxHeader