import { useNavigate } from "react-router-dom";
import DefaultTemplate from "../components/DefaultTemplate";
import { TipsExpBg } from "../assets/SvgICons";
import { TbBulbFilled } from "react-icons/tb";

const TipsEducation = ({
    firstname,
    surname,
    city,
    country,
    pincode,
    phone,
    email,
    onBack,
    onContinue,
}) => {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden">
            {/* Full-page background image */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <TipsExpBg className="w-full h-full object-cover" />
            </div>

            {/* Left Section */}
            <div className="flex flex-col py-20 pl-10 w-[800px] rounded-lg">
                <div>
                    <h3 className="text-4xl text-welldone font-semibold mb-8">
                        Good job!
                    </h3>
                    <h1 className="text-6xl font-bold mb-60 text-white">
                        Let's add your education
                    </h1>
                    <h3 className="text-3xl pl-16 mb-3 font-bold text-white">Hiring tip</h3>

                    {/* Bulb + Paragraph together */}
                    <div className="flex items-start gap-4 mb-4">
                        <TbBulbFilled className="text-welldone text-5xl flex-shrink-0 mt-1" />
                        <p className="text-[1.3rem] text-white font-poppins">
                            Students and recent graduates: mention coursework, areas of study, or
                            projects related to your career goals.
                            <br />
                            Experienced professionals: add courses and trainings that show additional
                            qualifications and experience.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-auto">
                    <div className="w-[200px]">
                        <button
                            className="w-full text-white px-5 py-5 text-[1.4rem] font-poppins font-bold rounded-full border-4 border-white"
                            onClick={onBack || (() => navigate(-1))}
                        >
                            Back
                        </button>
                    </div>
                    <div className="w-[200px]">
                        <button
                            className="w-full px-5 py-5 bg-btnColor text-[1.4rem] font-poppins font-bold rounded-full hover:bg-btnColorHover border border-transparent hover:border-white transition"
                            onClick={onContinue || (() => navigate("/build-cv/section/educ-det"))}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-grow flex justify-center pt-14">
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

export default TipsEducation;