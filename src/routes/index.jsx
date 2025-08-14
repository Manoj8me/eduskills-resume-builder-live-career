import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy loaded pages
const BuildCV = lazy(() => import('../pages/buildCV/index.jsx'));
const ExperienceLevel = lazy(() => import('../pages/ExperienceLevel.jsx'))
const Industry = lazy(() => import('../pages/Industry.jsx'))
const Career = lazy(() => import('../pages/Career.jsx'))
const ChooseTemplate = lazy(() => import('../pages/ChooseTemplate.jsx'))
const SelectCV = lazy(() => import('../pages/SelectCV.jsx'))
const SectionCntc = lazy(() => import('../pages/SectionCntc.jsx'))
const TipsExperience = lazy(() => import('../pages/TipsExperience.jsx'))
const ExperienceDetails = lazy(() => import('../pages/ExperienceDetails.jsx'))
const TipsEducation = lazy(() => import('../pages/TipsEducation.jsx'))
const EducationDetails = lazy(() => import('../pages/EducationDetails.jsx'))
const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Home route for BuildCV */}
                <Route path="/build-cv" element={<BuildCV />} />
                <Route path="/build-cv/onboarding/experiencelevel" element={<ExperienceLevel />} />
                <Route path='/build-cv/onboarding/industry' element={<Industry />} />
                <Route path='/build-cv/onboarding/career' element={<Career />} />
                <Route path='/build-cv/choose-template' element={<ChooseTemplate />} />
                <Route path='/build-cv/select-cv' element={<SelectCV />} />
                <Route path='/build-cv/section/cntc' element={<SectionCntc />} />
                <Route path='/build-cv/tips/expr' element={<TipsExperience />} />
                <Route path='/build-cv/section/expr-det' element={<ExperienceDetails />} />
                <Route path='/build-cv/tips/educ' element={<TipsEducation />} />
                <Route path='/build-cv/section/educ-det' element={<EducationDetails />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
