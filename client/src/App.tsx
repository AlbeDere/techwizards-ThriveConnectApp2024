import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import ResourcesPage from "./pages/ResourcesPage";
import LoginPage from "./pages/LoginPage";
import SignUpSelectionPage from "./pages/SignUpSelectionPage";
import JobSeekerSignUpPage from "./pages/JobSeekerSignUpPage";
import CompanySignUpPage from "./pages/CompanySignUpPage";
import ProfilePage from "./pages/ProfilePage";
import JobSeekerProfilePage from "./pages/JobSeekerProfilePage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import JobSeekerList from "./pages/JobSeekerList";
import CompaniesList from "./pages/CompaniesList";
import FeedbackPage from "./pages/FeedbackPage";
import CompaniesForUser from "./pages/CompaniesForUser";
import JobSeekersForCompanies from "./pages/JobSeekersForCompanies";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profilePage" element={<ProfilePage />}/>
          <Route path="/signup" element={<SignUpSelectionPage />} />
          <Route path="/signup/jobseeker" element={<JobSeekerSignUpPage />} />
          <Route path="/signup/company" element={<CompanySignUpPage />} />
          <Route path="/jobSeeker-profile-page/:id" element={<JobSeekerProfilePage/>}/>
          <Route path="/company-profile-page/:id" element={<CompanyProfilePage/>}/>
          <Route path="/jobseekers" element={<JobSeekerList/>}/>
          <Route path="/companies" element={<CompaniesList/>}/>
          <Route path="/companies/:id/feedbacks" element={<FeedbackPage/>}/>
          <Route path="/companies/:id" element={<CompaniesForUser/>}/>
          <Route path="/job-seeker/:id" element={<JobSeekersForCompanies/>}/>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        transition={Slide}
      />
    </div>
  );
}

export default App;
