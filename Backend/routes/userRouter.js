import express from "express"
import { login, register, resetPassword, sendResetOtp, verifyOtp } from "../controllers/userController.js"
import sendEmail from "../emailSending/sendEmail.js";

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/sendmail",sendEmail);
userRouter.post('/send-reset-otp', sendResetOtp);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/verify-otp', verifyOtp);

export default userRouter;

