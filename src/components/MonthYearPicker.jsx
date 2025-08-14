import React, { useState, useRef, useEffect } from "react";
import { MdCalendarMonth } from "react-icons/md";
import "../styles/SectionCntc.css";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaCheck, FaArrowRight } from "react-icons/fa6";

const MonthYearPicker = ({ value, onChange, disabled, error }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [open, setOpen] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const ref = useRef(null);

    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMonthClick = (monthIndex) => {
        onChange(`${months[monthIndex]} ${year}`);
        setOpen(false);
    };

    const selectedMonthIndex = value ? months.findIndex((m) => value.startsWith(m)) : -1;
    const selectedYear = value ? parseInt(value.split(" ")[1], 10) : null;

    return (
        <div className="relative" ref={ref}>
            <div className="relative">
                <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
                <input
                    type="text"
                    value={value}
                    onClick={() => !disabled && setOpen(!open)}
                    onKeyDown={(e) => {
                        if (disabled) {
                            e.preventDefault();
                            return;
                        }
                        if (e.key === "Backspace") {
                            // Clear entire date value
                            e.preventDefault();
                            onChange("");
                            setOpen(false);
                        } else if (
                            e.key !== "Tab" && // allow tab to navigate
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight"
                        ) {
                            // Prevent all other keys except navigation keys and tab
                            e.preventDefault();
                        }
                    }}
                    placeholder="Select a date"
                    className={`custom-input-calendar w-full pl-12 ${error ? "error" : ""}`}
                />

                {error && (
                    <span className="error-icon">
                        <FaTimes />
                    </span>
                )}
                {!error && value && (
                    <span className="success-icon">
                        <FaCheck />
                    </span>
                )}
            </div>

            {open && !disabled && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 p-3 w-64">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-300">
                        <button
                            type="button"
                            onClick={() => setYear((y) => y - 1)}
                            className="px-2 py-1 rounded hover:bg-calendarHover transition-colors"
                        >
                            <FaArrowLeft className="text-black text-2xl" />
                        </button>
                        <button
                            type="button"
                            onClick={() => { }}
                            className="font-bold px-4 py-2 rounded hover:bg-calendarHover transition-colors flex-1 text-center cursor-default"
                        >
                            {year}
                        </button>
                        <button
                            type="button"
                            onClick={() => setYear((y) => y + 1)}
                            className="px-2 py-1 rounded hover:bg-calendarHover transition-colors"
                        >
                            <FaArrowRight className="text-black text-2xl" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {months.map((m, i) => {
                            const isSelected = i === selectedMonthIndex && year === selectedYear;
                            const isCurrentMonth = i === currentMonthIndex && year === currentYear;
                            return (
                                <button
                                    key={m}
                                    onClick={() => handleMonthClick(i)}
                                    className={`px-3 py-2 rounded transition-colors
                                        ${isCurrentMonth ? "bg-calendarHover font-bold" : ""}
                                        ${isSelected && !isCurrentMonth ? "bg-calendarHover font-bold" : ""}                    
                                        ${!isSelected && !isCurrentMonth ? "hover:bg-monthHover" : ""}`}
                                >
                                    {m}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
export default MonthYearPicker;