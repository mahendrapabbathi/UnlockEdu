
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./Reset_Password.css"
import { Eye, EyeOff } from "lucide-react";

const Reset_Password = () => {

    const {url} = useContext(StoreContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isEmailSent, setIsEmailSent] = useState("")
    const [otp, setOtp] = useState(0)
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
    const [loading,setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const inputRefs = React.useRef([]);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }

    const onSubmitEmail = async (e)=>{
        e.preventDefault();
        setLoading(true)

        try {
            const {data} = await axios.post(`${url}/api/user/send-reset-otp`,{email})
            data.success? toast.success(data.message):toast.error(data.message)

            data.success && setIsEmailSent(true)

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    // const onSubmitOTP = async(e)=>{
    //     e.preventDefault();
    //     const otpArray = inputRefs.current.map(e=>e.value);
    //     setOtp(otpArray.join(''));
    //     setIsOtpSubmitted(true)
    // }


    const onSubmitOTP = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        const otpArray = inputRefs.current.map(input => input?.value || '');
        const enteredOtp = otpArray.join('');
    
        try {
            const { data } = await axios.post(`${url}/api/user/verify-otp`, { email, otp: enteredOtp });
    
            if (data.success) {
                toast.success("OTP verified successfully!");
                setOtp(enteredOtp);  // Store OTP only if it's valid
                setIsOtpSubmitted(true);
            } else {
                toast.error("Invalid OTP, please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error verifying OTP");
        } finally{
            setLoading(false)
        }
    };
    

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        try {
            const { data } = await axios.post(`${url}/api/user/reset-password`, { email, otp, newPassword });
    
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error resetting password");
        } finally{
            setLoading(false)
        }
    };
    

    return (
        <div className='form-container'>
            {!isEmailSent &&
                <form onSubmit={onSubmitEmail}>
                    <h1>Reset Password</h1>
                    <p>Enter your registered address</p>
                    <div>
                        {/* <img src="" alt="" /> */}
                        <input className='input' type="email" placeholder='Email id' value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button type='submit' className={loading ? "loading" : ""} disabled={loading}>{loading?"Submitting...":"Submit"}</button>
                </form>
            }

            {/* otp input form */}
            { !isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitOTP}>
                    <h1>Reset password OTP</h1>
                    <p>Enter the 6-digit code sent to email id.</p>
                    <div className='otp-input' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type="text" maxLength="1" key={index} required ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
                        ))}
                    </div>
                    <button type='submit' className={loading ? "loading" : ""} disabled={loading}>{loading?"Submitting...":"Submit"}</button>
                </form>
            }

            {/* enter new password */}

            {isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitNewPassword}>
                    <h1>New Password</h1>
                    <p>Enter the new password below</p>
                    <div>
                        {/* <img src="" alt="" /> */}
                        <input className='input' type={showPassword ? "text" : "password"} placeholder='Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>

                    <button type='submit' className={loading ? "loading" : ""} disabled={loading}>{loading?"Submitting...":"Submit"}</button>
                </form>
            }
        </div>
    )
}

export default Reset_Password
