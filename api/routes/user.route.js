import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { updateUser,deleteUser,signout,getUsers,deleteUserbyAdmin,getUserById} from "../controllers/user.controller.js";
const router = express.Router();

router.put('/update/:userId',verifyToken,updateUser);
router.get('/getusers/',verifyToken,getUsers);
router.get('/:userId',getUserById);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.delete('/deleteUserByAdmin/:userId/:adminId',verifyToken,deleteUserbyAdmin);
router.post('/signout',signout);
router.get('/signout',signout);


export default router;