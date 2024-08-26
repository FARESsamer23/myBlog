import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
    }, 
    email:{
        type : String,
        required : true,
        unique:true
    },
    password:{
        type : String,
        required : true,

    },
    profilePicture:{
        type : String,
        default: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;