import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { updateUser,deleteUser,signout,getUsers} from "../controllers/user.controller.js";
const router = express.Router();

router.put('/update/:userId',verifyToken,updateUser);
router.get('/getusers/',verifyToken,getUsers);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/signout',signout);


export default router;