import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultTemplate from "../components/DefaultTemplate";
import { FaCheck, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../styles/SectionCntc.css";

const qualificationsList = [
  "High School Diploma",
  "Bachelor’s Degree",
  "Master’s Degree",
  "Doctorate",
  "Certificate",
  "Diploma",
];

const yearOptions = Array.from({ length: 2030 - 1960 + 1 }, (_, i) => 1960 + i);

const describeOptions = [
  "Member of [Type] Union",
  "Coursework in [Area of expertise]",
  "Dissertation in [Area of expertise]",
  "[Degree] Graduate",
  "[Type] Academic Achievement Award",
];

const EducationDetails = ({
  firstname,
  surname,
  city,
  country,
  pincode,
  phone,
  email,
}) => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolLocation: "",
    fieldOfStudy: "",
    qualification: "",
    graduationYear: "",
    describe: [],
    descriptionText: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let errorMsg = "";
    if (field === "schoolName" && !value.trim()) {
      errorMsg = "School Name is required.";
    }
    if (field === "schoolLocation" && !value.trim()) {
      errorMsg = "School Location is required.";
    }
    if (field === "fieldOfStudy" && !value.trim()) {
      errorMsg = "Field of Study is required.";
    }
    if (field === "qualification" && !value) {
      errorMsg = "Qualification is required.";
    }
    if (field === "graduationYear" && !value) {
      errorMsg = "Graduation Year is required.";
    }
    if (field === "descriptionText" && !value.trim()) {
      errorMsg = "Please describe your education.";
    }

    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleDescribeOption = (option) => {
    setFormData((prev) => {
      let updatedDescribe;
      if (prev.describe.includes(option)) {
        updatedDescribe = prev.describe.filter((item) => item !== option);
      } else {
        updatedDescribe = [...prev.describe, option];
      }
      return {
        ...prev,
        describe: updatedDescribe,
        descriptionText: updatedDescribe.join(", "),
      };
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.schoolName.trim())
      tempErrors.schoolName = "School Name is required.";
    if (!formData.schoolLocation.trim())
      tempErrors.schoolLocation = "School Location is required.";
    if (!formData.fieldOfStudy.trim())
      tempErrors.fieldOfStudy = "Field of Study is required.";
    if (!formData.qualification)
      tempErrors.qualification = "Qualification is required.";
    if (!formData.graduationYear)
      tempErrors.graduationYear = "Graduation Year is required.";
    if (!formData.descriptionText.trim())
      tempErrors.descriptionText = "Please describe your education.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const isFieldValid = (field) =>
    touchedFields[field] &&
    !errors[field] &&
    formData[field] &&
    formData[field].toString().trim().length > 0;

  const handleContinue = () => {
    if (validate()) {
      navigate("/build-cv/section/next-section");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white overflow-x-auto">
      {/* Left Section */}
      <div className="flex flex-col flex-1 max-w-[900px] px-12 py-10">
        <h1 className="text-5xl font-bold mb-6">
          Add your <span className="text-experienceText">education</span>
        </h1>

        {/* Row 1: School Name + School Location */}
        <div className="flex gap-6 mb-6">
          <div className={`form-group flex-1 ${errors.schoolName ? "error" : ""}`}>
            <label
              className={`mb-1 font-bold font-poppins ${errors.schoolName ? "error-text" : ""
                }`}
            >
              School Name
            </label>
            <div className="relative">
              <input
                ref={firstInputRef}
                type="text"
                className="custom-input w-full"
                value={formData.schoolName}
                onChange={(e) => handleChange("schoolName", e.target.value)}
                onBlur={() => handleBlur("schoolName")}
              />
              {errors.schoolName && (
                <span className="error-icon">
                  <FaTimes />
                </span>
              )}
              {isFieldValid("schoolName") && (
                <span className="success-icon">
                  <FaCheck />
                </span>
              )}
            </div>
            {errors.schoolName && (
              <div className="error-message text-xs">{errors.schoolName}</div>
            )}
          </div>

          <div className={`form-group flex-1 ${errors.schoolLocation ? "error" : ""}`}>
            <label
              className={`mb-1 font-bold font-poppins ${errors.schoolLocation ? "error-text" : ""
                }`}
            >
              School Location
            </label>
            <div className="relative">
              <input
                type="text"
                className="custom-input w-full"
                value={formData.schoolLocation}
                onChange={(e) => handleChange("schoolLocation", e.target.value)}
                onBlur={() => handleBlur("schoolLocation")}
              />
              {errors.schoolLocation && (
                <span className="error-icon">
                  <FaTimes />
                </span>
              )}
              {isFieldValid("schoolLocation") && (
                <span className="success-icon">
                  <FaCheck />
                </span>
              )}
            </div>
            {errors.schoolLocation && (
              <div className="error-message text-xs">
                {errors.schoolLocation}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Field of Study (left) + stacked Qualification & Graduation Year (right) */}
        <div className="flex gap-6 mb-6">
          <div className={`form-group flex-1 ${errors.fieldOfStudy ? "error" : ""}`}>
            <label
              className={`mb-1 font-bold font-poppins ${errors.fieldOfStudy ? "error-text" : ""
                }`}
            >
              Field of Study
            </label>
            <div className="relative">
              <input
                type="text"
                className="custom-input w-full"
                value={formData.fieldOfStudy}
                onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
                onBlur={() => handleBlur("fieldOfStudy")}
              />
              {errors.fieldOfStudy && (
                <span className="error-icon">
                  <FaTimes />
                </span>
              )}
              {isFieldValid("fieldOfStudy") && (
                <span className="success-icon">
                  <FaCheck />
                </span>
              )}
            </div>
            {errors.fieldOfStudy && (
              <div className="error-message text-xs">{errors.fieldOfStudy}</div>
            )}
          </div>

          <div className="flex flex-1 gap-6">
            <div className={`form-group ${errors.qualification ? "error" : ""}`}>
              <label
                className={`mb-1 font-bold font-poppins ${errors.qualification ? "error-text" : ""
                  }`}
              >
                Qualification
              </label>
              <div className="relative">
                <select
                  className="custom-input w-full"
                  value={formData.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  onBlur={() => handleBlur("qualification")}
                >
                  <option value="">Select</option>
                  {qualificationsList.map((q, idx) => (
                    <option key={idx} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                {errors.qualification && (
                  <span className="error-icon">
                    <FaTimes />
                  </span>
                )}
                {isFieldValid("qualification") && (
                  <span className="success-icon">
                    <FaCheck />
                  </span>
                )}
              </div>
              {errors.qualification && (
                <div className="error-message text-xs">
                  {errors.qualification}
                </div>
              )}
            </div>

            <div className={`form-group ${errors.graduationYear ? "error" : ""}`}>
              <label
                className={`mb-1 font-bold font-poppins ${errors.graduationYear ? "error-text" : ""
                  }`}
              >
                Graduation Year
              </label>
              <div className="relative">
                <select
                  className="custom-input w-full"
                  value={formData.graduationYear}
                  onChange={(e) => handleChange("graduationYear", e.target.value)}
                  onBlur={() => handleBlur("graduationYear")}
                >
                  <option value="">Select</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.graduationYear && (
                  <span className="error-icon">
                    <FaTimes />
                  </span>
                )}
                {isFieldValid("graduationYear") && (
                  <span className="success-icon">
                    <FaCheck />
                  </span>
                )}
              </div>
              {errors.graduationYear && (
                <div className="error-message text-xs">
                  {errors.graduationYear}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Describe Section */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold font-poppins">
            Describe your education
          </label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {describeOptions.map((option, idx) => {
              const selected = formData.describe.includes(option);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 transition ${selected
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300 hover:border-gray-500"
                    }`}
                  onClick={() => toggleDescribeOption(option)}
                >
                  <span>{option}</span>
                  {selected && <FaCheck className="text-green-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div
          className={`form-group mb-8 ${errors.descriptionText ? "error" : ""
            }`}
        >
          <ReactQuill
            value={formData.descriptionText}
            onChange={(value) => handleChange("descriptionText", value)}
            onBlur={() => handleBlur("descriptionText")}
            theme="snow"
            placeholder="Add more details about your education..."
          />
          {errors.descriptionText && (
            <div className="error-message text-xs">
              {errors.descriptionText}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <div className="w-[200px]">
            <button
              className="w-full text-black px-5 py-3 text-[1.1rem] font-bold rounded-full border-2 border-black hover:bg-gray-200 transition"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="w-[200px]">
            <button
              className="w-full px-5 py-3 bg-btnColor text-[1.1rem] font-bold rounded-full hover:bg-btnColorHover border border-transparent transition"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
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
          firstname={firstname}
          surname={surname}
          city={city}
          country={country}
          pincode={pincode}
          phone={phone}
          email={email}
        />
      </div>
    </div>
  );
};

export default EducationDetails;