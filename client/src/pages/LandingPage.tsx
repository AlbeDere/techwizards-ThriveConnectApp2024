import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Building,
  Heart,
  Search,
  ThumbsUp,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import Marquee from "@/components/ui/marquee";
import { motion, AnimatePresence } from "framer-motion";

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Specialist",
];

export default function LandingPage() {
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitles[0]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [idFromToken, setIdFromToken] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobTitle((prevTitle) => {
        const nextIndex = (jobTitles.indexOf(prevTitle) + 1) % jobTitles.length;
        return jobTitles[nextIndex];
      });
    }, 2000);

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decodedToken: any = jwtDecode(savedToken);
      setUserRole(decodedToken.role);
      setIdFromToken(decodedToken.id);
    }

    return () => clearInterval(interval);
  }, []);

  const getNavigationPath = (targetPath: string) => {
    return userRole ? targetPath : "/signup";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 " />

      <main className="container mx-auto px-4 py-8 relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full py-2 px-4 mb-16 backdrop-blur-sm"
        >
          <Marquee className="text-purple-800 font-medium" pauseOnHover={true}>
            <span className="mx-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New job postings every day!
            </span>
            <span className="mx-4 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Find your dream job today!
            </span>
            <span className="mx-4 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Top companies are hiring now!
            </span>
            <span className="mx-4 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              Boost your career with our expert tips!
            </span>
          </Marquee>
        </motion.div>

        <section className="text-center mb-24 relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                Swipe Right
              </span>
              <span className="block text-gray-800 mb-2">
                for Your Dream Job as a
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentJobTitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  {currentJobTitle}
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Match with your ideal career opportunities in seconds. Our
              AI-powered platform connects job seekers and companies like never
              before.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-col items-center gap-6"
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg h-12 px-8"
              >
                <Link to="/signup">Get Started Free</Link>
              </Button>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-24">
          {(!userRole || userRole === "jobseeker") && (
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-8 relative bg-gradient-to-br from-purple-50 to-white h-full">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-block bg-purple-100 rounded-2xl p-4 mb-6"
                  >
                    <Briefcase className="w-8 h-8 text-purple-600" />
                  </motion.div>

                  <h2 className="text-2xl font-bold mb-4 text-purple-900">
                    For Job Seekers
                  </h2>

                  <p className="text-gray-600 mb-6 text-lg">
                    Discover opportunities that match your skills, experience,
                    and career goals. Swipe right on your dream job!
                  </p>

                  <Button
                    variant="ghost"
                    asChild
                    className="group text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Link
                      to={getNavigationPath(`/companies/${idFromToken}`)}
                      className="flex items-center gap-2"
                    >
                      Explore opportunities
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {(!userRole || userRole === "company") && (
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-8 relative bg-gradient-to-br from-indigo-50 to-white h-full">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-block bg-indigo-100 rounded-2xl p-4 mb-6"
                  >
                    <Building className="w-8 h-8 text-indigo-600" />
                  </motion.div>

                  <h2 className="text-2xl font-bold mb-4 text-indigo-900">
                    For Companies
                  </h2>

                  <p className="text-gray-600 mb-6 text-lg">
                    Find the perfect candidates for your open positions. Swipe
                    right on talent that fits your company culture.
                  </p>

                  <Button
                    variant="ghost"
                    asChild
                    className="group text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <Link
                      to={getNavigationPath(`/job-seeker/${idFromToken}`)}
                      className="flex items-center gap-2"
                    >
                      Find talent
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        <section className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Create Your Profile",
                description:
                  "Set up your profile with your skills, experience, and preferences.",
                color: "purple",
              },
              {
                icon: Search,
                title: "Swipe Through Matches",
                description:
                  "Browse through job opportunities or candidates that match your criteria.",
                color: "indigo",
              },
              {
                icon: ThumbsUp,
                title: "Connect and Succeed",
                description:
                  "Match with your ideal job or candidate and take the next step in your career.",
                color: "purple",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`inline-block rounded-2xl p-4 mb-6 ${
                        step.color === "purple"
                          ? "bg-purple-100"
                          : "bg-indigo-100"
                      }`}
                    >
                      <step.icon
                        className={`w-8 h-8 ${
                          step.color === "purple"
                            ? "text-purple-600"
                            : "text-indigo-600"
                        }`}
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {step.title}
                    </h3>

                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Ready to Find Your Perfect Match?
            </h2>

            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg h-12 px-8"
            >
              <Link to="/signup">Get Started Now</Link>
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
