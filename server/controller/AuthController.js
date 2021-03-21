import bcrypt from 'bcrypt'
import UserData from "../model/UserModel";
import {generateAuthToken} from "../Helpers/token";

const users = [];
class UserController {
  static signup = (req, res) => {
    const id = users.length + 1;
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
    const isEmailExist = users.find((user) => user.email === req.body.email);

    if (isEmailExist) {
      return res.status(409).json({ status:409, error: "email is duplicated" });
    }
    const user = new UserData(
      id,
      firstname,
      lastname,
      email,
      password,
      gender,
      rule,
      department,
      address
    );
    users.push(user);
    const data = users.find((user) => user.email == email);
   
    if (!data) {
      return res.status(417).json({
        status: 417,
        messsage: "account not created",
      });

    }
    else{

      let {password, ...dataWithoutPassword} = data;
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
 
  static signin = (req, res) => {
  
    let {
      email,
      password,
    } = req.body;
    const user = new UserData(
      email,
      password,
    );
    users.push(user);
    const data = users.find((user) => user.email === email);
    const isUserExist = users.find((user) => user.email === email);

    if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {
      
    const token= generateAuthToken({
      id:data.id,
      email:data.email,
      rule:data.rule,
    
    });
    let {password, ...dataWithoutPassword}=data;
    return res.status(200).json({
      
      status: 200,
      messsage: "signin successful",
      token:token,
      data:dataWithoutPassword
    });
      }
  }
  
    
    




}
export default {UserController, users};
