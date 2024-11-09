import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCompanyMutation } from "@/redux/api/companySlice";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const CompanySignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companyCulture, setCompanyCulture] = useState("");
  const [wellBeingMetrics, setWellBeingMetrics] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");

  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCompany = {
        name,
        email,
        password,
        companyCulture,
        wellBeingMetrics,
        jobTitle,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()),
        experienceRequired,
      };
      await createCompany(newCompany).unwrap();
      toast.success("Company created successfully!");
      // Redirect to the login page after successful sign-up
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3-second delay before redirecting
    } catch (error) {
      console.error("Failed to create account:", error);
      toast.error("Failed to create company. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSignUp}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 mt-20 overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Create a Company Account
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your company name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Culture
              </label>
              <input
                type="text"
                value={companyCulture}
                onChange={(e) => setCompanyCulture(e.target.value)}
                placeholder="Describe your company culture"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Well-being Metrics
              </label>
              <input
                type="text"
                value={wellBeingMetrics}
                onChange={(e) => setWellBeingMetrics(e.target.value)}
                placeholder="e.g., Flexible hours, Mental health support"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-4">
                Please provide details for the job description, including the
                job title, required skills, and experience needed for this
                position.
              </p>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter job title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Skills Required (comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Experience Required
                </label>
                <input
                  type="text"
                  value={experienceRequired}
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  placeholder="Enter experience requirements"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </motion.button>
          </div>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default CompanySignUpPage;
