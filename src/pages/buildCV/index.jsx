import { useNavigate } from 'react-router-dom';
import { DownloadIcon, ExmaplePencilIcon, FileArrowIcon } from '../../assets/SvgICons';
import Header from '../../components/Header';

// Horizontally aligned dot group, vertically centered
const DotGroup = () => (
    <div>
        <div className="flex flex-col justify-center h-full">
            <div className="flex gap-5">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="w-1 h-1 bg-black rounded-full"></div>
                ))}
            </div>
        </div>
    </div>
);

const BuildCV = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen pt-20">
            <Header />

            {/* Heading with custom size, color and pointer cursor */}
            <h1 className="text-[2rem] font-semibold text-center mb-10 cursor-pointer">
                Create a <span style={{ color: '#8150cc' }}>job-winning</span> CV in minutes
            </h1>

            {/* Centered container for boxes and dots */}
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center gap-6 relative">
                    {/* Box 1 */}
                    <div className="relative flex flex-col items-center cursor-pointer">
                        {/* Number Circle */}
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-navyBlue text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>

                        <div className="w-40 h-40 bg-lightBlueCustom-500 rounded-2xl flex items-center justify-center overflow-hidden">
                            <FileArrowIcon />
                        </div>
                        <p className="mt-4 text-center text-[0.7rem] font-poppins">
                            Choose your professionally<br />
                            designed template
                        </p>
                    </div>

                    {/* Dots between box 1 and 2 */}
                    <DotGroup />

                    {/* Box 2 */}
                    <div className="relative flex flex-col items-center cursor-pointer">
                        {/* Number Circle */}
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-navyBlue text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>

                        <div className="w-40 h-40 bg-lightBlueCustom-500 rounded-2xl flex items-center justify-center overflow-hidden">
                            <ExmaplePencilIcon />
                        </div>
                        <p className="mt-4 text-center text-[0.7rem] font-poppins">
                            Add pre-written examples<br />
                            to each section
                        </p>
                    </div>

                    {/* Dots between box 2 and 3 */}
                    <DotGroup />

                    {/* Box 3 */}
                    <div className="relative flex flex-col items-center cursor-pointer">
                        {/* Number Circle */}
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-navyBlue text-white rounded-full flex items-center justify-center font-bold">
                            3
                        </div>

                        <div className="w-40 h-40 bg-lightBlueCustom-500 rounded-2xl flex items-center justify-center overflow-hidden">
                            <DownloadIcon />
                        </div>
                        <p className="mt-4 text-center text-[0.7rem] font-poppins">
                            Download and start applying
                        </p>
                    </div>
                </div>
            </div>

            {/* Button directly under Box 2 */}
            <div className="mt-4 flex justify-center">
                <div className="w-[200px]">
                    <button
                        onClick={() => navigate('/build-cv/onboarding/experiencelevel')}
                        className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins rounded-2xl hover:bg-btnColorHover border border-transparent hover:border-white transition"
                    >
                        Let's go
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildCV;