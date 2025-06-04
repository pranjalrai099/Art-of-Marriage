import express from 'express'
import { addVendor,admindashboard,allVendors,appointmentAdmin,cancelAppointmentAdmin,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authadmin.js'
import { changeavailability } from '../controllers/vendController.js'
import { cancelAppointment } from '../controllers/UserController.js'

const adminRouter=express.Router()
adminRouter.post('/add-vendors',authAdmin,upload.single('image'),addVendor)
adminRouter.post('/login' ,loginAdmin)
adminRouter.post('/all-vendors',authAdmin ,allVendors)
adminRouter.post('/change-availability',authAdmin,changeavailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/admincancel',authAdmin,cancelAppointmentAdmin)
adminRouter.get('/dashboard',authAdmin,admindashboard)
export default adminRouter