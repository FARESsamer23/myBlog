import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { create ,getposts ,deletepost} from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create-post',verifyToken,create);
router.get('/getposts',getposts);
router.delete('/delete-post/:postId/:userId',verifyToken,deletepost);

export default router;