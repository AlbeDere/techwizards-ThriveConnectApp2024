import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Building,
  Heart,
  Zap,
  Search,
  ThumbsUp,
} from "lucide-react";
import Marquee from "@/components/ui/marquee";

const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Specialist",
];

export default function LandingPage() {
  const [currentJobTitle, setCurrentJobTitle] = useState(jobTitles[0]);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobTitle((prevTitle) => {
        const nextIndex = (jobTitles.indexOf(prevTitle) + 1) % jobTitles.length;
        return jobTitles[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 overflow-hidden">
      <main className="container mx-auto px-4 py-16 relative">
        <Marquee
          className="mb-8 text-purple-600 font-semibold"
          pauseOnHover={true}
        >
          <span className="mx-4">New job postings every day!</span>
          <span className="mx-4">Find your dream job today!</span>
          <span className="mx-4">Top companies are hiring now!</span>
          <span className="mx-4">Boost your career with our expert tips!</span>
        </Marquee>

        <section className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4 relative z-10">
            <span className="block text-purple-600">Swipe Right</span>
            <span className="block text-indigo-600">
              for Your Dream Job as a
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 ease-in-out">
              {currentJobTitle}
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Match with your ideal career opportunities in seconds. Our
            AI-powered platform connects job seekers and companies like never
            before.
          </p>
          <div className="mt-10 flex justify-center gap-4 relative z-10">
            <Button size="lg" asChild className="animate-bounce">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:bg-purple-100 transition-colors duration-300"
            >
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Briefcase className="w-12 h-12 text-purple-500 mb-4 relative z-10" />
              <h2 className="text-2xl font-bold mb-2 relative z-10">
                For Job Seekers
              </h2>
              <p className="text-gray-600 mb-4 relative z-10">
                Discover opportunities that match your skills, experience, and
                career goals. Swipe right on your dream job!
              </p>
              <Button variant="link" asChild className="group relative z-10">
                <Link to="/job-seeker" className="flex items-center">
                  Create Profile
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-indigo-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Building className="w-12 h-12 text-indigo-500 mb-4 relative z-10" />
              <h2 className="text-2xl font-bold mb-2 relative z-10">
                For Companies
              </h2>
              <p className="text-gray-600 mb-4 relative z-10">
                Find the perfect candidates for your open positions. Swipe right
                on talent that fits your company culture.
              </p>
              <Button variant="link" asChild className="group relative z-10">
                <Link to="/company" className="flex items-center">
                  Post a Job
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16 relative">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Create Your Profile",
                description:
                  "Set up your profile with your skills, experience, and preferences.",
              },
              {
                icon: Search,
                title: "Swipe Through Matches",
                description:
                  "Browse through job opportunities or candidates that match your criteria.",
              },
              {
                icon: ThumbsUp,
                title: "Connect and Succeed",
                description:
                  "Match with your ideal job or candidate and take the next step in your career.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group"
                onMouseEnter={() => setShowCard(index)}
                onMouseLeave={() => setShowCard(false)}
              >
                <div
                  className={`bg-white rounded-lg p-6 shadow-md transform transition-all duration-300 ${
                    showCard === index ? "scale-105" : "scale-100"
                  }`}
                >
                  <div
                    className={`rounded-full p-4 inline-block mb-4 ${
                      index % 2 === 0 ? "bg-purple-100" : "bg-indigo-100"
                    }`}
                  >
                    <step.icon
                      className={`w-8 h-8 ${
                        index % 2 === 0 ? "text-purple-500" : "text-indigo-500"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">
            Ready to Find Your Perfect Match?
          </h2>
          <Button
            size="lg"
            asChild
            className="relative z-10 animate-pulse hover:animate-none"
          >
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </section>

        <div className="fixed bottom-4 right-4 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
          >
            <Zap className="mr-2" /> Quick Match
          </Button>
        </div>
      </main>
    </div>
  );
}
