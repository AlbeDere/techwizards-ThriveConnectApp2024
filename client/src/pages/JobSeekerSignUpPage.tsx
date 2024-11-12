import React, { useState } from "react";
import { useCreateJobSeekerMutation } from "../redux/api/jobseekerSlice";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobSeekerSignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [wellBeingPreferences, setWellBeingPreferences] = useState<string[]>(
    []
  );
  const [createJobSeeker, { isLoading }] = useCreateJobSeekerMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newJobSeeker = {
        name,
        email,
        password,
        role: "jobseeker" as const,
        skills,
        position,
        experience,
        wellBeingPreferences,
        jobSeekerProfile_embedding: [],
        matchingList: [],
      };

      await createJobSeeker(newJobSeeker).unwrap();
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Redirect to the login page after successful sign-up
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3-second delay before redirecting
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setSkills([]);
      setPosition("");
      setExperience("");
      setWellBeingPreferences([]);
    } catch (error) {
      console.error("Failed to create account:", error);
      toast.error("Sign-up failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 mt-20 overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Create Your JobSeeker Account
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
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
                Skills
              </label>
              <input
                type="text"
                value={skills.join(" ")}
                onChange={(e) => setSkills([e.target.value])}
                placeholder="e.g., JavaScript, React, Node.js"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Position
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter your position"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Experience (years)
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Enter your experience"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Well-Being Preferences
              </label>
              <input
                type="text"
                value={wellBeingPreferences.join(" ")}
                onChange={(e) => setWellBeingPreferences([e.target.value])}
                placeholder="e.g., Flexible hours, Remote work"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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

export default JobSeekerSignUpPage;
