import { Box, Typography } from '@mui/material';
import BoxHeader from '../../components/BoxHeader';
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import FlexBetween from '../../components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';


const row3 = () => {
  const pieColors =["#12efc8","#076050"]
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: kpiData} = useGetKpisQuery();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: productData} =useGetProductsQuery();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: transactionData} =useGetTransactionsQuery();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pieChartData= useMemo(() =>{
    if (kpiData){
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) =>{
          return[
            {
              name: key,
              value: value,
            },
            {
              name:`${key} of Total`,
              value: totalExpenses -value,
            }
          ]
        }
      )
    }
  }, [kpiData]);

  const productColums=[
    {
      field: "_id",
      headerName:"id",
      flex: 1,
    },
    {
      field: "expense",
      headerName:"Expense",
      flex: 0.5,
      renderCell:(params: GridCellParams )=> `$${params.value}`,
    },
    {
      field: "price",
      headerName:"Price",
      flex: 0.5,
      renderCell:(params: GridCellParams )=> `$${params.value}`,
    }
  ];

  const transactionColums=[
    {
      field: "_id",
      headerName:"id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName:"Buyer",
      flex: 0.67,
      renderCell:(params: GridCellParams )=> `${params.value}`,
    },
    {
      field: "amount",
      headerName:"Amount",
      flex: 0.35,
      renderCell:(params: GridCellParams )=> `$${params.value}`,
    },
    {
      field: "productIds",
      headerName:"Count",
      flex: 0.1,
      renderCell:(params: GridCellParams )=> (params.value as Array<string>).length,
    }
  ];
  return (
    <>
    <DashboardBox  gridArea="g">
    <BoxHeader
     title='List of Product'
     sideText={`${productData?.length} products`}
     />
     <Box
        mt="0.5rem"
        p="0 0.5rem"
        height="75%"
       
        sx={{
          "& .MuiDataGrid-root":{
            color:"#d1d3da",
            border:"none",
            },
            "& .MuiDataGrid-cell":{
              borderBottom:`1px solid${"#48494e"} !important`,
              },
            "& .MuiDataGrid-columnHeaders":{
              borderBottom:`1px solid${"#48494e"} !important`,
              },
            "& .MuiDataGrid-columnSeparator":{
              visibility:"hidden",
              },  
        }}>
    <DataGrid
      columnHeaderHeight={25}
      rowHeight={35}
      hideFooter={true}
      rows={productData ||[]}
      columns={productColums}
      
    />
    </Box>

    </DashboardBox>
    <DashboardBox gridArea="h">
    <BoxHeader
     title='Recent Orders'
     sideText={`${transactionData?.length} latest transactions`}
     />
     <Box
        mt="1rem"
        p="0 0.5rem"
        height="80%"
       
        sx={{
          "& .MuiDataGrid-root":{
            color:"#d1d3da",
            border:"none",
            },
            "& .MuiDataGrid-cell":{
              borderBottom:`1px solid${"#48494e"} !important`,
              },
            "& .MuiDataGrid-columnHeaders":{
              borderBottom:`1px solid${"#48494e"} !important`,
              },
            "& .MuiDataGrid-columnSeparator":{
              visibility:"hidden",
              },  
        }}>
    <DataGrid
      columnHeaderHeight={25}
      rowHeight={35}
      hideFooter={true}
      rows={transactionData ||[]}
      columns={transactionColums}
      
    />
    </Box>


    </DashboardBox>
    <DashboardBox gridArea="i">
        <BoxHeader title='Expense Breakdown By Category' sideText ="+4%" />
        <FlexBetween mt ="0.5rem" gap="0.5rem" p="0.1rem" justifyContent={"space-between"}  textAlign="center">
        {pieChartData?.map((data, i) =>(
          <Box key={`${data[0].name}-${i}`}>
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
          data={data}
          innerRadius={18}
          outerRadius={35}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
            key={`cell-${index}`} 
            fill={pieColors[index]}
            />
          ))}
        </Pie>
      
      </PieChart> 
      <Typography variant='h5'>{data[0].name}</Typography>
          </Box>
            
          ))}
          
        </FlexBetween>

    </DashboardBox>
    <DashboardBox gridArea="j">
    <BoxHeader title='Overall Summary and Explantion Data' sideText ="+4%" />
    <Box        
        height="15px"
        margin="1.25rem 1rem 0.4rem 1rem"
        bgcolor={"#076050"}
        borderRadius="1rem">
      <Box 
        height="15px"
        bgcolor={"#12efc8"}
        borderRadius="1rem"
        width="40%"
      >

      </Box>
    </Box>

    <Typography margin="0 1rem" variant='h6'>Scalability to integrate factor: to integrate a channel to sent token to openAI with the summary our data to return valuable insights</Typography>
  
    </DashboardBox>
