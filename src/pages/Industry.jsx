import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Industry = () => {
    const predefinedIndustries = [
        "Hotel & catering", "Education", "Healthcare", "Architecture & design", "Retail", "Law",
        "Technology", "Business", "Finance", "Construction"
    ];

    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customIndustry, setCustomIndustry] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toggleIndustry = (industry) => {
        setError("");
        if (selectedIndustries.includes(industry)) {
            setSelectedIndustries(selectedIndustries.filter(item => item !== industry));
        } else {
            if (selectedIndustries.length < 3) {
                setSelectedIndustries([...selectedIndustries, industry]);
            }
        }
    };

    const handleContinue = () => {
        if (selectedIndustries.length === 0 && !customIndustry) {
            setError("Please select at least one industry.");
        } else {
            setError("");
            navigate('/build-cv/onboarding/career');
        }
    };

    const hideAddYourOwn = selectedIndustries.length === 3;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* Heading */}
            <h1 className="text-[2rem] font-semibold text-center mb-3">
                Is your CV for a specific industry?
            </h1>
            <p className="text-[0.8rem] font-poppins text-center mb-10">
                We'll suggest templates and best practices that work well for particular job sectors.
            </p>

            {/* First row: first 6 buttons */}
            <div className="flex justify-center gap-3 mb-3">
                {predefinedIndustries.slice(0, 6).map((industry, index) => (
                    <button
                        key={index}
                        onClick={() => toggleIndustry(industry)}
                        className={`px-4 py-2 rounded-md whitespace-nowrap transition 
                            ${selectedIndustries.includes(industry)
                                ? "bg-[#ebedff] border-2 border-black font-bold"
                                : "border border-gray-300"
                            } 
                            hover:bg-[#ebedff] hover:shadow-md`}
                    >
                        {industry}
                    </button>
                ))}
            </div>

            {/* Second row: last 4 buttons */}
            <div className="flex justify-center gap-3 mb-4 flex-wrap">
                {predefinedIndustries.slice(6).map((industry, index) => (
                    <button
                        key={index}
                        onClick={() => toggleIndustry(industry)}
                        className={`px-4 py-2 rounded-md whitespace-nowrap transition 
                            ${selectedIndustries.includes(industry)
                                ? "bg-[#ebedff] border-2 border-black font-bold"
                                : "border border-gray-300"
                            } 
                            hover:bg-[#ebedff] hover:shadow-md`}
                    >
                        {industry}
                    </button>
                ))}
            </div>

            {/* Add Your Own button OR input */}
            {!hideAddYourOwn && (
                <div className="flex justify-center mb-6">
                    {!showCustomInput ? (
                        <button
                            onClick={() => setShowCustomInput(true)}
                            className="px-4 py-2 rounded-md whitespace-nowrap border border-gray-300 hover:bg-[#ebedff] hover:shadow-md"
                        >
                            + Add your own
                        </button>
                    ) : (
                        <input
                            type="text"
                            placeholder="Type Industry"
                            value={customIndustry}
                            onChange={(e) => setCustomIndustry(e.target.value)}
                            maxLength={30}
                            className="w-[200px] px-4 py-2 border rounded-md outline-none"
                        />
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

            {/* Continue Button */}
            <div className="mt-8 flex flex-col items-center">
                <div className="w-[200px]">
                    <button
                        onClick={handleContinue}
                        className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent hover:border-white transition"
                    >
                        Continue
                    </button>
                </div>

                {/* Skip Question */}
                <button
                    className="mt-3 font-bold text-black underline underline-offset-2 hover:no-underline text-sm font-poppins"
                    onClick={() => navigate('/build-cv/choose-template')}
                >
                    Skip question
                </button>
            </div>
        </div>
    );
};

export default Industry;