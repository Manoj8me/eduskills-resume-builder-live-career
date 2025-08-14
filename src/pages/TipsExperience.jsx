import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultTemplate from "../components/DefaultTemplate";
import { MagicWand, TipsExpBg } from "../assets/SvgICons";

const TipsExperience = ({
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
      <div className="absolute inset-0 -z-10">
        <TipsExpBg className="w-full h-full" />
      </div>

      {/* Left Section */}
      <div className="flex flex-col p-4 w-[660px] rounded-lg">
        <div>
          <h3 className="text-4xl text-welldone font-semibold mb-8">Well done!</h3>
          <h1 className="text-6xl font-bold mb-6 text-white">
            Now, let's fill in your experience section
          </h1>

          {/* Magic Wand + Heading in one row */}
          <div className="flex items-center gap-4 mb-2">
            <MagicWand className="flex-shrink-0" />
            <h3 className="text-3xl font-bold text-white">
              Our AI now makes writing easier!
            </h3>
          </div>

          {/* Paragraph with minimal margin to buttons */}
          <p className="pl-10 text-[1.3rem] text-white font-poppins mb-4">
            With writing help you can fix mistakes or rephrase sentences to suit
            your needs.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-60">
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
              onClick={() => navigate("/build-cv/section/expr-det")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-grow flex justify-center items-center p-8">
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

export default TipsExperience;