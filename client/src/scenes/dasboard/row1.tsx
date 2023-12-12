import { useMemo } from 'react';
import DashboardBox from '../../components/DashboardBox';
import {useGetKpisQuery } from '../../state/api';
import { 
  ResponsiveContainer, 
  AreaChart, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  Area, 
  Tooltip, 
  Line, 
  CartesianGrid,
  Legend,
  LineChart} from 'recharts';
import { useTheme } from '@mui/material';
import BoxHeader from '../../components/BoxHeader';




const Row1 = () => {
    const{palette} = useTheme();
    const{data} = useGetKpisQuery();
    
    const revenueExpenses = useMemo(()=>{
      return(
        data &&
        data[0]?.monthlyData?.map(({month, revenue, expenses}) =>{
          return{
            name: month.substring(0,3), 
            revenue: revenue,
            expenses: expenses,
          }
        })
        );
    },[data]);

    const revenue = useMemo(()=>{
      return(
        data &&
        data[0]?.monthlyData?.map(({month, revenue}) =>{
          //console.log(revenue);
          return{
            name: month.substring(0,3), 
            revenue: revenue,
          }
        })
        );
    },[data]);

    const revenueProfit = useMemo(()=>{
      return(
        data &&
        data[0]?.monthlyData?.map(({month, revenue, expenses}) =>{
          //console.log(revenue);
          return{
            name: month.substring(0,3), 
            revenue: revenue,
            profit: (revenue - expenses).toFixed(2),
          }
        })
        );
    },[data]);
  return (
    <>
    <DashboardBox gridArea="a"> 
    <BoxHeader 
      title="Revenue and Expenses"
      subtitle="top line represents revenue, bottom line represents"
      sideText="+4%"
/>        
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop 
          offset={"5%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0.5}
          />
          <stop 
          offset={"95%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0}
          />
          </linearGradient>
          <linearGradient id="colorexpenses" x1="0" y1="0" x2="0" y2="1">
          <stop 
          offset={"5%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0.5}
          />
          <stop 
          offset={"95%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0}
          />
          </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10x"}}/>
          <YAxis axisLine={{strokeWidth:"0"}} tickLine={false} style={{fontSize:"10x"}} domain={[8000, 2300 ]}/>
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue" 
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorRevenue)" />
          <Area 
          type="monotone" 
          dataKey="expenses" 
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorexpenses)" />
        </AreaChart>
      </ResponsiveContainer>
      </DashboardBox>
    <DashboardBox gridArea="b">
    <BoxHeader 
      title="Profit and Revenue"
      subtitle="top line represents revenue, bottom line represents"
      sideText="+4%"
/>        
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={revenueProfit}
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
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }}/>
          <Line 
            yAxisId="left"
            type="monotone"
            dataKey="profit"
            stroke={"#8884d8"} />
          <Line 
           yAxisId="right"
          type="monotone" 
          dataKey="revenue" 
          stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="c">
    <BoxHeader 
      title="Revenue Month by Month"
      subtitle="graph representing the revenue month by month"
      sideText="+4%"
/>  
    <ResponsiveContainer width="100%" height="100%">
     
        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop 
          offset={"5%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0.8}
          />
          <stop 
          offset={"95%"} 
          stopColor={"#71f5de"} 
          stopOpacity ={0}
          />
          </linearGradient>  
          </defs>
          <CartesianGrid vertical={false} stroke={"#48494e"} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}/>
          <YAxis 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}/>
          <Tooltip />
          <Bar dataKey="revenue" fill="url(#colorRevenue)" />

        </BarChart>
      </ResponsiveContainer> 
      </DashboardBox> 
</>
    
  )
}

export default Row1