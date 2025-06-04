import axios from 'axios'
import { createContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify'
export const AdminContext=createContext()
const AdminContextProvider=(props)=>{
    const [atoken,setatoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [vendors,setvendors]=useState([])
    const [appointments,setappointments]=useState([])
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [dashdata,setdashdata]=useState(false)
    const getallVendors = async () => {
        try {
            const { data } = await axios.post(
                backendurl + "/apiback/admin/all-vendors",
                {},
                {headers:{atoken}} 
            );
            
            console.log("fd",data);
    
            if (data.success) {
                setvendors(data.vendors); 
               
                console.log("vendors fetched successfully");
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            console.error("Error fetching vendors:", error);
            toast.error(`Error: ${error.message}`); // Handle any error during the request
        }
    };

    const changeavailability=async(docId)=>{
        try {
         const {data}=await axios.post(backendurl+'/apiback/admin/change-availability',{docId},{headers:{atoken}}) 
         if(data.success){
            toast.success(data.message)
            getallVendors()
         }  
         else{
         toast.error(data.message)
         }
        } catch (error) {
          console.log(error);
          toast.error('An Error occured..')  
        }
    }
 const getallappointments=async()=>{
    try {
       const {data}=await axios.get(backendurl+'/apiback/admin/appointments',{headers:{atoken}}) 
       
       if(data){
        console.log(data);
           setappointments(data)
         

        } else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..')
    }
 }
 const cancelappointment=async(appointmentId)=>{
    try {
       const {data}=await axios.post(backendurl+'/apiback/admin/admincancel',{appointmentId},{headers:{atoken}}) 
       if(data.success){
        toast.success(data.message)
        getallappointments()
       } else{
        toast.error(data.message)
       }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..') 
    }
 }
  const getdashdata=async()=>{
    try {
        const {data}=await axios.get(backendurl+'/apiback/admin/dashboard',{headers:{atoken}})
       
        if(data.success){
            setdashdata(data.dashBoard)
          
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error('An Error occured..') 
    }
  }
  console.log(dashdata)
   const value={
       atoken,setatoken,
       backendurl,
       getallVendors, changeavailability, 
       appointments,setappointments,getallappointments,
       vendors,
       cancelappointment,
       dashdata,getdashdata
   }  
return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
)
}
export default AdminContextProvider