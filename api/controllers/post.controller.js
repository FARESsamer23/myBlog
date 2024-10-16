import Post from '../models/post.model.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';


export const create = async (req, res, next) => {
   if (!req.user.isAdmin) {
      return next(errorHandler(403, ' you are not allowed to create a post'))
   }
   if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'title and content are required'))
   }
   const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');

   const newPost = new Post({
      ...req.body, slug, userId: req.user.id
   })
   try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost)

   } catch (error) {
      return next(error)
   }

}




export const getposts = async (req, res, next) => {

   try {

      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const posts = await Post.find({
         ...(req.query.userId && { userId: req.query.userId }),
         ...(req.query.category && { category: req.query.category }),
         ...(req.query.slug && { slug: req.query.slug }),
         ...(req.query.postId && { _id: req.query.postId }),
         ...(req.query.searchTerm && {
            $or: [
               { title: { $regex: req.query.searchTerm, $options: 'i' } },
               { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ]
         })
      }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit)
      const totalPosts = await Post.countDocuments();

      const now = new Date();
      const oneMonthAgo = new Date(
         now.getFullYear(),
         now.getMonth() - 1,
         now.getDate()
      )
      const lastMonthPosts = await Post.countDocuments({
         createdAt: { $gte: oneMonthAgo },
      });

      res.status(200).json({ posts, lastMonthPosts, totalPosts })

   } catch (error) {
      return next(error)
   } 
}



export const deletepost = async (req, res, next) => {

   if (req.user.id !== req.params.userId || !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to delete this user"));
   }

   try {
      const { postId } = req.params;


      await Post.findByIdAndDelete(postId);


      // Respond with a success message
      res.status(200).json({ message: "Post deleted successfully" });


   } catch (error) {
      return next(error)
   }
}


export const updatePost = async (req, res, next) => {
   const { postId,userId } = req.params;
 
   // Ensure user is authorized to update the post
   if (req.user.id !== userId && !req.user.isAdmin) {
     return next(errorHandler(403, 'You are not allowed to update this post.'));
   }
 
   // Validate required fields
   if (!req.body.title || !req.body.content) {
     return next(errorHandler(400, 'Title and content are required.'));
   }
 
   // Generate slug from the title
   const slug = req.body.title
     .split(' ')
     .join('-')
     .toLowerCase()
     .replace(/[^a-zA-Z0-9-]/g, '-');
 
   try {
     // Update the post with new data
     const updatedPost = await Post.findByIdAndUpdate(
       postId,
       {
         ...req.body,
         slug, // update the slug
         updatedAt: new Date(),
       },
       { new: true } // Return the updated document
     );
 
     // If post not found, return an error
     if (!updatedPost) {
       return next(errorHandler(404, 'Post not found.'));
     }
 
     res.status(200).json(updatedPost); // Return the updated post
   } catch (error) {
     return next(error);
   }
 };