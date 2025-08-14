import React, { useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
    FaCheck,
    FaPenRuler,
    FaWandMagicSparkles,
    FaLightbulb,
    FaDownload,
    FaArrowLeft,
    FaArrowRight
} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChooseTemplateDialog = ({
    open,
    onClose,
    templates,
    currentTemplateIndex,
    goPrev,
    goNext,
    colors,
    selectedColor,
    setSelectedColor,
    tooltip,
    showTooltip,
    hideTooltip,
    renderTemplate,
    templateSize,
}) => {
    const [hoverColor, setHoverColor] = useState(null);
    const [hoveredGroup, setHoveredGroup] = useState(null);
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "auto";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    const getAppliedColor = () => hoverColor || selectedColor;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 p-8">

            {/* Left Arrow */}
            <button
                className={`fixed left-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow z-[60] ${currentTemplateIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-btnColor hover:bg-btnColorHover"
                    }`}
                onClick={() => currentTemplateIndex > 0 && goPrev()}
                disabled={currentTemplateIndex === 0}
            >
                <FaArrowLeft className="text-black text-2xl" />
            </button>

            {/* Dialog Box */}
            <div className="relative bg-white rounded-lg overflow-visible flex gap-6 flex-col">

                {/* Top Banner */}
                <div className="bg-black text-white text-sm font-poppins px-4 py-2 rounded-t-lg self-center">
                    Showing {currentTemplateIndex + 1} out of {templates.length} templates
                </div>

                <div className="flex gap-6">
                    {/* Left Section - Template + Color Picker */}
                    <div className="bg-ChooseTemplateBg border border-gray-300 overflow-hidden flex-shrink-0 flex flex-col items-center gap-6 p-6">
                        {renderTemplate
                            ? renderTemplate(currentTemplateIndex, getAppliedColor())
                            : (
                                <div
                                    className="relative rounded-xl shadow-md border overflow-hidden w-full h-full flex items-center justify-center text-lime-600 font-bold"
                                    style={{ backgroundColor: getAppliedColor() }}
                                >
                                    Template {templates[currentTemplateIndex]}
                                </div>
                            )}

                        {/* Color Picker */}
                        <div className="flex flex-wrap gap-4 justify-center pb-4">
                            <span className="w-full text-center font-bold mb-2">Colour</span>
                            {colors.map((color, idx) => {
                                const isDefault = color.name === "Default";
                                const isHovered = hoveredGroup === idx;
                                return (
                                    <div key={color.name} className="relative flex flex-col items-center">
                                        {isDefault ? (
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
                                                style={{ backgroundColor: "#ffffff" }}
                                                onClick={() => setSelectedColor("#ffffff")}
                                            >
                                                {selectedColor === "#ffffff" && (
                                                    <FaCheck className="text-black text-sm" />
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                {isHovered && (
                                                    <div
                                                        className="absolute -top-12 flex flex-col items-center gap-2 bg-white rounded-lg border border-gray-300 shadow-md p-2 z-50"
                                                        onMouseLeave={() => {
                                                            setHoveredGroup(null);
                                                            setHoverColor(null);
                                                        }}
                                                    >
                                                        {color.shades.map((shade, shadeIdx) => (
                                                            <div
                                                                key={shade}
                                                                className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
                                                                style={{ backgroundColor: shade }}
                                                                onMouseEnter={(e) => {
                                                                    setHoverColor(shade);
                                                                    const tooltipText =
                                                                        shadeIdx === 1
                                                                            ? color.name
                                                                            : "Shade option";
                                                                    showTooltip(tooltipText, e);
                                                                }}
                                                                onMouseLeave={hideTooltip}
                                                                onClick={() => setSelectedColor(shade)}
                                                            >
                                                                {selectedColor === shade && (
                                                                    <FaCheck className="text-white text-sm" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div
                                                    className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
                                                    style={{ backgroundColor: color.shades[1] }}
                                                    onMouseEnter={() => setHoveredGroup(idx)}
                                                    onClick={() => setSelectedColor(color.shades[1])}
                                                >
                                                    {selectedColor === color.shades[1] && (
                                                        <FaCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col justify-between p-4" style={{ width: 500 }}>
                        <button
                            className="absolute top-10 right-10 text-2xl font-bold" // moved slightly left
                            onClick={onClose}
                        >
                            <IoCloseSharp />
                        </button>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Sample Heading</h2>

                            {/* Bullet Points */}
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center gap-2 relative">
                                    <FaCheck className="text-green-600" />
                                    <span>ATS optimised</span>
                                    <div
                                        onMouseEnter={() => setShowInfoTooltip(true)}
                                        onMouseLeave={() => setShowInfoTooltip(false)}
                                        className="relative"
                                    >
                                        <IoMdInformationCircleOutline
                                            className="text-blue-500 cursor-pointer"
                                            size={18}
                                        />
                                        {showInfoTooltip && (
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 font-poppins bg-white border border-gray-300 shadow-md rounded-lg p-4 text-sm w-72 z-50">
                                                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 
                                                    border-t-8 border-t-transparent 
                                                    border-b-8 border-b-transparent 
                                                    border-r-8 border-r-white drop-shadow">
                                                </div>
                                                This CV is designed to pass Applicant Tracking Systems (ATS) by using clean
                                                formatting and relevant keywords.
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck className="text-green-600" />
                                    <span>Two-column CV</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck className="text-green-600" />
                                    <span>Editable sample content</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheck className="text-green-600" />
                                    <span>Download in PDF, Word DOCX, or TXT file formats</span>
                                </li>
                            </ul>

                            <div className="w-[200px]">
                                <button
                                    className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent"
                                    onClick={() => navigate("/build-cv/section/cntc")}
                                >
                                    Use this template
                                </button>
                            </div>

                            <hr className="my-6 border-gray-300" />

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 flex items-start gap-2">
                                    <FaPenRuler className="text-gray-700 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Customise your design</h3>
                                        <p className="text-sm text-gray-600">
                                            Match the CV to your professional style.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 flex items-start gap-2">
                                    <FaWandMagicSparkles className="text-gray-700 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Get personalised suggestions</h3>
                                        <p className="text-sm text-gray-600">
                                            Use AI-generated content personalised to previous roles.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 flex items-start gap-2">
                                    <FaLightbulb className="text-gray-700 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Access writing help</h3>
                                        <p className="text-sm text-gray-600">
                                            Beat ATS by using suggested keywords from the job listing.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 flex items-start gap-2">
                                    <FaDownload className="text-gray-700 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1">Download in multiple formats</h3>
                                        <p className="text-sm text-gray-600">
                                            Easily download your CV in various file formats.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Arrow */}
            <button
                className={`fixed right-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow z-[60] ${currentTemplateIndex === templates.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-btnColor hover:bg-btnColorHover"
                    }`}
                onClick={() => currentTemplateIndex < templates.length - 1 && goNext()}
                disabled={currentTemplateIndex === templates.length - 1}
            >
                <FaArrowRight className="text-black text-2xl" />
            </button>
        </div>
    );
};

export default ChooseTemplateDialog;





// import React, { useEffect, useState } from "react";
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import {
//     FaCheck,
//     FaPenRuler,
//     FaWandMagicSparkles,
//     FaLightbulb,
//     FaDownload,
//     FaArrowLeft,
//     FaArrowRight
// } from "react-icons/fa6";
// import { IoCloseSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// const ChooseTemplateDialog = ({
//     open,
//     onClose,
//     templates,
//     currentTemplateIndex,
//     goPrev,
//     goNext,
//     colors,
//     selectedColor,
//     setSelectedColor,
//     tooltip,
//     showTooltip,
//     hideTooltip,
//     renderTemplate,
//     templateSize,
// }) => {
//     const [hoverColor, setHoverColor] = useState(null);
//     const [hoveredGroup, setHoveredGroup] = useState(null);
//     const [showInfoTooltip, setShowInfoTooltip] = useState(false); // NEW state

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Ensure the page can scroll when dialog is open
//         document.body.style.overflow = "auto";
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [open]);

//     if (!open) return null;

//     const getAppliedColor = () => hoverColor || selectedColor;

//     return (
//         <div
//             className="absolute inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 p-8"
//         >
//             {/* Left Arrow */}
//             <button
//                 className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-btnColor p-3 rounded-full shadow hover:bg-btnColorHover z-[60]"
//                 onClick={goPrev}
//             >
//                 <FaArrowLeft className="text-black text-2xl" />
//             </button>

//             {/* Dialog Box */}
//             <div
//                 className="relative bg-white rounded-lg overflow-visible flex gap-6"
//             >
//                 {/* Left Section - Template + Color Picker */}
//                 <div
//                     className="bg-ChooseTemplateBg border border-gray-300 overflow-hidden flex-shrink-0 flex flex-col items-center gap-6 p-6"
//                 >
//                     {renderTemplate
//                         ? renderTemplate(currentTemplateIndex, getAppliedColor())
//                         : (
//                             <div
//                                 className="relative rounded-xl shadow-md border overflow-hidden w-full h-full flex items-center justify-center text-lime-600 font-bold"
//                                 style={{ backgroundColor: getAppliedColor() }}
//                             >
//                                 Template {templates[currentTemplateIndex]}
//                             </div>
//                         )}

//                     {/* Color Picker */}
//                     <div className="flex flex-wrap gap-4 justify-center pb-4">
//                         {colors.map((color, idx) => {
//                             const isDefault = color.name === "Default";
//                             const isHovered = hoveredGroup === idx;
//                             return (
//                                 <div key={color.name} className="relative flex flex-col items-center">
//                                     {isDefault ? (
//                                         <div
//                                             className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
//                                             style={{ backgroundColor: "#ffffff" }}
//                                             onClick={() => setSelectedColor("#ffffff")}
//                                         >
//                                             {selectedColor === "#ffffff" && (
//                                                 <FaCheck className="text-black text-sm" />
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <>
//                                             {isHovered && (
//                                                 <div
//                                                     className="absolute -top-12 flex flex-col items-center gap-2 bg-white rounded-lg border border-gray-300 shadow-md p-2 z-50"
//                                                     onMouseLeave={() => {
//                                                         setHoveredGroup(null);
//                                                         setHoverColor(null);
//                                                     }}
//                                                 >
//                                                     {color.shades.map((shade, shadeIdx) => (
//                                                         <div
//                                                             key={shade}
//                                                             className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
//                                                             style={{ backgroundColor: shade }}
//                                                             onMouseEnter={(e) => {
//                                                                 setHoverColor(shade);
//                                                                 const tooltipText =
//                                                                     shadeIdx === 1
//                                                                         ? color.name
//                                                                         : "Shade option";
//                                                                 showTooltip(tooltipText, e);
//                                                             }}
//                                                             onMouseLeave={hideTooltip}
//                                                             onClick={() => setSelectedColor(shade)}
//                                                         >
//                                                             {selectedColor === shade && (
//                                                                 <FaCheck className="text-white text-sm" />
//                                                             )}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                             <div
//                                                 className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer flex items-center justify-center"
//                                                 style={{ backgroundColor: color.shades[1] }}
//                                                 onMouseEnter={() => setHoveredGroup(idx)}
//                                                 onClick={() => setSelectedColor(color.shades[1])}
//                                             >
//                                                 {selectedColor === color.shades[1] && (
//                                                     <FaCheck className="text-white text-sm" />
//                                                 )}
//                                             </div>
//                                         </>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex flex-col justify-between p-4" style={{ width: 500 }}>
//                     <button
//                         className="absolute top-2 right-2 text-xl font-bold"
//                         onClick={onClose}
//                     >
//                         <IoCloseSharp />
//                     </button>

//                     <div>
//                         <h2 className="text-xl font-bold mb-4">Sample Heading</h2>

//                         {/* Bullet Points */}
//                         <ul className="space-y-2 mb-4">
//                             <li className="flex items-center gap-2 relative">                              <FaCheck className="text-green-600" />                              <span>ATS optimised</span>                              <div
//                                 onMouseEnter={() => setShowInfoTooltip(true)}
//                                 onMouseLeave={() => setShowInfoTooltip(false)}
//                                 className="relative"
//                             >
//                                 <IoMdInformationCircleOutline
//                                     className="text-blue-500 cursor-pointer"
//                                     size={18}
//                                 />
//                                 {showInfoTooltip && (
//                                     <div className="absolute left-6 top-1/2 -translate-y-1/2 font-poppins bg-white border border-gray-300 shadow-md rounded-lg p-4 text-sm w-64 z-50">
//                                         {/* Pointer arrow */}
//                                         <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0
//                                             border-t-8 border-t-transparent
//                                             border-b-8 border-b-transparent
//                                             border-r-8 border-r-white drop-shadow">
//                                         </div>

//                                         This CV is designed to pass Applicant Tracking Systems (ATS) by using clean
//                                         formatting and relevant keywords.
//                                     </div>
//                                 )}
//                             </div>
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <FaCheck className="text-green-600" />
//                                 <span>Two-column CV</span>
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <FaCheck className="text-green-600" />
//                                 <span>Editable sample content</span>
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <FaCheck className="text-green-600" />
//                                 <span>Download in PDF, Word DOCX, or TXT file formats</span>
//                             </li>
//                         </ul>

//                         <div className="w-[200px]">
//                             <button
//                                 className="w-full px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent"
//                                 onClick={() => navigate("/build-cv/section/cntc")}
//                             >
//                                 Use this template
//                             </button>
//                         </div>

//                         {/* Divider */}
//                         <hr className="my-6 border-gray-300" />

//                         {/* Features */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="p-3 flex items-start gap-2">
//                                 <FaPenRuler className="text-gray-700 mt-1" />
//                                 <div>
//                                     <h3 className="font-bold mb-1">Customise your design</h3>
//                                     <p className="text-sm text-gray-600">
//                                         Match the CV to your professional style.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="p-3 flex items-start gap-2">
//                                 <FaWandMagicSparkles className="text-gray-700 mt-1" />
//                                 <div>
//                                     <h3 className="font-bold mb-1">Get personalised suggestions</h3>
//                                     <p className="text-sm text-gray-600">
//                                         Use AI-generated content personalised to previous roles.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="p-3 flex items-start gap-2">
//                                 <FaLightbulb className="text-gray-700 mt-1" />
//                                 <div>
//                                     <h3 className="font-bold mb-1">Access writing help</h3>
//                                     <p className="text-sm text-gray-600">
//                                         Beat ATS by using suggested keywords from the job listing.
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="p-3 flex items-start gap-2">
//                                 <FaDownload className="text-gray-700 mt-1" />
//                                 <div>
//                                     <h3 className="font-bold mb-1">Download in multiple formats</h3>
//                                     <p className="text-sm text-gray-600">
//                                         Easily download your CV in various file formats.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Right Arrow */}
//             <button
//                 className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-btnColor p-3 rounded-full shadow hover:bg-btnColorHover z-[60]"
//                 onClick={goNext}
//             >
//                 <FaArrowRight className="text-black text-2xl" />
//             </button>
//         </div>
//     );
// };

// export default ChooseTemplateDialog;