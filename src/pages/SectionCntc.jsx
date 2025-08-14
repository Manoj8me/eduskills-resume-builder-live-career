import { useState, useEffect, useRef } from "react";
import { ProfilePic } from "../assets/SvgICons";
import { FaCheck, FaTimes } from "react-icons/fa";
import "../styles/SectionCntc.css";
import { useNavigate } from "react-router-dom";
import DefaultTemplate from "../components/DefaultTemplate";
import CreateAccountDialog from "../components/CreateAccountDialog"; // <-- Import your dialog

const SectionCntc = () => {
    const [formValues, setFormValues] = useState({
        firstname: "",
        surname: "",
        city: "",
        country: "",
        pincode: "",
        phone: "",
        email: ""
    });

    const [touchedFields, setTouchedFields] = useState({});
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [showDialog, setShowDialog] = useState(false); // <-- Modal state

    const navigate = useNavigate();
    const firstNameRef = useRef(null);

    useEffect(() => {
        if (firstNameRef.current) firstNameRef.current.focus();
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && firstNameRef.current) {
                firstNameRef.current.focus();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleChange = (field, value) => {
        if (field === "phone") value = value.replace(/[^0-9]/g, "");
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
        if (field === "email") {
            if (!formValues.email.trim()) {
                setEmailError(true);
                setEmailErrorMsg("Please enter your email address");
            } else if (!validateEmail(formValues.email)) {
                setEmailError(true);
                setEmailErrorMsg("Please use the correct format for your email address");
            } else {
                setEmailError(false);
                setEmailErrorMsg("");
            }
        }
    };

    const handleFocus = (field) => {
        if (field === "email") {
            setEmailError(false);
            setEmailErrorMsg("");
        }
    };

    const handleContinue = () => {
        if (!formValues.email.trim()) {
            setEmailError(true);
            setEmailErrorMsg("Please enter your email address");
        } else if (!validateEmail(formValues.email)) {
            setEmailError(true);
            setEmailErrorMsg("Please use the correct format for your email address");
        } else {
            setEmailError(false);
            setEmailErrorMsg("");
            setShowDialog(true); // <-- Open modal if valid
        }
    };

    const isFieldValid = (field) => {
        if (!touchedFields[field]) return false;
        if (field === "email") return validateEmail(formValues.email);
        return formValues[field].trim().length > 0;
    };

    return (
        <>
            <div className="flex justify-between">
                {/* Left Form */}
                <div className="bg-white pt-8 pl-10" style={{ width: "667.67px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "100%", maxWidth: "750px" }}>
                        <h1 className="text-3xl font-bold mb-8">
                            How do you want recruiters to contact you?
                        </h1>

                        <div className="flex gap-6 mb-6">
                            <div className="flex flex-col items-center">
                                <div className="rounded-full border border-gray-300 p-[12px] flex items-center justify-center">
                                    <ProfilePic />
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 rounded-2xl border bg-photoUpload border-gray-400 hover:bg-photoUploadHover transition px-4 py-2 whitespace-nowrap"
                                >
                                    Photo Upload
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-start">
                                <p className="mb-4 text-gray-700">
                                    Include your full name and at least email or phone number
                                </p>

                                {/* First name / Surname */}
                                <div className="flex gap-4 mb-4">
                                    {["firstname", "surname"].map((field, idx) => (
                                        <div className="form-group flex-1" key={field}>
                                            <label htmlFor={field} className="mb-1 font-bold font-poppins">
                                                {idx === 0 ? "First name" : "Surname"}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    ref={idx === 0 ? firstNameRef : null}
                                                    type="text"
                                                    id={field}
                                                    value={formValues[field]}
                                                    onChange={(e) => handleChange(field, e.target.value)}
                                                    onBlur={() => handleBlur(field)}
                                                    onFocus={() => handleFocus(field)}
                                                    placeholder={idx === 0 ? "Diya" : "Agarwal"}
                                                    className="custom-input w-full"
                                                />
                                                {isFieldValid(field) && (
                                                    <span className="success-icon">
                                                        <FaCheck />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* City */}
                                <div className="form-group mb-6">
                                    <label htmlFor="city" className="mb-1 font-bold font-poppins">City</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="city"
                                            value={formValues.city}
                                            onChange={(e) => handleChange("city", e.target.value)}
                                            onBlur={() => handleBlur("city")}
                                            onFocus={() => handleFocus("city")}
                                            placeholder="Bengaluru"
                                            className="custom-input w-full"
                                        />
                                        {isFieldValid("city") && (
                                            <span className="success-icon">
                                                <FaCheck />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Country / Pincode */}
                        <div className="flex gap-4 mb-4">
                            {["country", "pincode"].map((field, idx) => (
                                <div className="form-group flex-1" key={field}>
                                    <label htmlFor={field} className="mb-1 font-bold font-poppins">
                                        {idx === 0 ? "Country" : "Pin code"}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id={field}
                                            value={formValues[field]}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                            onBlur={() => handleBlur(field)}
                                            onFocus={() => handleFocus(field)}
                                            placeholder={idx === 0 ? "India" : "Enter pincode"}
                                            className="custom-input w-full"
                                        />
                                        {isFieldValid(field) && (
                                            <span className="success-icon">
                                                <FaCheck />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Phone / Email */}
                        <div className="flex gap-4 mb-8">
                            <div className="form-group flex-1">
                                <label htmlFor="phone" className="mb-1 font-bold font-poppins">Phone</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formValues.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        onBlur={() => handleBlur("phone")}
                                        onFocus={() => handleFocus("phone")}
                                        placeholder="+91 11 1234 5677"
                                        className="custom-input w-full"
                                    />
                                    {isFieldValid("phone") && (
                                        <span className="success-icon">
                                            <FaCheck />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={`form-group flex-1 ${emailError ? "error" : ""}`}>
                                <label htmlFor="email" className="mb-1 font-bold font-poppins">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={formValues.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        onBlur={() => handleBlur("email")}
                                        onFocus={() => handleFocus("email")}
                                        placeholder="d.agarwal@sample.in"
                                        className="custom-input w-full pr-10"
                                    />
                                    {emailError && (
                                        <span className="error-icon">
                                            <FaTimes />
                                        </span>
                                    )}
                                    {isFieldValid("email") && !emailError && (
                                        <span className="success-icon">
                                            <FaCheck />
                                        </span>
                                    )}
                                </div>
                                {emailError && <p className="error-message text-xs">{emailErrorMsg}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <div className="w-[200px]">
                                <button onClick={() => navigate("/build-cv/select-cv")} className="w-full px-4 py-2 border-black text-[1.1rem] font-poppins font-bold rounded-2xl border-2 hover:bg-selectCVBackHover">
                                    Back
                                </button>
                            </div>
                            <div className="w-[200px]">
                                <button
                                    onClick={handleContinue}
                                    className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl border border-transparent hover:bg-btnColorHover"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Preview */}
                <div className="bg-chooseTemplateBgTopPadding" style={{ width: "416px", minHeight: "100vh" }}>
                    <DefaultTemplate
                        firstname={formValues.firstname}
                        surname={formValues.surname}
                        city={formValues.city}
                        country={formValues.country}
                        pincode={formValues.pincode}
                        phone={formValues.phone}
                        email={formValues.email}
                    />
                </div>
            </div>

            {/* Modal */}
            {showDialog && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setShowDialog(false)} // clicking backdrop closes dialog
                >
                    {/* Prevent clicks inside dialog from closing */}
                    <div onClick={e => e.stopPropagation()}>
                        <CreateAccountDialog onClose={() => setShowDialog(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SectionCntc;