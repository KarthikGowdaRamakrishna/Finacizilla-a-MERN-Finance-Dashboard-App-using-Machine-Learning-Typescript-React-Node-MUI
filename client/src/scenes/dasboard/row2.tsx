/* eslint-disable react-hooks/rules-of-hooks */
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import BoxHeader from '../../components/BoxHeader';
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import FlexBetween from '../../components/FlexBetween';
//import React from 'react';

const pieData =[
{name:"Group A", value: 600},
{name:"Group B", value: 400},

]


const row2 = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const{palette} = useTheme();
  const pieColors =["#076050","#71f5de"];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data:operationalData } = useGetKpisQuery();
  const {data: productData} = useGetProductsQuery();
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const operationalExpenses = useMemo(()=>{
    return(
      operationalData &&
      operationalData[0]?.monthlyData?.map(({month, operationalExpenses, nonOperationalExpenses}) =>{
        //console.log(nonOperationalExpenses , operationalExpenses)
        return{
          name: month.substring(0,3), 
          "operationalExpenses": operationalExpenses,
          "nonOperationalExpenses": nonOperationalExpenses
        }
      })
      );
  },[operationalData]);

  const productExpenseData = useMemo(()=>{
    return(
      productData &&
      productData.map(
        ({_id, price, expense}) =>{
          console.log(_id, price, expense)
        return{
         id: _id,
         price: price,
         expense: expense
        }
      })
      );
  },[productData]);

  return (
    <>
    <DashboardBox gridArea="d">
    <BoxHeader 
      title="Opertational vs Non-opertational expense"
      sideText="+4%"
/>        
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical={false} stroke ={"#48494e"}/>
          <XAxis 
            dataKey="name" 
            tickLine={false} 
            style={{fontSize:"10x"}}/>
          <YAxis 
            yAxisId="left" 
            orientation= "left"
            axisLine={false} 
            tickLine={false} 
            style={{fontSize:"10x"}} 
           />
           <YAxis 
            yAxisId="right"
            orientation= "right"
            axisLine={false} 
            tickLine={false} 
            style={{fontSize:"10x"}} 
           />
          <Tooltip />
          <Line 
            yAxisId="left"
            type="monotone"
            dataKey="nonOperationalExpenses"
            stroke={"#8884d8"} />
          <Line 
           yAxisId="right"
          type="monotone" 
          dataKey="operationalExpenses" 
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="e">
    <BoxHeader title="Campaigns and Targets" sideText="+4%"/>
    <FlexBetween justifyContent="space-between" mt="o.25rem" gap="1.5rem" pr="1rem" >
    <PieChart 
       width={110} 
       height={100}
       margin={{
        top: 0,
        right: -10,
        left: 10,
        bottom: 0,
      }}
       >
        <Pie
          stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell 
            key={`cell-${index}`} 
            fill={pieColors[index]}
            />
          ))}
        </Pie>
      
      </PieChart> 
      <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5" >Target Sales </Typography>
        <Typography m="0.3rem 0" variant="h3" color={"#71f5de"}>83</Typography>
        <Typography variant='h6'>Finace goals of the campaign that is desired</Typography>
        </Box> 
        <Box 
         flexBasis="40%" >
        <Typography variant="h5" >loses in revenue</Typography>
        <Typography variant="h6" >loses are down by 25%</Typography>
        <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
        <Typography variant="h6">Margins are up by 25%</Typography>
        </Box> 
      </FlexBetween>  

    </DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="f">
    <BoxHeader title="Product vs Expenses" sideText="+4%"/>
    <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#48494e"/>
          <XAxis 
            type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px"}}
            tickFormatter={(v) => `$${v}`}
            />
            <YAxis 
            type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px"}}
            tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]}/>
         
          <Tooltip formatter={(v) =>  `$${v}`} />
          <Scatter 
            name="Product Expense Ratio" 
            data={productExpenseData} 
            fill="#8884d8" 
            />
        </ScatterChart>
      </ResponsiveContainer>
    </DashboardBox>
</>
    
  )
}

export default row2