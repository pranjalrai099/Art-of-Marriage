import jwt from'jsonwebtoken'
// doctor authentication middleware
const authVendor=async(req,res,next)=>{
     
try{
   const {dtoken}=req.headers
   if(!dtoken){
    return res.json({success:false,message:"Not Authorized Login"})
   }
   const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET)
   req.body.vendId=token_decode.id
   
 next()
}
catch{
    console.log(error)
    res.json({success:false,message:error.message})
}
}
export default authVendor