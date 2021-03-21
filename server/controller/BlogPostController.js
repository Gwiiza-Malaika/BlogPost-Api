import ContentData from "../model/ContentModel";
const posts=[];
class BlogController{
    static getOneBlog=(req,res)=>{
        const blogId=req.params.id;
        const data = posts.find(blog =>blog.id===parseInt(blogId));
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
    static getAllBlogs=(req,res)=>{
        const data=posts;
        return res.status(200).json({
            status:200,
            message:"all posts",
            data
        })
    }
    
    static articles=(req,res)  => {
        const id = posts.length + 1;
        let {
          UserId,
          title,
          content,


        } = req.body;

        const timestamp=new Date(Date.now());

        const blog= new ContentData(UserId,title,content,timestamp,id);
        posts.push(blog);

        const data=posts.find((blog)=> blog.id==id);
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
    static deleteOneBlog=(req,res)=>{
        const id=req.params.id;
        const data = posts.find(blog =>blog.id===parseInt(id));
       
        const index = posts.indexOf(data);
        console.log(index);
        if(index>-1){
            posts.splice(index, 1)
            ;
        return res.status(201).json({
            status:201,
            message:"deleted successfully",

        })
    }
    return res.status(404).json({
        status:404,
        message:" blogpost not found"
    })
  
       }
       static UpdateOneBlog=(req,res)=>{
        const blogId=req.params.id;
        let {
          UserId,
          title,
          content,
        } = req.body;

        const timestamp=new Date(Date.now());

        const blog= new ContentData(UserId,title,content,timestamp,parseInt(blogId));
     const isDataExist= posts.find((blog)=> blog.id===parseInt(blogId));

        
        if(!isDataExist){
            return res.status(417).json({
                status:417,
                message:"update failed"
            });
        }


        const index= posts.indexOf(isDataExist);
        const data=posts.splice(index,1,blog);


        return res.status(201).json({
            status:201,
            message:"updated successfully",
            data
        })
        
    
    }

   }

export default BlogController;
