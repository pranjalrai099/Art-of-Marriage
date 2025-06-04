import mongoose from "mongoose";
const AppointmentSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    vendId:{type:String,required:true},
    slotDate:{type:String,required:true},
    slotTime:{type:String,required:true},
    userData:{type:Object,required:true},
    vendData:{type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false}
})
const AppointmentModel=mongoose.models.appointment ||  mongoose.model('appointment',AppointmentSchema)
export default AppointmentModel