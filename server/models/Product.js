import mongoose from "mongoose";
import{ loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
    {
        price:{
            type: mongoose.Types.Currency,
            Currency: "INR",
            get:(v)=> v/100
        },
        expense:{
            type: mongoose.Types.Currency,
            Currency: "INR",
            get:(v)=> v/100
        },
        transactions:[{
            type: mongoose.Types.ObjectId,
            ref:"Transaction",     
        }],

    },
    {timestamps:true, toJSON:{ getters: true}}

);

const Product = mongoose.model("Product", ProductSchema);

export default Product; 