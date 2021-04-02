import bcrypt from 'bcrypt'
import UserData from "../model/UserModel";
import {generateAuthToken} from "../Helpers/token";

// const users = [];
class UserController {
  static signup = async(req, res) => {
    // const id = users.length + 1;
    let {
      firstname,
      lastname,
      email,
      password,
      gender,
      rule,
      department,
      address,
    } = req.body;
    password=bcrypt.hashSync(password,10)
  
    // const isEmailExist = users.find((user) => user.email === req.body.email);
    const isEmailExist=await UserData.findOne({
      email:email,
    })
    if (isEmailExist) {
      return res.status(409).json({ status:409, error: "email is duplicated" });
    }

    req.body.password =password;
    const data = await UserData.create(req.body);
  
   
   
    if (!data) {
      return res.status(417).json({
        status: 417,
        messsage: "account not created",
      });

    }
    else{

      let {password, ...dataWithoutPassword} = data._doc;
      return res.status(201).json({
        status:201,
        message:"account successfully created",
        data:dataWithoutPassword
      })
    }

  };
  // const user = new UserData(
  //   id,
  //   email,
  //   password,
  // );
 
  static signin =async (req, res) => {
  
    let {
      email,
      password,
    } = req.body;
    
    const isUserExit = await UserData.findOne({email:email});
       
    if (isUserExit && bcrypt.compareSync(password, isUserExit.password)) {
      const data=isUserExit;
      const token= generateAuthToken({
      id:data.id,
      email:data.email,
      rule:data.rule,
    
    });
    
      
    let {password, ...dataWithoutPassword}=data._doc;
    return res.status(200).json({
     
      status: 200,
      messsage: "signin successful",
      token:token,
      data:dataWithoutPassword
        })
    
      }
    return res.status(401).json({
      status:401,
      message:"log in failed"
    })
  }
  
}  
    
    





export default {UserController,UserData};
