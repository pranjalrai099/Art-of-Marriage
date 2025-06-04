import express from 'express'
import {vendorlist, appointmentCancel, appointmentComplete, updateprofile, loginVendor, AppointmentsVendor, vendorProfile, vendorDashboard } from '../controllers/vendController.js'
import authAdmin from '../middlewares/authadmin.js'
import { updateUser } from '../controllers/UserController.js'
import authVendor from '../middlewares/authVendors.js'

const vendorRouter=express.Router()
vendorRouter.get('/list',vendorlist)
vendorRouter.post('/login',loginVendor)
vendorRouter.get('/appointments',authVendor,AppointmentsVendor)
vendorRouter.post('/complete',authVendor,appointmentComplete)
vendorRouter.post('/cancel',authVendor,appointmentCancel)
vendorRouter.get('/dashboard',authVendor,vendorDashboard)
vendorRouter.get('/profile',authVendor,vendorProfile)
vendorRouter.post('/update',authVendor,updateprofile)
export default vendorRouter