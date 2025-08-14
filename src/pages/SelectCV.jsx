import React from 'react';
import createResumeImg from '../assets/create_resume_new.png';
import uploadResumeImg from '../assets/upload_resume_new.png';
import { useNavigate } from 'react-router-dom';

const SelectCV = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {/* Container with max width */}
      <div className="w-full max-w-[1140px]">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            How do you want to build your CV?
          </h1>
        </div>

        {/* Two Buttons Side by Side */}
        <div className="flex gap-8 mb-12 ">
          {/* Professional CV Card */}
          <button className="py-10 flex-1 flex items-center border border-btnBorder bg-white text-left rounded-lg hover:border-2 hover:border-solid hover:border-black hover:bg-selectCVHovers">
            <img
              src={createResumeImg}
              alt="Professional CV"
              className="w-76 h-76 object-cover rounded-md px-5"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Create a new CV</h2>
              <p className="text-gray-600">
                We'll help you create a CV step-by-step
              </p>
            </div>
          </button>

          {/* Creative CV Card with Recommended Label */}
          <div className="flex-1 relative">
            {/* Label */}
            <div className="absolute -top-4 left-1/2  -translate-x-1/2">
              <span className="bg-cvOptionLabelBg text-cvOptionLabel text-sm font-small font-bold px-2 py-3 rounded-lg shadow">
                Recommended option to save you time
              </span>
            </div>
            {/* Button */}
            <button className=" py-10 w-full flex items-center border border-btnBorder bg-white text-left rounded-lg hover:border-2 hover:border-black p-1 hover:bg-selectCVHovers">
              <img
                src={uploadResumeImg}
                alt="Creative CV"
                className="w-76 h-76 object-cover rounded-md px-5"
              />
              <div>
                <h2 className="text-2xl font-semibold mb-2">I already have a CV</h2>
                <p className="text-gray-600">
                  We'll reformat it and fill in your information so you don't have to
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between">
          <div className="w-[200px]">
            <button
              className="w-full px-4 py-2 border-black text-[1.1rem] font-poppins font-bold rounded-2xl  border  hover:bg-selectCVBackHover"
              onClick={() => navigate("/build-cv/choose-template")}
            >
              Back
            </button>
          </div>
          <div className="w-[200px]">
            <button
              className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent hover:bg-selectCVContinuekHover"
              onClick={() => navigate("/build-cv/section/cntc")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCV;
