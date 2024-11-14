
 import Comment from '../models/Comment.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new comment
export const createComment = async (req, res, next) => {
    try {
        const { content, userId, postId } = req.body;

        // Check if the user is allowed to create the comment
        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to create this comment!"));
        }

        const newComment = new Comment({ content, postId, userId });
        await newComment.save();

        res.status(201).json(newComment);
        
    } catch (error) {
        return next(error);
    }
};

// Get comments for a specific post
export const getCommentsByPostId = async (req, res, next) => {
    try { 
        const comments = await Comment.find({ postId: req.params.postId }).sort({createdAt:-1})
        res.status(200).json(comments);
    } catch (error) {
        return next(error);
    }
};

// Update a comment
export const updateComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.id);

        // Check if the comment exists and if the user is authorized to update it
        if (!comment) {
            return next(errorHandler(404, "Comment not found!"));
        }
        if (comment.userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to update this comment!"));
        }

        comment.content = content;
        const updatedComment = await comment.save();

        res.status(200).json(updatedComment);
    } catch (error) {
        return next(error);
    }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        // Check if the comment exists and if the user is authorized to delete it
        if (!comment) {
            return next(errorHandler(404, "Comment not found!"));
        }
        if (comment.userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to delete this comment!"));
        }

        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

// Like a comment
export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return next(errorHandler(404, "Comment not found!"));
        }

        if (!comment.likes.includes(req.user.id)) {
            comment.likes.push(req.user.id);
            comment.numberOfLikes += 1;
        } else {
            return next(errorHandler(400, "You already liked this comment!"));
        }

        const updatedComment = await comment.save();
        res.status(200).json(updatedComment);
    } catch (error) {
        return next(error);
    }
};

// Unlike a comment
export const unlikeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return next(errorHandler(404, "Comment not found!"));
        }

        if (comment.likes.includes(req.user.id)) {
            comment.likes = comment.likes.filter((id) => id !== req.user.id);
            comment.numberOfLikes -= 1;
        } else {
            return next(errorHandler(400, "You haven't liked this comment!"));
        }

        const updatedComment = await comment.save();
        res.status(200).json(updatedComment);
    } catch (error) {
        return next(error);
    }
};
