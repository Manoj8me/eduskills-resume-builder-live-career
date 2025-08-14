import { useState, useRef, useEffect } from "react";
import "../styles/SectionCntc.css";
import { useNavigate } from "react-router-dom";
import DefaultTemplate from "../components/DefaultTemplate";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import MonthYearPicker from "../components/MonthYearPicker";
import NoExperienceModal from "../components/NoExperienceModal";

const ExperienceDetails = () => {
    const navigate = useNavigate();
    const firstInputRef = useRef(null);

    const [formValues, setFormValues] = useState({
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        city: "",
        country: "",
    });

    const [touchedFields, setTouchedFields] = useState({});
    const [errors, setErrors] = useState({});
    const [continueClicked, setContinueClicked] = useState(false);
    // NEW: modal visibility state
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
    }, []);

    const handleChange = (field, value) => {
        if (field === "currentlyWorking") {
            if (value) {
                setFormValues((prev) => ({ ...prev, currentlyWorking: true, endDate: "" }));
                setErrors((prev) => ({ ...prev, endDate: "" }));
            } else {
                setFormValues((prev) => ({ ...prev, currentlyWorking: false }));
            }
            return;
        }

        setFormValues((prev) => ({ ...prev, [field]: value }));

        if (field === "startDate" || field === "endDate") {
            validateDates(field, value);
        }

        // Clear jobTitle/employer errors while typing
        if ((field === "jobTitle" || field === "employer") && errors[field]) {
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, [field]: "" }));
            }
        }
    };

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));

        if (field === "startDate" || field === "endDate") {
            validateDates(field, formValues[field]);
        }

        // Validation for jobTitle/employer if dates selected
        if ((field === "jobTitle" || field === "employer")) {
            const hasDateSelected = formValues.startDate || (formValues.endDate && !formValues.currentlyWorking);
            if (hasDateSelected && !formValues[field].trim()) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: `${field === "jobTitle" ? "Job Title" : "Employer"} is required`,
                }));
            } else {
                setErrors((prev) => ({ ...prev, [field]: "" }));
            }
        }
    };

    const validateDates = (changedField, value) => {
        let newErrors = { ...errors };

        const currentDate = new Date();
        const parseDate = (str) => {
            if (!str) return null;
            const [monthStr, year] = str.split(" ");
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthStr);
            return new Date(parseInt(year), month, 1);
        };

        const start = parseDate(changedField === "startDate" ? value : formValues.startDate);
        const end = parseDate(changedField === "endDate" ? value : formValues.endDate);

        if (start && start > currentDate) {
            newErrors.startDate = "Start date cannot be in the future";
        } else {
            newErrors.startDate = "";
        }

        if (end && start && end < start) {
            newErrors.endDate = "End date cannot be before start date";
        } else {
            newErrors.endDate = "";
        }

        setErrors(newErrors);
    };

    const isFieldValid = (field) => {
        // Tick only if field is touched + no errors + value non-empty
        return touchedFields[field] && !errors[field] && formValues[field].trim().length > 0;
    };

    const handleContinue = () => {
        setContinueClicked(true);

        let newErrors = { ...errors };
        let hasErrors = false;

        const startDateFilled = formValues.startDate.trim() !== "";
        const endDateFilled = formValues.currentlyWorking || formValues.endDate.trim() !== "";

        // Validate startDate required if either start or end is partially filled
        if (!startDateFilled && (endDateFilled)) {
            newErrors.startDate = "Start date is required";
            hasErrors = true;
        }

        // Validate endDate required if currently not working and start date filled
        if (!formValues.currentlyWorking && !endDateFilled && startDateFilled) {
            newErrors.endDate = "End date is required";
            hasErrors = true;
        }

        // Also check existing date errors
        if (errors.startDate) {
            hasErrors = true;
        }
        if (errors.endDate) {
            hasErrors = true;
        }

        // Validate jobTitle and employer if any date or job/employer filled
        const hasDateSelected = startDateFilled || (endDateFilled && !formValues.currentlyWorking);
        if (hasDateSelected || formValues.jobTitle.trim() || formValues.employer.trim()) {
            if (!formValues.jobTitle.trim()) {
                newErrors.jobTitle = "Job Title is required";
                hasErrors = true;
            }
            if (!formValues.employer.trim()) {
                newErrors.employer = "Employer is required";
                hasErrors = true;
            }
        }

        setErrors(newErrors);

        if (hasErrors) {
            return;
        }

        // NEW: If all form fields are empty, show modal
        const allFieldsEmpty =
            !formValues.jobTitle.trim() &&
            !formValues.employer.trim() &&
            !formValues.startDate.trim() &&
            !formValues.endDate.trim() &&
            !formValues.currentlyWorking &&
            !formValues.city.trim() &&
            !formValues.country.trim();

        if (allFieldsEmpty) {
            setShowModal(true);
            return;
        }

        // Otherwise navigate forward
        navigate("/build-cv/next-step");
    };

    // Handler to close modal
    const handleCloseModal = () => setShowModal(false);

    // Handler if user selects "I don't have experience"
    const handleNoExperience = () => {
        setShowModal(false);
        navigate("/build-cv/tips/educ");
    };
    return (
        <div
            className="flex"
            style={{
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "#fff",
                overflowX: "auto",
            }}
        >
            {/* Left side form container */}
            <div
                style={{
                    flex: 1,
                    maxWidth: "900px",
                    padding: "2rem 3rem 2rem 4rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 className="text-5xl font-bold mb-4">
                    Add your <span className="text-experienceText">experience</span>
                </h1>
                <p className="mb-8 font-poppins text-[1.1rem]">
                    Start with your most recent job first. You can also add voluntary work, internships or extracurricular activities.
                </p>

                {/* Job Title / Employer */}
                <div className="flex gap-10 mb-4">
                    {[
                        { name: "jobTitle", label: "Job Title", placeholder: "Retail Sales Associate" },
                        { name: "employer", label: "Employer", placeholder: "ZARA" },
                    ].map((field, idx) => (
                        <div className={`form-group flex-1 ${errors[field.name] ? "error" : ""}`} key={field.name}>
                            <label
                                htmlFor={field.name}
                                className={`mb-1 font-bold font-poppins ${errors[field.name] ? "error-text" : ""}`}
                            >
                                {field.label}
                            </label>
                            <div className="relative">
                                <input
                                    ref={idx === 0 ? firstInputRef : null}
                                    type="text"
                                    id={field.name}
                                    value={formValues[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    onBlur={() => handleBlur(field.name)}
                                    placeholder={field.placeholder}
                                    className="custom-input w-full"
                                />
                                {errors[field.name] && (
                                    <span className="error-icon">
                                        <FaTimes />
                                    </span>
                                )}
                                {/* Tick appears only on blur, so use touchedFields */}
                                {isFieldValid(field.name) && (
                                    <span className="success-icon">
                                        <FaCheck />
                                    </span>
                                )}
                            </div>
                            {errors[field.name] && <p className="error-message text-xs">{errors[field.name]}</p>}
                        </div>
                    ))}
                </div>

                {/* Start Date / End Date */}
                <div className="flex gap-10 mb-2 items-start">
                    <div className={`form-group flex-1 ${errors.startDate ? "error" : ""}`}>
                        <label className={`mb-1 font-bold font-poppins ${errors.startDate ? "error-text" : ""}`}>
                            Start Date
                        </label>
                        <MonthYearPicker
                            value={formValues.startDate}
                            onChange={(val) => handleChange("startDate", val)}
                            error={!!errors.startDate}
                        />
                        {errors.startDate && <p className="error-message text-xs">{errors.startDate}</p>}
                    </div>
                    <div className="flex-1">
                        <div className={`form-group ${formValues.currentlyWorking ? "" : errors.endDate ? "error" : ""}`}>
                            <label
                                className={`mb-1 font-bold font-poppins ${formValues.currentlyWorking ? "text-gray-500" : errors.endDate ? "error-text" : "text-black"
                                    }`}
                            >
                                End Date
                            </label>
                            <MonthYearPicker
                                value={formValues.endDate}
                                onChange={(val) => handleChange("endDate", val)}
                                disabled={formValues.currentlyWorking}
                                error={!!errors.endDate && !formValues.currentlyWorking}
                            />
                            {errors.endDate && !formValues.currentlyWorking && (
                                <p className="error-message text-xs">{errors.endDate}</p>
                            )}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="w-5 h-5 cursor-pointer"
                                checked={formValues.currentlyWorking}
                                onChange={(e) => handleChange("currentlyWorking", e.target.checked)}
                            />
                            <label
                                className={`cursor-pointer select-none ${formValues.currentlyWorking ? "font-bold text-black" : "font-normal text-black"
                                    }`}
                            >
                                I currently work here
                            </label>
                        </div>
                    </div>
                </div>

                {/* City / Country */}
                <div className="flex gap-10 mb-8">
                    {[
                        { name: "city", label: "City (Optional)", placeholder: "New Delhi" },
                        { name: "country", label: "Country (Optional)", placeholder: "India" },
                    ].map((field) => (
                        <div className="form-group flex-1" key={field.name}>
                            <label htmlFor={field.name} className="mb-1 font-bold font-poppins">
                                {field.label}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id={field.name}
                                    value={formValues[field.name]}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="custom-input w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-auto">
                    <div className="w-[200px]">
                        <button
                            onClick={() => navigate("/build-cv/contact")}
                            className="w-full px-4 py-3 border-black text-[1.1rem] font-poppins font-bold rounded-full border-2 hover:bg-selectCVBackHover"
                        >
                            Back
                        </button>
                    </div>
                    <div className="w-[200px]">
                        <button
                            onClick={handleContinue}
                            className="w-full px-4 py-3 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-full border border-transparent hover:bg-btnColorHover"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section Preview */}
            <div
                className="bg-chooseTemplateBgTopPadding"
                style={{
                    flexBasis: "700px",
                    minHeight: "100vh",
                    borderLeft: "1px solid #ddd",
                    padding: "2rem",
                    boxSizing: "border-box",
                }}
            >
                <DefaultTemplate
                    jobTitle={formValues.jobTitle}
                    employer={formValues.employer}
                    startDate={formValues.startDate}
                    endDate={formValues.currentlyWorking ? "Present" : formValues.endDate}
                    city={formValues.city}
                    country={formValues.country}
                />
            </div>
            <NoExperienceModal
                showModal={showModal}
                onClose={handleCloseModal}
                onNoExperience={handleNoExperience}
            />

        </div>
    );
};

export default ExperienceDetails;