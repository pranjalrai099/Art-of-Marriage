import validator from "validator"
import bcrypt from 'bcrypt'
import UserModel from "../model/UserModel.js"
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../model/vendorModel.js"
import AppointmentModel from "../model/AppointmentModel.js"
import SellModel from "../model/SellModel.js"
import {sendAppointmentMail,CancelAppointmentMail,sendOtpMail} from "../middlewares/Mailer.js"
import razorpay from 'razorpay'
import vendorModel from "../model/vendorModel.js"
// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }

        if (password.length < 3) {
            return res.json({ success: false, message: "Enter a Strong Password." });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedpassword,
            isVerified: false,
        });

        await newUser.save();

        // Send OTP Mail
        await sendOtpMail(email);

        res.json({ success: true, otpSent: true, email });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }

        // Send OTP for login verification
        await sendOtpMail(email);

        res.json({ success: true, otpSent: true, email });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user details
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const UserData = await UserModel.findById(userId).select('-password')
        res.json({ success: true, UserData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
const updateUser = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ succes: false, message: "Data missing" })
        }
        await UserModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if(imageFile){
            // upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url
            await UserModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:'Profile Updated'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const BookAppointment = async (req, res) => {
  try {
    const { userId, vendId, slotDate, slotTime } = req.body;
    const vendData = await vendorModel.findById(vendId).select('-password');
    if (!vendData.available) {
      return res.json({ success: false, message: "Vendor Not Available" });
    }

    let slot_booked = vendData.slot_booked;

    // Check for slot availability
    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      slot_booked[slotDate] = [slotTime];
    }

    const userData = await UserModel.findById(userId).select('-password');
    delete vendData.slot_booked;

    const appointmentData = {
      userId,
      vendId,
      userData,
      vendData,
      amount: vendData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();

    // Save updated slots
    await vendorModel.findByIdAndUpdate(vendId, { slot_booked });

    // ✉️ Send mail
    await sendAppointmentMail(userData.email, vendData.name, slotDate, slotTime);

    res.json({ success: true, message: 'Your Appointment Booked..' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointment
const listappointment = async (req, res) => {
    try {
        const { userId } = req.body; // Extracted from token middleware
        const appointments = await AppointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API To cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Fetch appointment data
        const appointmentData = await AppointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }
        
        // Verify the user ID matches
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        // Update appointment as cancelled
        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        if (!doctorData) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        let slot_booked = doctorData.slot_booked;

        // Check if the slot date exists and remove the slot time
        if (slot_booked[slotDate]) {
            slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime);
        }
        // Update doctor data
        const userData = await UserModel.findById(userId).select('-password');
        await doctorModel.findByIdAndUpdate(docId, { slot_booked });
        await CancelAppointmentMail(userData.email, doctorData.name, slotDate, slotTime);
        res.json({ success: true, message: 'Appointment cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API FOR PAYMENT RAZORPAY
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorpay=async(req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await AppointmentModel.findById(appointmentId)
        if(!appointmentData || appointmentData.cancelled){
          return res.json({success:false,message:'Appointment canceeled or not found'})
        }
        // create option for payment
        const option={
          amount:appointmentData.amount*100,
          currency:process.env.CURRENCY,
          receipt:appointmentId,
        }
        // creation of an order
        const order = await razorpayInstance.orders.create(option)
        res.json({success:true,order}) 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API to verify payment
const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
  
      // Validate request
      if (!razorpay_order_id) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
  
      // Fetch order details from Razorpay
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
      if (!orderInfo) {
        return res.status(404).json({ success: false, message: "Order not found." });
      }
  
      // Check if payment is successful
      if (orderInfo.status === 'paid') {
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
          orderInfo.receipt, // Ensure `receipt` is the Appointment ID
          { payment: true },
          { new: true } // Return the updated document
        );
  
        if (!updatedAppointment) {
          return res.status(404).json({ success: false, message: "Appointment not found." });
        }
  
        return res.json({ success: true, message: "Payment Successful" });
      } else {
        return res.json({ success: false, message: "Payment not completed yet." });
      }
    } catch (error) {
      console.error("Error in verifyRazorpay:", error.message);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
  const SellReq = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, age, gender, Itemtype, ItemName, description,upiid } = req.body;
        const imageFile = req.file;
        console.log(req.body);

        // Validate required fields
        if (!firstname || !lastname || !email || !phone || !age || !gender || !Itemtype || !upiid) {
            return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate age as a number
        if (isNaN(age) || age < 1) {
            return res.status(400).json({ success: false, message: "Invalid age" });
        }
        
        let imageUrl = "";
        if (imageFile) {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = imageUpload.secure_url;
        }
        
        // Create new donation request
        const newSell = new SellModel({
            firstname,
            lastname,
            email,
            phone,
            age,
            gender,
            Itemtype,
            ItemName,
            image: imageUrl,
            description,
            upiid
        });

        // Save to database
        await newSell.save();

        res.status(201).json({ success: true, message: "Sell request submitted successfully", sell: newSell });
    } catch (error) {
        console.error("Error in SellReq:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
const GetSellData = async (req, res) => {
    try {
        const sells = await SellModel.find().sort({ createdAt: -1 });
        res.json({ success: true, sells });
    } catch (error) {
        console.error("Error in GetSellData:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
const GetPersonalSell=async(req,res)=>{
    try {
        const { sellId } = req.body;
        const sell =await SellModel.findById(sellId);
        if (!sell) {
            return res.status(404).json({ message: 'sell not found' });
        }

        res.json(sell);
    } catch (error) {
        console.error('Error fetching sell:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// backend/routes/user.js

const VerifyOtp= async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity
  
      await user.save();
  
      res.json({ success: true, message: "OTP stored" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
const verifiedOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log(email)
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  console.log("otp",user.otp);
      if (user.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // Optional: Check expiry
      if (user.otpExpires && user.otpExpires < new Date()) {
        return res.status(400).json({ success: false, message: 'OTP expired' });
      }
  
      user.otp = null; // Clear OTP
      user.otpExpires = null;
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
       
      res.status(200).json({ success: true, message: 'OTP Verified', token });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
export { registerUser, loginUser, getProfile,updateUser,BookAppointment,listappointment,cancelAppointment,paymentRazorpay,verifyRazorpay,SellReq,GetSellData,GetPersonalSell,VerifyOtp,verifiedOtp }