
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import sendEmail from "../emailSending/sendEmail.js"
import { PASSWORD_RESET_TEMPLATE } from "../config/emailTemplate.js";



export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        await sendEmail({ 
            email: user.email,
            to: email, 
            subject: "Welcome to MahiBlog!", 
            text: `You have successfully registered with ${user.email}` 
        });    

        return res.status(201).json({ success: true, message: "Registered successfully! A confirmation email has been sent.",token });

    } catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).json({ success: false, message: "Registration failed. Please try again." });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Logged In Successfully!" ,token});

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: "Logged Out Successfully!" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        await sendEmail({
            email: user.email,
            subject: "Password Reset OTP",
            // message: `Your OTP for resetting your pasword is ${otp}. Use this OTP to proceed with resetting your password.`, 
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        });

        // await sendEmail({ 
        //     to: user.email,  // Make sure this is the registered email
        //     subject: "Password Reset OTP", 
        //     html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email) 
        // });  
        console.log(`Sending OTP ${otp} to ${user.email}`);      

        console.log("Sending email to:", user.email);
        console.log("OTP:", otp);
        
        return res.json({success:true,message:"OTP sent to your email"});

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

/////////////////////////////////

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.json({ success: false, message: "Email and OTP are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOtp !== String(otp)) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        return res.json({ success: true, message: "OTP verified successfully!" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



// Reset Your Password

export const resetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"Email,OTP,new password are required"})
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        if (user.resetOtp === "" || user.resetOtp !== String(otp)) {
            return res.json({ success: false, message: "Invalid OTP" });
        }        

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        user.resetOtp="";
        user.resetOtpExpireAt=0;

        await user.save();

        return res.json({success:true,message:"Password has been reset successfully"})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
