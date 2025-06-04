import mongoose from "mongoose";
const vendorSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    image:{type:String,require:true},
    speciality:{type:String,require:true},
    experience:{type:String,require:true},
    about:{type:String,require:true},
    available:{type:Boolean,require:true},
    fee:{type:Number,require:true},
    address:{type:Object,require:true},
    date:{type:Number,require:true},
    slot_booked:{type:Object,default:{}}
},{minimize:false})
// minimize false consider that ur value should be default empty if u make it true then you have problem in making it empty
const vendorModel= mongoose.models.vendor || mongoose.model('vendor',vendorSchema)
export default vendorModel