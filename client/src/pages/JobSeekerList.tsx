import { useGetAllJobSeekersQuery } from "@/redux/api/jobseekerSlice";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Mail,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import TransitionEffect from "@/components/ui/TransitionEffect";

export default function JobSeekerList() {
  const { data: jobSeekers, error, isLoading } = useGetAllJobSeekersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading talented job seekers...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-bold">Error: {error.message}</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  if (!jobSeekers || jobSeekers.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-xl font-medium">
          No job seekers found.
        </p>
        <p className="mt-2 text-gray-400">Check back later for new talent!</p>
      </div>
    );

  const filteredJobSeekers = jobSeekers.filter(
    (jobSeeker) =>
      jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobSeeker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobSeeker.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredJobSeekers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobSeekers = filteredJobSeekers.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <TransitionEffect />
      <h1 className="text-4xl font-bold mb-8 mt-16 text-center text-gray-800">
        Discover Top Talent
      </h1>
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-primary/20 focus:border-primary transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentJobSeekers.map((jobSeeker) => (
          <Card
            key={jobSeeker.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/micah/svg?seed=${jobSeeker.name}`}
                  />
                  <AvatarFallback>{jobSeeker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{jobSeeker.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {jobSeeker.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="font-semibold">{jobSeeker.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Position</p>
                  <p className="font-semibold">{jobSeeker.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Experience
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <p className="font-semibold">
                      {jobSeeker.experience || "Entry Level"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {jobSeeker.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium">
                    Well-Being Preferences
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      {jobSeeker.wellBeingPreferences.map((pref, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {pref}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium">
                    Profile Summary
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      {jobSeeker.jobSeekerProfile_summary ||
                        "No summary available."}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Progress value={(currentPage / totalPages) * 100} className="w-32" />
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
