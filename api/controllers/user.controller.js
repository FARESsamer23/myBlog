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

export const deleteUserbyAdmin = async (req, res, next) => {
  try {
    // Check if the current user is an admin
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to delete users"));
    }

    // Check if the adminId matches the one making the request (for extra security)
    if (req.user.id !== req.params.adminId) {
      return next(errorHandler(403, "Admin ID mismatch"));
    }

    // Delete the user by userId
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Respond with success if the user was deleted
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, "Error deleting user"));
  }
};

export const signout = async (req, res, next) => {
  try{
     res.clearCookie('access-token').status(200).json('user has been signed out');
  }catch(error){
       next(error)
  }

}



export const getUsers = async (req, res, next) => {
  // Only admins can fetch the users list
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to access this resource"));
  }

  try {
    // Pagination parameters
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === 'asc' ? 1 :-1;

    // Optional search filters for email or username
    const searchQuery = {};
    if (req.query.email) {
      searchQuery.email = { $regex: req.query.email, $options: "i" };
    }
    if (req.query.username) {
      searchQuery.username = { $regex: req.query.username, $options: "i" };
    }

    // Fetch the users from the database with optional filtering and pagination
    const users = await User.find(searchQuery).sort({createdAt:sortDirection})
      .skip(startIndex)
      .limit(limit);

    // Total users count (for pagination purposes)
    const totalUsers = await User.countDocuments(searchQuery);

    const now = new Date();
    const oneMonthAgo = new Date(
       now.getFullYear(),
       now.getMonth() - 1,
       now.getDate()
    )
    const lastMonthUsers = await User.countDocuments({
       createdAt: { $gte: oneMonthAgo },
    });
    // Send response (excluding passwords)
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    });

    res.status(200).json({ users: usersWithoutPasswords, lastMonthUsers ,totalUsers });
  } catch (error) {
    return next(errorHandler(500, "Error fetching users"));
  }
}; 

export const getUserById = async (req, res, next) => {
  try {
    // Fetch the user from the database by ID
    const user = await User.findById(req.params.userId);
    
    // Check if the user exists
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Exclude the password from the response
    const { password, ...userWithoutPassword } = user._doc;

    // Send response with the user data
    res.status(200).json({ user: userWithoutPassword });
    
  } catch (error) {
    return next(errorHandler(500, "Error fetching user"));
  }
};
