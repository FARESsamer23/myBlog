import express from "express"
import { verifyToken } from "../utils/verifyUser";
const router = express.Router();

router.put('/update/:userId',verifyToken,updateUser)

export default router;