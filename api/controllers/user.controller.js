import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const updateUser = async (req, res, next) => {
  // check the output from user
  const { email, password, username } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to updated this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username > 20) {
      return next(
        errorHandler(400, "Username must be at between 7  and 20 characters")
      );
    }
    
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be in lowercase"));
    }
    if (req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    return next(errorHandler(500, "Error updating user"));
  }
};



export const deleteUser = async (req, res, next) => {
  
 

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

    try{
      const deletedUser = await User.findByIdAndDelete(req.params.userId)

      res.status(200).json({message:'user are deleted successfully'})

    }catch(error){
      return next(errorHandler(500, "Error deleting user"));
    }


}

export const signout = async (req, res, next) => {
  try{
     res.clearCookie('access-token').status(200).json('user has been signed out');
  }catch(error){
       next(error)
  }

}