import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
    FresherLeafIcon,
    FresherLeafHoverIcon,
    FresherLeafActiveIcon,
    IntermideLeafIcon,
    IntermideLeafHoverIcon,
    IntermideLeafActiveIcon,
    SeniorLeafIcon,
    SeniorLeafHoverIcon,
    SeniorLeafActiveIcon,
} from '../assets/SvgICons';

const ExperienceLevel = () => {
    const [hovered, setHovered] = useState(null);
    const [active, setActive] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const renderIcon = (type) => {
        if (active === type) {
            if (type === 'fresher') return <FresherLeafActiveIcon />;
            if (type === 'intermediate') return <IntermideLeafActiveIcon />;
            if (type === 'senior') return <SeniorLeafActiveIcon />;
        } else if (hovered === type) {
            if (type === 'fresher') return <FresherLeafHoverIcon />;
            if (type === 'intermediate') return <IntermideLeafHoverIcon />;
            if (type === 'senior') return <SeniorLeafHoverIcon />;
        } else {
            if (type === 'fresher') return <FresherLeafIcon />;
            if (type === 'intermediate') return <IntermideLeafIcon />;
            if (type === 'senior') return <SeniorLeafIcon />;
        }
    };

    const getButtonStyles = (type) => {
        const isActive = active === type;
        return `
            w-[269px]
            rounded
            px-4
            py-2
            mt-4
            transition
            text-black
            ${isActive ? 'bg-[#ebedff] font-bold border-[2px] border-black' : 'bg-white border border-gray-300'}
            hover:bg-[#ebedff] hover:shadow-md
        `;
    };

    const getDescription = (type) => {
        switch (type) {
            case 'fresher':
                return (
                    <>
                        <span className="text-[#a164ff] font-semibold">Exciting!</span> We’ll help you build a great CV tailored to your experience level.
                    </>
                );
            case 'intermediate':
                return (
                    <>
                        <span className="text-[#a164ff] font-semibold">Glad you’re here!</span> We'll recommend templates, tips, and ready-to-use content tailored for you.
                    </>
                );
            case 'senior':
                return (
                    <>
                        <span className="text-[#a164ff] font-semibold">Impressive!</span> We’ll make sure your extensive experience shines.
                    </>
                );
            default:
                return '';
        }
    };

    const handleContinue = () => {
        if (!active) {
            setError("Please select your career level.");
        } else {
            setError("");
            navigate('/build-cv/onboarding/industry');
        }
    };

    return (
        <div className="min-h-screen pt-20">
            <Header />

            <h1 className="text-[2rem] font-semibold text-center mb-3">
                What's your career level?
            </h1>

            <p className="text-[0.8rem] font-poppins text-center mb-10">
                Choose based on your entire career or time in a specific field. Your journey is unique, and every bit of experience counts!
            </p>

            <div className="flex justify-center gap-10">
                {/* Fresher */}
                <div className="flex flex-col items-center">
                    {renderIcon('fresher')}
                    <button
                        className={getButtonStyles('fresher')}
                        onMouseEnter={() => setHovered('fresher')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            setActive('fresher');
                            setError(""); // clear error on selection
                        }}
                    >
                        Fresher
                    </button>
                    {active === 'fresher' && (
                        <p className="mt-4 text-center w-[269px] text-sm font-poppins">
                            {getDescription('fresher')}
                        </p>
                    )}
                </div>

                {/* Intermediate */}
                <div className="flex flex-col items-center">
                    {renderIcon('intermediate')}
                    <button
                        className={getButtonStyles('intermediate')}
                        onMouseEnter={() => setHovered('intermediate')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            setActive('intermediate');
                            setError(""); // clear error on selection
                        }}
                    >
                        Intermediate
                    </button>
                    {active === 'intermediate' && (
                        <p className="mt-4 text-center w-[269px] text-sm font-poppins">
                            {getDescription('intermediate')}
                        </p>
                    )}
                </div>

                {/* Senior */}
                <div className="flex flex-col items-center">
                    {renderIcon('senior')}
                    <button
                        className={getButtonStyles('senior')}
                        onMouseEnter={() => setHovered('senior')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                            setActive('senior');
                            setError(""); // clear error on selection
                        }}
                    >
                        Senior
                    </button>
                    {active === 'senior' && (
                        <p className="mt-4 text-center w-[269px] text-sm font-poppins">
                            {getDescription('senior')}
                        </p>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

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

                {/* Skip Question Link */}
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

export default ExperienceLevel;