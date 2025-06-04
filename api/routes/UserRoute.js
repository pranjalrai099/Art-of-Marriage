import express from 'express'
import { registerUser,loginUser, getProfile,updateUser, BookAppointment, listappointment, cancelAppointment, paymentRazorpay, verifyRazorpay,  GetSellData,  VerifyOtp, verifiedOtp, SellReq, GetPersonalSell } from '../controllers/UserController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
const UserRouter=express.Router()
UserRouter.post('/register',registerUser)
UserRouter.post('/login',loginUser)
UserRouter.get('/get-profile',authUser,getProfile)
UserRouter.post('/update-profile',upload.single('image'),authUser,updateUser)
UserRouter.post('/book-appointment',authUser,BookAppointment)
UserRouter.get('/appointment',authUser,listappointment)
UserRouter.post('/cancel-appointment',authUser,cancelAppointment)
UserRouter.post('/payment-razorpay',authUser,paymentRazorpay)
UserRouter.post('/verify-razorpay',authUser,verifyRazorpay)
UserRouter.post('/sell-user',upload.single('image'),authUser,SellReq)
UserRouter.get('/sell-get',GetSellData)
UserRouter.post('/sell-getbyId',GetPersonalSell);
UserRouter.post('/store-otp',VerifyOtp);
UserRouter.post('/verify-otp',verifiedOtp);
export default UserRouter