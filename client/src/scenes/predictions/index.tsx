import React, { useMemo, useState } from 'react'
import { useGetKpisQuery } from '../../state/api';
import DashboardBox from '../../components/DashboardBox';
import FlexBetween from '../../components/FlexBetween';
import { Box, Button, Typography } from '@mui/material';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import regression, { DataPoint } from "regression";

const Predictions = () => {
    const[isPredictions, setIsPredictions] =useState(false);
    const{data: kpiData} = useGetKpisQuery();

    const formattedData = useMemo(()=>{
        if(!kpiData) return[];
        const monthData = kpiData[0].monthlyData;
        
        const formatted: Array<DataPoint> = monthData.map(  
            ({revenue}, i:number) =>{
                return [i, revenue]
            }
        );
        const RegressionLine = regression.linear(formatted); 
        
        return monthData.map(({month, revenue}, i: number)=>{
          return{
            name: month,
            "ActualRevenue": revenue,
            "RegressionLine": RegressionLine.points[i][1],
            "PredictedRevenue": RegressionLine.predict(i + 12)[1],
          };
        })
    },[kpiData])

  
    return (
    <DashboardBox width ="100%" height="100%" p="1rem" overflow={"hidden"}
    >
     <FlexBetween m="1rem 2.5rem" gap="0.3rem" justifyContent={'space-between'}>
      <Box>
        <Typography variant='h3'> Revenue and Predictions</Typography>
        <Typography variant='h6'> charted revene and predicted revenue based on a simple linear regression model
        </Typography>
        </Box>  
        <Button onClick={() => setIsPredictions(!isPredictions)}
        sx={{
            color: "#242427",
            bgcolor: "#6b6d74",
            boxShadow:"0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
        }}>
            Show Predicted Revenue for Next Year
        </Button>
     </FlexBetween>
     <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke ={"#48494e"}/>
          <XAxis 
            dataKey="name" 
            tickLine={false} 
            style={{fontSize:"10x"}}>
            <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
          <YAxis 
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: '0'}} 
            style={{fontSize:"10x"}} 
            tickFormatter={(v) => `$${v}`}
           >
            <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
           </YAxis>
          <Tooltip />
          <Legend 
           verticalAlign='top'
          />
          <Line 
            type="monotone"
            dataKey="ActualRevenue"
            stroke={"#8884d8"} 
            strokeWidth={0.1}
            dot={{ strokeWidth: 5}}
            />
          <Line 
          type="monotone" 
          dataKey="RegressionLine" 
          stroke={"#d0fcf4"}
          dot={false}
          />
          {isPredictions && (
            <Line 
            strokeDasharray="5 5"
            dataKey="PredictedRevenue" 
            stroke="#f2b455"
            />

          )}
        </LineChart>
      </ResponsiveContainer>
     
    </DashboardBox>
    );
}

export default Predictions