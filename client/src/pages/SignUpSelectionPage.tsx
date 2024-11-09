import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignUpSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Sign Up as
      </h2>
      <div className="flex flex-col space-y-4">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/signup/jobseeker")}
        >
          I want to create a Job Seeker profile
        </Button>
        <Button
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/signup/company")}
        >
          I want to create a Company profile
        </Button>
      </div>
    </div>
  );
};

export default SignUpSelectionPage;
