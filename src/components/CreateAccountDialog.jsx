import React, { useState, useEffect } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { GoogleG, ProfilePicSmall } from "../assets/SvgICons";
import { MdOutlineError } from "react-icons/md";
import amazonlogo from '../assets/amazon-logo.svg';
import applelogo from '../assets/apple-logo.svg';
import fblogo from '../assets/fb-white-logo.svg';
import googlelogo from '../assets/google-logo.svg';
import gsklogo from '../assets/gsk-logo.svg';
import pwclogo from '../assets/pwc-logo.svg';
import sainsburylogo from '../assets/sainsbury-logo.svg';
import { useNavigate } from "react-router-dom";

const CreateAccountDialog = ({ onClose }) => {
    const [showDialog, setShowDialog] = useState(true); // controls overall dialog visibility
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const [touchedFields, setTouchedFields] = useState({});
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const naviagte = useNavigate();
    const handleChange = (field, value) => {
        if (field === "password" && value.length > 16) {
            value = value.slice(0, 16);
        }
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
        setFocusedField(null);
    };

    const handleFocus = (field) => {
        setFocusedField(field);
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleContinue = () => {
        let newErrors = {};

        if (!formValues.email.trim()) {
            newErrors.email = "Please enter your email address";
        } else if (!validateEmail(formValues.email)) {
            newErrors.email = "Please use the correct format for your email address";
        }

        if (!formValues.password.trim()) {
            newErrors.password = "Please enter your password";
        } else if (formValues.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        setTouchedFields({ email: true, password: true });

        if (Object.keys(newErrors).length === 0) {
            console.log("Form is valid. Proceed...");
        }
    };

    // Handle ESC key to close the entire CreateAccountDialog
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowDialog(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    // Lock scroll while dialog is open, unlock when closed
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    // If dialog is hidden, render nothing
    if (!showDialog) return null;

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40"
                onClick={() => setShowDialog(false)}
                aria-hidden="true"
            />

            {/* Dialog Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-6 overflow-auto">
                <div className="flex w-[1100px] bg-white shadow-lg rounded-2xl mx-auto my-10 relative z-50">
                    {/* Left Section */}
                    <div className="w-[400px] bg-createAccountLeft flex flex-col items-center py-8 px-6 relative min-h-[600px]">
                        <p className="text-[1.2rem] font-bold mb-6 text-center text-white">
                            Our customers were hired by:
                        </p>
                        {/* Logos container */}
                        <div className="flex flex-wrap gap-6 w-full mb-8">
                            {/* First row */}
                            <div className="flex gap-6 mb-4">
                                <img src={amazonlogo} alt="Amazon" className="w-24 h-50" />
                                <img src={pwclogo} alt="PWC" className="w-16 h-16" />
                                <img src={applelogo} alt="Apple" className="w-10 h-30" />
                            </div>
                            {/* Second row */}
                            <div className="flex justify-start gap-6 mb-2">
                                <img src={sainsburylogo} alt="Sainsbury" className="w-40 h-25" />
                                <img src={gsklogo} alt="GSK" className="w-12 h-13" />
                            </div>
                            {/* Third row */}
                            <div className="flex justify-start">
                                <img src={googlelogo} alt="Google" className="w-32 h-50" />
                            </div>
                        </div>

                        {/* Privacy dialog box positioned at bottom */}
                        <div
                            className="border  round-md bg-createAccountLeft bg-opacity-90 text-white p-4 rounded-lg shadow-md text-center text-sm mt-auto"
                            style={{ userSelect: "none" }}
                        >
                            <p className="font-semibold mb-1">Your privacy is important to us!</p>
                            <p>
                                By sharing your email address with us, you agree to subscribe from transactional and promotional emails by logging into your account after completing the registration process or by clicking the link in the email.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-[700px] px-8 pb-[25px] pt-8 flex flex-col">
                        {/* Heading */}
                        <h2 className="text-2xl font-semibold mb-6">
                            Create an account to continue.
                        </h2>

                        {/* Email Field */}
                        <label
                            htmlFor="email"
                            className={`block mb-2 text-sm font-bold font-poppins transition-colors duration-300 ${errors.email
                                ? "text-errorColor"
                                : focusedField === "email"
                                    ? "text-alreadyHaveAccount"
                                    : "text-black"
                                }`}
                        >
                            Email Address
                        </label>
                        <div className="relative mb-2">
                            {/* Profile Icon inside input */}
                            <div className="rounded-full border border-gray-300 p-[12px] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ProfilePicSmall />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={formValues.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                onFocus={() => handleFocus("email")}
                                placeholder="calldan.smith@hotmail.co.uk"
                                className={`custom-input w-full pl-16 pr-10 border-b-2 transition-colors duration-300 focus:border-alreadyHaveAccount outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                style={{
                                    height: "90px",
                                    fontSize: "1.125rem",
                                    paddingLeft: "6rem",
                                }}
                            />
                            {errors.email && (
                                <span className="absolute text-[1.3rem] right-3 top-1/2 -translate-y-1/2 text-errorColor">
                                    <MdOutlineError />
                                </span>
                            )}
                        </div>
                        {errors.email && (
                            <p className="text-sm font-bold text-errorColor mb-2">{errors.email}</p>
                        )}

                        {/* Password Field */}
                        <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-bold font-poppins transition-colors duration-300 ${errors.password
                                ? "text-errorColor"
                                : focusedField === "password"
                                    ? "text-alreadyHaveAccount"
                                    : "text-black"
                                }`}
                        >
                            Password
                        </label>
                        <div className="relative flex items-center mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={formValues.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                onBlur={() => handleBlur("password")}
                                onFocus={() => handleFocus("password")}
                                className="custom-input w-full"
                                style={{ padding: 14 }}
                            />
                            {/* Eye icon */}
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                            </span>

                            {/* Error icon to the right of eye icon */}
                            {errors.password && (
                                <span className="absolute right-3 text-[1.3rem] top-1/2 -translate-y-1/2 text-errorColor">
                                    <MdOutlineError />
                                </span>
                            )}
                        </div>
                        {errors.password && (
                            <p className="text-sm font-bold text-errorColor mb-4">{errors.password}</p>
                        )}

                        {/* Continue Button */}
                        <button
                            onClick={handleContinue}
                            className="w-full mt-4 px-6 py-4 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-full border border-transparent hover:bg-btnColorHover transition-colors duration-300 flex items-center justify-center gap-3"
                        >
                            Continue
                        </button>

                        {/* Skip Button */}
                        <button
                            className="w-full font-poppins font-bold text-black py-4 rounded-full border-2 border-black mt-3 transition-colors duration-300 hover:bg-gray-100"
                            onClick={() => naviagte("/build-cv/tips/expr")}
                        >
                            Skip for now
                        </button>

                        {/* Already Have Account */}
                        <button className="text-alreadyHaveAccount text-[1.7rem] font-bold underline my-10">
                            Already have an account?
                        </button>

                        {/* Divider */}
                        <div className="flex items-center mb-6">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Continue with Google */}
                        <button className="w-full border border-gray-300 py-2 text-[1.5rem] font-bold rounded-2xl mb-3 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-3">
                            <GoogleG />
                            Continue with Google
                        </button>

                        {/* Continue with Facebook */}
                        <button className="w-full text-[1.5rem] text-white bg-facebookBtn font-bold border border-gray-300 py-2 rounded-2xl hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <img src={fblogo} alt="Facebook" className="w-7 h-7 object-contain" />
                            Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateAccountDialog;