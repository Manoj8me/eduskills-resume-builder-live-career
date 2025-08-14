import React, { useState } from "react";
import {
    CareerBulb,
    CareerBulbActive,
    CareerBulbHover
} from "../assets/SvgICons";
import { useNavigate } from "react-router-dom";

const Career = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [validationError, setValidationError] = useState("");
    const navigate = useNavigate();

    const buttons = [
        "A specific role",
        "Similar roles or industries you're in",
        "Any job to match your skills"
    ];

    const handleContinue = () => {
        if (activeIndex === null) {
            setValidationError("Please select an option before continuing.");
        } else {
            setValidationError("");
            navigate("/build-cv/choose-template"); // Replace this with your actual route later
        }
    };

    return (
        <div className="p-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-6">
                What's your new CV for?
            </h2>

            {/* Bulbs Row */}
            <div className="flex justify-center gap-12">
                {buttons.map((label, index) => {
                    const isActive = activeIndex === index;
                    const isHovered = hoverIndex === index;

                    let BulbComponent = CareerBulb;
                    if (isActive) {
                        BulbComponent = CareerBulbActive;
                    } else if (isHovered) {
                        BulbComponent = CareerBulbHover;
                    }

                    return (
                        <div key={index} className="flex flex-col items-center w-56">
                            <BulbComponent />
                            <button
                                className={`mt-4 w-48 h-14 px-4 rounded-xl text-center flex items-center justify-center transition text-sm leading-tight
                                    ${isActive
                                        ? "bg-[#ebedff] border-2 border-black font-bold"
                                        : "bg-white border border-gray-300"
                                    }
                                    ${isHovered
                                        ? "bg-[#ebedff] shadow-md"
                                        : ""
                                    }
                                `}
                                onClick={() => {
                                    setActiveIndex(index);
                                    setValidationError("");
                                }}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                {label}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Validation Error */}
            {validationError && (
                <p className="text-red-500 text-center mt-4">{validationError}</p>
            )}

            {/* Continue & Skip */}
            <div className="mt-8 flex flex-col items-center">
                <div className="w-[200px]">
                    <button
                        onClick={handleContinue}
                        className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent hover:border-white transition"
                    >
                        Continue
                    </button>
                </div>

                <button
                    className="mt-3 font-bold text-black underline underline-offset-2 hover:no-underline text-sm font-poppins"
                    onClick={() =>
                        navigate("/build-cv/choose-template")
                    }
                >
                    Skip question
                </button>
            </div>
        </div>
    );
};

export default Career;