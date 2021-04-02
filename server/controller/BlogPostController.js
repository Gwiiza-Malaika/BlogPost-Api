import ContentData from "../model/ContentModel";
const posts=[];
class BlogController{
    static getOneBlog=async (req,res)=>{
        const id=req.params.id
        const data = await ContentData.findById(id);
        
        if(!data){
            return res.status(401).json({
                status:401,
                message:"no post",
                
            });
        } 
        return res.status(201).json({
            status:200,
            message:"successful post",
            data
        })
    }
    static getAllBlogs= async (req,res)=>{
        const data=await ContentData.find();
        return res.status(200).json({
            status:200,
            message:"all posts",
            data
        })
    }
    
    static articles= async(req,res)  => {
        
        let {
          UserId,
          title,
          content,


        } = req.body;

        const timestamp=new Date(Date.now());

        // const blog= new ContentData(UserId,title,content,timestamp,id);
        // posts.push(blog);


        const data=await ContentData.create(req.body);
        if(!data){
            return res.status(47).json({
                status:47,
                message:"blog not registered"
            });
        }
        return res.status(201).json({
            status:201,
            message:"blog successfully registered",
            data
        })
        
    }
    static deleteOneBlog= async (req,res)=>{
        const id=req.params.id;
        const data = await ContentData.findByIdAndDelete(id);
       
        
        if(!data){
           
        return res.status(404).json({
            status:404,
            message:" blogpost failed to delete"

        })
    }
    return res.status(201).json({
        status:201,
        message:"deleted successfully",
        data
    })
  
    }
       static UpdateOneBlog= async (req,res)=>{
        const blogId=req.params.id;
        let {
          title,
          content,
        } = req.body;

        const timestamp=new Date(Date.now());

        const blog=await ContentData.findByIdAndUpdate(blogId,{
            title:title,
          content:content,
        });
     
        
        
        if(!blog){
            return res.status(417).json({
                status:417,
                message:"update failed"
            });
        };

        const dataUpated= await ContentData.findById(blogId)
        return res.status(200).json({
            status:200,
            message:"successfully update",
            data:dataUpated
        })
        
    }
}

export default BlogController;
