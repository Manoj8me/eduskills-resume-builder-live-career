import { FaTimes } from "react-icons/fa";

const NoExperienceModal = ({ showModal, onClose, onNoExperience }) => {
    if (!showModal) return null; // Don't render anything if not shown

    return (
        <div
            className="fixed inset-0 z-1000 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} // clicking outside modal closes it
        >
            <div
                className="bg-white rounded-lg px-8 py-8 w-[800px] relative"
                onClick={(e) => e.stopPropagation()} // prevent close on modal click
            >
                {/* Close icon */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6"
                    aria-label="Close modal"
                >
                    <FaTimes size={20} />
                </button>

                {/* Modal content */}
                <h2 className="text-4xl font-bold mb-4">More information required</h2>
                <p className="mb-6 text-xl font-poppins">
                    Looks like you haven't entered any past work experience – we recommend entering at least your last <span className="font-bold">position</span>  and  <span className="font-bold">company</span>
                </p>

                <div className="flex justify-between mt-auto">
                    <div>
                        <button
                            onClick={onNoExperience}
                            className="w-full px-10 py-3 border-black text-[1.5rem] font-poppins font-bold rounded-full border-4 hover:bg-selectCVBackHover"
                        >
                            I don't have experience
                        </button>
                    </div>
                    <div className="w-[200px]">
                        <button
                            onClick={onClose}
                            className="w-full px- py-3 bg-btnColor text-[1.5rem] font-poppins font-bold rounded-full border border-transparent hover:bg-btnColorHover"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoExperienceModal;
