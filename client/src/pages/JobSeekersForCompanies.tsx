import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "@/redux/api/companySlice";
import { useGetAllJobSeekersQuery } from "@/redux/api/jobseekerSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  User,
  Heart,
  Target,
  Clipboard,
} from "lucide-react";
import TransitionEffect from "@/components/ui/TransitionEffect";
import { Link } from "react-router-dom";

const JobSeekersForCompanies = () => {
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const {
    data: companyData,
    error: companyError,
    isLoading: isCompanyLoading,
  } = useGetCompanyByIdQuery(id!);
  const {
    data: jobSeekerData,
    error: jobSeekerError,
    isLoading: isJobSeekerLoading,
  } = useGetAllJobSeekersQuery();

  if (isCompanyLoading || isJobSeekerLoading) return <div>Loading...</div>;
  if (companyError || jobSeekerError) return <div>Error loading data.</div>;

  const jobSeekers = jobSeekerData || [];
  const matchingJobSeekersWithScores = companyData?.matchingList
    .map((jobseekerMatch) => {
      const jobSeeker = jobSeekers.find(
        (js) => js.id === jobseekerMatch.jobSeekerId
      );
      return jobSeeker ? { ...jobSeeker, score: jobseekerMatch.score } : null;
    })
    .filter((js) => js !== null);

  const handleSwipe = (swipeDirection: number) => {
    if (isSwiping) return;
    setIsSwiping(true);
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsSwiping(false);
    }, 300);
  };

  const currentJobSeeker = matchingJobSeekersWithScores[currentIndex];

  if (!currentJobSeeker) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-purple-100 border border-purple-300">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              No more matches!
            </h2>
            <p className="text-gray-600">
              You've viewed all available job seeker matches. Check back later
              for new candidates!{" "}
            </p>
            <Link
              to="/jobseekers"
              className="text-purple-700 font-bold underline hover:text-purple-900"
            >
              Check out more talents
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-4">
      <TransitionEffect />
      <h1 className="text-3xl font-bold text-purple-800 mb-8">
        Your Job Seeker Matches
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
          <Card className="overflow-hidden shadow-xl bg-white border border-purple-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-purple-700">
                  {currentJobSeeker.name}
                </h2>
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full shadow-sm">
                  <Badge
                    variant="secondary"
                    className="text-xl font-semibold text-purple-800"
                  >
                    {currentJobSeeker.score.toFixed(1)}%
                  </Badge>
                  <span className="text-sm text-purple-400 font-medium">
                    Match Score
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-500" />
                  <span>{currentJobSeeker.position}</span>
                </div>
                <div className="flex items-center">
                  <Clipboard className="w-5 h-5 mr-2 text-purple-500" />
                  <span>Experience: {currentJobSeeker.experience} years</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-500" />
                    Skills:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentJobSeeker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Profile Summary:</h3>
                  <p className="text-gray-600">
                    {currentJobSeeker.jobSeekerProfile_summary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-purple-500" />
                    Well-being Preferences:
                  </h3>
                  <Progress
                    value={parseInt(currentJobSeeker.wellBeingPreferences)}
                    className="h-2 bg-purple-200"
                  />
                  <span className="text-sm text-gray-500 mt-1 block">
                    {currentJobSeeker.wellBeingPreferences}% alignment
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
              className="bg-white hover:bg-red-50 text-red-500 border-red-500"
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
              className="bg-purple-500 hover:bg-purple-600 text-white"
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

export default JobSeekersForCompanies;
