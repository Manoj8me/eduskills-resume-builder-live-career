// import React, { useState } from "react";
// import SectionCntc from "./SectionCntc";
// import TipsExperience from "./TipsExperience";

// const BuildCVFlow = () => {
//   const [step, setStep] = useState(1); // 1 = Contact info, 2 = Experience

//   // Shared state for both components
//   const [formValues, setFormValues] = useState({
//     firstname: "",
//     surname: "",
//     city: "",
//     country: "",
//     pincode: "",
//     phone: "",
//     email: ""
//   });

//   return (
//     <>
//       {step === 1 && (
//         <SectionCntc
//           formValues={formValues}
//           setFormValues={setFormValues}
//           onContinue={() => setStep(2)}
//         />
//       )}
//       {step === 2 && (
//         <TipsExperience
//           {...formValues} // Spread formValues into props
//           onBack={() => setStep(1)}
//           onContinue={() => console.log("Go to next section")}
//         />
//       )}
//     </>
//   );
// };

// export default BuildCVFlow;
