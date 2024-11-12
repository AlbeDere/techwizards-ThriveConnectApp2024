import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../redux/api/authSlice";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const root = document.documentElement;
      const hue = (parseInt(root.style.getPropertyValue("--hue"), 10) || 0) + 1;
      root.style.setProperty("--hue", hue.toString());
    }, 50);

    return () => clearInterval(interval);
  }, []);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      // Store token in local storage or state
      localStorage.setItem("token", result.token);

      const decodedToken: any = jwtDecode(result.token);
      const userRole = decodedToken.role;
      const userId = decodedToken.id;

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      if(userRole === "jobseeker") {
        navigate(`/jobSeeker-profile-page/${userId}`);
      } else if (userRole === "company") {
        navigate(`/company-profile-page/${userId}`);
      }
    } catch (err) {
      console.error("Failed to login:", err);
      toast.error("Login failed. Please try again.", {
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
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4">
        <style>{`
        :root {
          --hue: 0;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 overflow-hidden relative"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 opacity-30"
              style={{
                backgroundSize: "400% 400%",
                animation: "gradient 15s ease infinite",
                filter: "hue-rotate(calc(var(--hue) * 1deg))",
              }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Welcome Back!
              </h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pl-10 pr-10"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
              <div className="flex items-center justify-between">
                <motion.button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <motion.div
                      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
