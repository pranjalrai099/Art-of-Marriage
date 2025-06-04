import vendorModel from "../model/vendorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppointmentModel from "../model/AppointmentModel.js"
const changeavailability=async(req,res)=>{
    try {
        const {docId}=req.body
        const docData=await vendorModel.findById(docId)
        await vendorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Avaialibility Change'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const vendorlist=async(req,res)=>{
    try {
        const vendors=await vendorModel.find({}).select(['-password','-email' ])
        res.json({success:true,vendors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API for docttor login
const loginVendor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const vendor=await vendorModel.findOne({email})
        if(!vendor){
            return res.json({success:false,message:'Invalid Credentials'})
        }
        const isMatch=await bcrypt.compare(password, vendor.password)
        if(isMatch){
            const token= jwt.sign({id:vendor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API for doctor appointment
const AppointmentsVendor=async(req,res)=>{
    try {
      const {vendId}=req.body 
      console.log(vendId);  
      const appointments=await AppointmentModel.find({vendId})
      console.log(appointments);
      res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API
const appointmentComplete=async(req,res)=>{
    try {
         const {vendId,appointmentId}=req.body
         const appointmentData=await AppointmentModel.findById(appointmentId)
         if(appointmentData && appointmentData.vendId===vendId){
            await AppointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment Completed'})
         } else{
            return res.json({success:false,message:'Mark Failed..'})
         }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API To cancel appointment
const appointmentCancel=async(req,res)=>{
    try {
         const {docId,appointmentId}=req.body
         const appointmentData=await AppointmentModel.findById(appointmentId)
         if(appointmentData && appointmentData.docId===docId){
            await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment Cancelled'})
         } else{
            return res.json({success:false,message:'Cancelled Failed..'})
         }
         
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// API to get dashboard data for doctor panel
const vendorDashboard=async(req,res)=>{
    try {
        const {docId}=req.body
        const appointments=await AppointmentModel.find({docId})
         let earnings=0;
         appointments.map((item)=>{
            if(item.isCompleted || item.payment){
               earnings+=item.amount
            }
         })
         let patients=[]
         appointments.map((item)=>{
            if(!patients.includes(item.userId)){
    patients.push(item.userId)
            }
         })
         const dashData={
            earnings,
            appointments:appointments.length,
           patients:patients.length,
           latestAppointments:appointments.reverse().slice(0,5)
         }
         res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
// API to get doctor profile to doctor panel
const vendorProfile=async(req,res)=>{
    try {
       const {vendId}=req.body
       const profileData=await vendorModel.findById(vendId).select('-password')
       res.json({success:true,profileData}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// update doctor profile
const updateprofile=async(req,res)=>{
    try {
      const {vendId,fee,address,available} =req.body
       await vendorModel.findByIdAndUpdate(vendId,{fee,address,available})

       res.json({success:true,message:'Profile Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export {vendorlist,changeavailability,loginVendor,AppointmentsVendor,appointmentCancel,appointmentComplete,vendorDashboard,updateprofile,vendorProfile};