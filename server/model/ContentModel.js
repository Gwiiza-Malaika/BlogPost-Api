// class ContentData{
//     constructor(UserId,title,content,timestamp,id){
//         this.UserId=UserId,
//         this.title=title,
//         this.content=content,
//         this.timestamp=timestamp,
//         this.id=id
//     }
// }
// export  default ContentData;
import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  UserId:{
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:[true,"User is required"],
  },
  
  title: {
    type: String,
    required: [true, "a title is required"],
  },
  content: {
    type: String,
    required: [true, "a password is required"],
  },
  timestamp:{
    type:String
  }
  
});
blogSchema.pre(/^find/,function(next){
  this.populate({
    path:"UserId",
    select:"firstname email"
  })
  next();
});
const blogInfo =mongoose.model("blog",blogSchema);
export default blogInfo;
