import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiZoomInFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ChooseTemplateDialog from "../components/ChooseTemplateDialog";

const ChooseTemplate = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedColor, setSelectedColor] = useState("#ffffff"); // main template color
    const [hoverColor, setHoverColor] = useState(null);
    const [hoveredGroup, setHoveredGroup] = useState(null);
    const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible: false });

    const [hoveredTemplate, setHoveredTemplate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
    const [dialogColor, setDialogColor] = useState("#ffffff"); // dialog-only color
    const [templateSize, setTemplateSize] = useState({ width: 0, height: 0 });

    const tabs = ["Recommended", "New", "All"];
    const navigate = useNavigate();
    const colors = [
        { name: "Default", shades: ["#ffffff"] },
        { name: "Assertive asphalt", shades: ["#696969", "#34393e", "#1b1d1e"] },
        { name: "Trusted taupe", shades: ["#d0c7c5", "#af9b94", "#85675d"] },
        { name: "Loyal blue", shades: ["#2e70ce", "#144181", "#072c61"] },
        { name: "Balanced blue", shades: ["#88baff", "#4685dd", "#1b5cb6"] },
        { name: "Team teal", shades: ["#2acbe9", "#06a4c1", "#007d93"] },
        { name: "Empathic emerald", shades: ["#5bbca8", "#2c806f", "#155d4f"] },
        { name: "Creative orange", shades: ["#ffc17a", "#f6911e", "#d57201"] },
        { name: "Ambitious red", shades: ["#fd7680", "#cb454e", "#95151e"] }
    ];

    const shadeTooltips = [
        "Light grey", "Dark grey",
        "Light beige", "Dark beige",
        "Blue sky", "Denim",
        "Light blue", "Dark blue",
        "Light teal", "Dark teal",
        "Light green", "Dark green",
        "Light yellow", "Dark yellow",
        "Light red", "Dark red"
    ];
    const templateRef = useRef(null);
    useEffect(() => {
        if (templateRef.current) {
            const { width, height } = templateRef.current.getBoundingClientRect();
            setTemplateSize({ width, height });
        }
    }, []);
    const getAppliedColor = () => hoverColor || selectedColor;

    const showTooltip = (text, event) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
            text,
            x: rect.right + 8,
            y: rect.top + rect.height / 2,
            visible: true
        });
    };

    const hideTooltip = () => {
        setTooltip((prev) => ({ ...prev, visible: false }));
    };

    const templates = [1, 2, 3, 4, 5, 6];

    const handleTemplateClick = (index) => {
        setCurrentTemplateIndex(index);
        setDialogColor(selectedColor); // set dialog color to current main color when opening
        setOpenDialog(true);
    };

    const goPrev = () => {
        setCurrentTemplateIndex((prev) =>
            prev === 0 ? templates.length - 1 : prev - 1
        );
    };

    const goNext = () => {
        setCurrentTemplateIndex((prev) =>
            prev === templates.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 relative pb-20">
            {/* Heading */}
            <div className="bg-white p-6 shadow">
                <h2 className="text-[2rem] font-bold text-center mb-3">
                    These are the recommended templates for the industries that you chose
                </h2>
                <p className="text-[0.8rem] font-poppins text-center mb-4">
                    You can always change your mind and try a different template later
                </p>
            </div>

            {/* Sticky Tabs + Colors */}
            <div className="sticky top-0 z-20 bg-white shadow p-4">
                <div className="flex justify-center items-center gap-8">
                    {/* Tabs */}
                    <div className="flex gap-6">
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === index;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => setActiveTab(index)}
                                >
                                    <span
                                        className={`text-base font-medium transition ${isActive
                                            ? "text-blue-600"
                                            : "text-gray-700 hover:text-blue-500"
                                            }`}
                                    >
                                        {tab}
                                    </span>
                                    <div
                                        className={`h-[2px] w-full mt-1 transition-all duration-300 ${isActive ? "bg-blue-600" : "bg-gray-300"
                                            }`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Color Picker */}
                    <div className="flex gap-4">
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
                                                                        : shadeTooltips[(idx - 1) * 2 + (shadeIdx === 2 ? 1 : 0)];
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
            </div>

            {/* Tooltip */}
            {tooltip.visible && (
                <div
                    className="fixed bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-[9999]"
                    style={{
                        top: tooltip.y,
                        left: tooltip.x,
                        transform: "translateY(-50%)",
                        whiteSpace: "nowrap"
                    }}
                >
                    {tooltip.text}
                </div>
            )}

            {/* Resume Templates */}
            <div className="pt-6 bg-chooseTemplateBgTopPadding">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 bg-ChooseTemplateBg">
                    {templates.map((template, index) => (
                        <div
                            key={template}
                            className="relative rounded-xl shadow-md border overflow-hidden cursor-pointer w-full aspect-[4/5]"
                            style={{ backgroundColor: getAppliedColor() }}
                            onMouseEnter={() => setHoveredTemplate(index)}
                            onMouseLeave={() => setHoveredTemplate(null)}
                            onClick={() => handleTemplateClick(index)}
                        >
                            <div
                                className="flex items-center justify-center text-lime-600 font-bold"
                            >
                                Template {template}
                            </div>

                            {hoveredTemplate === index && (
                                <div className="absolute top-2 right-2 bg-zoomIconBg p-3 rounded-full shadow hover:bg-zoomIconBgHover">
                                    <RiZoomInFill className="text-3xl" />
                                </div>
                            )}

                            {hoveredTemplate === index && (
                                <button
                                    onClick={() => navigate("/build-cv/select-cv")}
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2  px-2 py-4 bg-btnColor text-[1.0rem] font-poppins font-bold rounded-full hover:bg-selectCVContinueHover border border-transparent hover:border-selectCVContinueHover transition"
                                >
                                    Select template
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Template Card */}
            <div
                ref={templateRef}
                className="relative border border-gray-300 rounded-lg overflow-hidden cursor-pointer"
                style={{ backgroundColor: selectedColor, width: 200, height: 300 }} // Example fixed size
                onClick={() => setDialogOpen(true)}
            >
                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <RiZoomInFill size={18} />
                </div>
            </div>
            {/* Dialog Component */}
            <ChooseTemplateDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                templates={templates}
                currentTemplateIndex={currentTemplateIndex}
                goPrev={goPrev}
                goNext={goNext}
                colors={colors}
                selectedColor={dialogColor} // dialog uses its own state
                setSelectedColor={setDialogColor} // only updates dialog color
                tooltip={tooltip}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                templateSize={templateSize} // Pass dimensions
                renderTemplate={(index, appliedColor) => (
                    <div
                        className="relative rounded-xl shadow-md border overflow-hidden cursor-pointer w-full aspect-[4/5]"
                        style={{ backgroundColor: appliedColor }}
                    >
                        <div className="flex items-center justify-center text-lime-600 font-bold">
                            Template {templates[index]}
                        </div>
                    </div>
                )}
            />

            {/* Bottom Fixed Container */}
            {!openDialog && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex justify-end items-center gap-6 z-50">
                    <button
                        className="mt-3 font-bold text-navyBlue underline underline-offset-2 hover:no-underline text-lg font-poppins"
                        onClick={() => navigate("/build-cv/select-cv")}
                    >
                        Skip for now
                    </button>
                    <button
                        onClick={() => {
                            setDialogColor(selectedColor);
                            setOpenDialog(true);
                        }}
                        className="px-4 py-2 bg-btnColor text-[1.1rem] font-poppins font-bold rounded-2xl hover:bg-btnColorHover border border-transparent hover:border-white transition"
                    >
                        Choose this template
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChooseTemplate;