import {DataFromToken} from '../Helpers/token'
import UserController from'../controller/AuthController'
export const VerifyAuth=(req,res,next) =>{
    const token= req.header("x-auth-token");
    

if(!token){
    return res.status(404).json({
        status:404,
        message:"no token provided"
    });
  }


try{
    const user= DataFromToken(token).payload;

    const users= UserController.UserData ;
    const data=users.find({email:user.email})
    if(!data){
        return res.status(404).json({
            status:404,
            message:"you are not a user"
        }) 
       }
       req.body.UserId=user.id;
       return next();
}catch(error){
    

    return res.status(404).json({
        status:404,
        message:"invalid token"
    }) 
}
};