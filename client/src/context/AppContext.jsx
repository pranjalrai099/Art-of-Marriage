import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

// Create a context for the app
export const AppContext = createContext();

const AppContextProvider = (props) => {
    // Constants and state variables
    const currencySymbol = "$";
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [vendors, setVendors] = useState([]);
   const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false );
    // Context value to provide globally
   const [userdata,setuserdata]=useState(false)
    // Fetch doctors' data from the backend
    const getVendorData = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/apiback/vendor/list`);
            console.log("data",data);
            if (data.success) {
                setVendors(data.vendors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors data:", error);
            toast.error("Network error. Check your backend connection.");
        }
    };
    console.log(vendors);
    const loadUserpROFILE=async()=>{
        try {
            console.log(token);
         const {data}=await axios.get(backendurl+'/apiback/user/get-profile',{headers:{token}})
         console.log(data)
         if(data.success){
           
            setuserdata(data.UserData)
            
         }   else{
            
            toast.error(data.message)
         }
        } catch (error) {
           console.log(error)
           toast.error(error.message) 
        }
    }
    const value = {
        vendors,
        getVendorData,
        currencySymbol,
        token,
        settoken,
        backendurl,
        userdata,
        setuserdata,
        loadUserpROFILE,
    };
    // Fetch data on component mount
    useEffect(() => {
        getVendorData();
    }, []);
    console.log("ven",vendors);
    useEffect(()=>{
    if(token){
        loadUserpROFILE()
    } else{
        setuserdata(false)
    }
    },[token])

    // Render the context provider
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