</>
    
  )
}
//Anjaani-putra Pavan sut nama Mahabir Bikram Bajrangi Kumati nivar sumati Ke sangi Kanchan varan viraj subesa Kanan Kundal Kunchit Kesha Hath Vajra Aur Dhuvaje Viraje Kaandhe moonj janehu sajai Sankar suvan kesri Nandan Tej prataap maha jag vandan Vidyavaan guni ati chatur Ram kaj karibe ko aatur Prabu charitra sunibe-ko rasiya Ram Lakhan Sita man Basiya Sukshma roop dhari Siyahi dikhava Vikat roop dhari lank jarava Bhima roop dhari asur sanghare Ramachandra ke kaj sanvare Laye Sanjivan Lakhan Jiyaye Shri Raghuvir Harashi ur laye Raghupati Kinhi bahut badai Tum mam priye Bharat-hi-sam bhai Sahas badan tumharo yash gaave Asa-kahi Shripati kanth lagaave Sankadhik Brahmaadi Muneesa Narad-Sarad sahit Aheesa Yam Kuber Digpaal Jahan te Kavi kovid kahi sake kahan te Tum upkar Sugreevahin keenha Ram milaye rajpad deenha Tumharo mantra Vibheeshan maana Lankeshwar Bhaye Sub jag jana Yug sahastra jojan par Bhanu Leelyo tahi madhur phal janu Prabhu mudrika meli mukh mahee Jaladhi langhi gaye achraj nahee Durgaam kaj jagath ke jete Sugam anugraha tumhre tete Ram dwaare tum rakhvare Hoat na agya binu paisare Sub sukh lahae tumhari sar na Tum rakshak kahu ko dar naa Aapan tej samharo aapai Teenhon lok hank te kanpai Bhoot pisaach Nikat nahin aavai Mahavir jab naam sunavae Nase rog harae sab peera Japat nirantar Hanumant beera Sankat se Hanuman chudavae Man Karam Vachan dyan jo lavai Sab par Ram tapasvee raja Tin ke kaj sakal Tum saja Aur manorath jo koi lavai Sohi amit jeevan phal pavai Charon Yug partap tumhara Hai persidh jagat ujiyara Sadhu Sant ke tum Rakhware Asur nikandan Ram dulhare Ashta-sidhi nav nidhi ke dhata As-var deen Janki mata Ram rasayan tumhare pasa Sada raho Raghupati ke dasa Tumhare bhajan Ram ko pavai Janam-janam ke dukh bisraavai Anth-kaal Raghuvir pur jayee Jahan janam Hari-Bakht Kahayee Aur Devta Chit na dharehi Hanumanth se hi sarve sukh karehi Sankat kate-mite sab peera Jo sumirai Hanumat Balbeera Jai Jai Jai Hanuman Gosahin Kripa Karahu Gurudev ki nyahin Jo sat bar path kare kohi Chutehi bandhi maha sukh hohi Jo yah padhe Hanuman Chalisa Hoye siddhi sakhi Gaureesa Tulsidas sada hari chera Keejai Nath Hridaye mein dera Pavan Tanay Sankat Harana Mangala Murati Roop Ram Lakhana Sita Sahita Hriday Basahu Soor Bhoophb
export default row3