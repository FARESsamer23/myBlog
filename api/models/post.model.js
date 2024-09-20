import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId :{
        type : String,
        required : true,
    }, 
    title :{
        type : String,
        required : true,
        unique:true
    }, 

    content:{
        type : String,
        required : true,
       
    },
    image:{
        type : String,
        default: "https://page.clicktrue.biz/hubfs/ct-seo-copywriting.jpg",
    },
     category:{
            type:String,
            default:'uncategorized'
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
      
},{timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;