import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllCompaniesQuery } from "@/redux/api/companySlice";
import { useGetJobSeekerByIdQuery } from "@/redux/api/jobseekerSlice";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  Building2,
  Clock,
  Zap,
} from "lucide-react";
import TransitionEffect from "@/components/ui/TransitionEffect";
import { Link } from "react-router-dom";

const CompaniesForUser = () => {
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const {
    data: jobSeekerData,
    error: jobSeekerError,
    isLoading: isJobSeekerLoading,
  } = useGetJobSeekerByIdQuery(id!);
  const {
    data: companiesData,
    error: companiesError,
    isLoading: isCompaniesLoading,
  } = useGetAllCompaniesQuery();

  if (isJobSeekerLoading || isCompaniesLoading) return <div>Loading...</div>;
  if (jobSeekerError || companiesError) return <div>Error loading data.</div>;

  const companies = companiesData || [];
  const matchingCompaniesWithScores = jobSeekerData?.matchingList
    .map((companyMatch) => {
      const company = companies.find((c) => c.id === companyMatch.companyId);
      return company ? { ...company, score: companyMatch.score } : null;
    })
    .filter((company) => company !== null);

  const handleSwipe = (swipeDirection: number) => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsSwiping(false);
    }, 300);
  };

  const currentCompany = matchingCompaniesWithScores[currentIndex];

  if (!currentCompany) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">No more matches!</h2>
            <p className="text-gray-600">
              You've viewed all available company matches. Check back later for
              new opportunities!{" "}
            </p>
            <Link
              className="text-purple-700 font-bold underline hover:text-purple-900"
              to="/companies"
            >
              Check out more companies
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <TransitionEffect />
      <h1 className="text-3xl font-bold text-indigo-800 mb-8">
        Your Company Matches
      </h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 * direction }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden shadow-xl rounded-lg bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-indigo-700">
                  {currentCompany.jobTitle}
                </h2>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {currentCompany.score.toFixed(1)}% Match
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-indigo-500" />
                  <span className="font-semibold">{currentCompany.name}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-500" />
                  <span>
                    {currentCompany.experienceRequired} years experience
                    required
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-indigo-500" />
                    Skills Required:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCompany.skillsRequired.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Company Profile:</h3>
                  <p className="text-gray-600">
                    {currentCompany.companyProfile_summary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                    Well-being Metrics:
                  </h3>
                  <Progress
                    value={parseInt(currentCompany.wellBeingMetrics)}
                    className="h-2"
                  />
                  <span className="text-sm text-gray-500 mt-1 block">
                    {currentCompany.wellBeingMetrics}% employee satisfaction
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-8 space-x-4">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-red-50 text-red-500 border-red-500 transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => handleSwipe(-1)}
              disabled={isSwiping}
            >
              <ThumbsDown className="w-6 h-6 mr-2" />
              Pass
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => handleSwipe(1)}
              disabled={isSwiping}
            >
              <ThumbsUp className="w-6 h-6 mr-2" />
              Interested
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompaniesForUser;
