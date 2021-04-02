// class UserData{
//     constructor (id, firstname, lastname, email, password, gender, rule, department, address){
//         this.id=id,
//         this.firstname=firstname,
//         this.lastname=lastname,
//         this.email=email,
//         this.password=password,
//         this.gender=gender,
//         this.rule=rule,
//         this.department=department,
//         this.address=address
//     }
// }
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: [true, "an email is required"],
  },
  password: {
    type: String,
    required: [true, "a password is required"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  rule: {
    type: String,
    enum: ["user", "admin"],
    required: [true, "role required"],
    default: "user",
  },
  department: String,
  address: {
    type: String,
    default: "Rwanda",
  },
});
const userInfo =mongoose.model("user",userSchema);
export default userInfo;
