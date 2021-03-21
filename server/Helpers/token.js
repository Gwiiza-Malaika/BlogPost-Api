import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'



dotenv.config({path:"../.env"});


export const generateAuthToken= (payload=>{
   const token= jwt.sign({
       payload
   }, 
   process.env.SECRETE_KEY,
   {
       expiresIn: "1d"
   }
   )

   return token;
})
export const DataFromToken=(token=>{
    const data=jwt.verify(
        token
    ,
    process.env.SECRETE_KEY
    );
    return data;
})  