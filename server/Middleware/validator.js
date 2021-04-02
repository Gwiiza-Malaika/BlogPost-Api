import {check, validationResult} from "express-validator";
import ContentData from '../model/ContentModel'
class Validator{
 static newAccountRule(){
 return [check("email","your email is invalid").isEmail(), 
         check("firstname","your name must be valid").isAlpha(),
         check("password","password is weak").isStrongPassword(),
         check("gender","gender should be male or female").isIn(["male","female"])]};


static newSigninRule(){
          return [check("email","your email is invalid").isEmail(), 
                  check("password","password is weak").isStrongPassword()]};
static VerifyAccess= async(req,res,next)=>{
  const userIdFromToken=req.body.UserId;
  const idFromParam=req.params.id;
  
  const blog= await ContentData.findById(idFromParam);
if (!blog){
  return res.status(404).json({
    status:404,
    message:"blog not exist"
  })
}
else if (userIdFromToken == blog.UserId._id){
  return next();
}
return res.status(402).json({
  status:401,
  message:"you are not authorized "
})
}
static newBlogRule(){
  return [check("Title","this field is required").isLength({max:50}), 
          check("content","this field is required").isLength({max:200})]};
static ValidateInput=(req,res,next)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        const errorMessage=errors.errors.map(e=>e.msg);
        return res.status(400).json({
         status:400,
         error:errorMessage

        })
    };
    return next();
  }
}


export default Validator;