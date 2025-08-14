/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlueCustom: {
          500: "#f6f8ff",
        },
        navyBlue: "#00007f",
        btnColor: "#00ff9e",
        btnColorHover: "#00dc88",
        btnBorderHover: "#00dc88",
        headerBackground: "#00007f",
        ChooseTemplateBg: "#f2fafb",
        chooseTemplateBgTopPadding: "#f6f8ff",
        cvOptionLabel: "#3b6579",
        cvOptionLabelBg: "#d3f0ff",
        btnBorder: "#acb4ca",
        selectCVHovers: "#ebedff",
        selectCVBackHover: "#fafafa",
        selectCVContinueHover: "#00dc88",
        photoUpload: "#e5aae5",
        photoUploadHover: "#b788b7",
        zoomIconBg: "#e5aae5",
        zoomIconBgHover: "#b788b7",
        alreadyHaveAccount: "#0000d4",
        facebookBtn: "#1877F2",
        errorColor: "#d30000",
        createAccountLeft: "#00007f",
        welldone: "#A164FF",
        experienceText: "#8150cc",
        calendarHover: "#C9d0ff",
        monthHover: "#f6f8ff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        // Add more as needed
      },
    },
  },
  plugins: [],
};
