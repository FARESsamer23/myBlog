import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import {createComment,getCommentsByPostId} from "../controllers/comment.controller.js";

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getCommentsByPostId);


export default router;