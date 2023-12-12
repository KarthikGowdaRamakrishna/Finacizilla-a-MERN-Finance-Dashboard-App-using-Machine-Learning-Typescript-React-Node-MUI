import express from "express";
import KPI from"../models/KPI.js";

const router = express.Router();

router.get("/kpis", async(req,res)=>{
    console.log("reached");
    try{
        const kpis = await KPI.find();
        console.log("reached");
        res.status(200).json(kpis);
        
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
});

export default router;