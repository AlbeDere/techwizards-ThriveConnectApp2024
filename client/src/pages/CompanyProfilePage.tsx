import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "@/redux/api/companySlice";
import { useGetJobSeekerByIdQuery } from "@/redux/api/jobseekerSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  Briefcase,
  GraduationCap,
  Mail,
  ThumbsUp,
  Star,
  Heart,
  X,
} from "lucide-react";
import TransitionEffect from "@/components/ui/TransitionEffect";

const CompanyProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: company, error, isLoading } = useGetCompanyByIdQuery(id!);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) return <CompanyProfileSkeleton />;
  if (error) return <ErrorMessage />;

  const sortedMatchingList = company?.matchingList
    ? [...company.matchingList].sort((a, b) => b.score - a.score)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <TransitionEffect />
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-500" />
          <CardHeader className="relative">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white absolute -top-12">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${company?.name}`}
                />
                <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-28 pt-4 py-2">
                <CardTitle className="text-3xl font-bold">
                  {company?.name}
                </CardTitle>
                <CardDescription className="text-xl">
                  Hiring {company?.jobTitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="matches">Talent Arena</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-5 mt-7">
                <InfoItem
                  icon={<Mail />}
                  label="Email"
                  value={company?.email}
                />
                <InfoItem
                  icon={<Building2 />}
                  label="Company Culture"
                  value={company?.companyCulture}
                />
                <InfoItem
                  icon={<Briefcase />}
                  label="Experience Required"
                  value={company?.experienceRequired}
                />
                <InfoItem
                  icon={<GraduationCap />}
                  label="Skills Required"
                  value={company?.skillsRequired.join(", ")}
                />
                <InfoItem
                  label="Profile Summary"
                  value={company?.companyProfile_summary || "Not available"}
                />
              </TabsContent>
              <TabsContent value="matches">
                <TalentArena matchingList={sortedMatchingList} />
              </TabsContent>
              <TabsContent value="feedback">
                <Feedback feedback={company?.feedback || []} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-2">
    {icon && <div className="text-purple-500">{icon}</div>}
    <span className="font-semibold">{label}:</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

const TalentArena = ({
  matchingList,
}: {
  matchingList: Array<{ jobSeekerId: string; score: number }>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextCandidate = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matchingList.length);
  };

  const prevCandidate = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + matchingList.length) % matchingList.length
    );
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <Badge variant="secondary" className="text-lg">
          Candidate {currentIndex + 1} of {matchingList.length}
        </Badge>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              nextCandidate();
            } else if (swipe > swipeConfidenceThreshold) {
              prevCandidate();
            }
          }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <JobSeekerCard
            key={matchingList[currentIndex].jobSeekerId}
            jobSeekerId={matchingList[currentIndex].jobSeekerId}
            score={matchingList[currentIndex].score}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button onClick={prevCandidate} variant="outline" size="icon">
          <X className="h-4 w-4" />
        </Button>
        <Button onClick={nextCandidate} variant="outline" size="icon">
          <Heart className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

const JobSeekerCard = ({
  jobSeekerId,
  score,
}: {
  jobSeekerId: string;
  score: number;
}) => {
  const {
    data: jobSeeker,
    isLoading,
    error,
  } = useGetJobSeekerByIdQuery(jobSeekerId);

  if (isLoading) return <CardSkeleton />;
  if (error || !jobSeeker) return null;

  return (
    <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="h-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/personas/svg?seed=${jobSeekerId}`}
            />
            <AvatarFallback>{jobSeeker.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <Badge variant="secondary" className="text-2xl font-bold mb-2">
              {score.toFixed(1)}% Match
            </Badge>
            <div className="flex justify-end">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(score / 20)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{jobSeeker.name}</h3>
        <p className="text-muted-foreground text-lg mb-4">
          {jobSeeker.position}
        </p>
        <div className="space-y-4">
          <Progress value={score} className="h-2" />
          <div className="flex flex-wrap gap-2">
            {jobSeeker.skills.map((skill, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="text-sm py-1 px-2">
                      {skill}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Skill: {skill}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Feedback = ({ feedback }: { feedback: string[] }) => (
  <div className="space-y-4">
    {feedback.length > 0 ? (
      feedback.map((item, index) => (
        <Card key={index}>
          <CardContent className="flex items-start space-x-4 p-4">
            <ThumbsUp className="w-5 h-5 mt-1 text-purple-500" />
            <p>{item}</p>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-muted-foreground">No feedback available.</p>
    )}
  </div>
);

const CompanyProfileSkeleton = () => (
  <div className="max-w-6xl mx-auto p-4">
    <Card>
      <div className="h-32 bg-gradient-to-r from-purple-200 to-indigo-200 animate-pulse" />
      <CardHeader className="relative">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 absolute -top-12 animate-pulse" />
          <div className="ml-28 pt-4 space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
        ))}
      </CardContent>
    </Card>
  </div>
);

const CardSkeleton = () => (
  <Card className="w-full max-w-md overflow-hidden">
    <div className="h-4 bg-gray-200 animate-pulse" />
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ErrorMessage = () => (
  <div className="max-w-6xl mx-auto p-4">
    <Card className="bg-red-50">
      <CardContent className="p-6">
        <p className="text-lg font-semibold text-red-600">
          Error loading profile
        </p>
        <p className="text-muted-foreground">
          Please try again later or contact support if the problem persists.
        </p>
      </CardContent>
    </Card>
  </div>
);

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default CompanyProfilePage;
