import React, { useState } from "react";
import { useGetAllCompaniesQuery } from "@/redux/api/companySlice";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MessageCircle,
  Search,
  Users,
  MapPin,
  Star,
} from "lucide-react";
import TransitionEffect from "@/components/ui/TransitionEffect";

const CompaniesList = () => {
  const { data, error, isLoading } = useGetAllCompaniesQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <CompaniesListSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data || data.length === 0) return <NoCompaniesFound />;

  const filteredCompanies = data.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.skillsRequired.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <TransitionEffect />
      <h1 className="text-5xl font-bold mt-16 mb-8 text-center bg-gradient-to-r from-primary to-primary-foreground text-transparent bg-clip-text">
        Discover Amazing Companies
      </h1>
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search companies, job titles, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-primary/20 focus:border-primary transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCompanies.map((company, index) => (
            <CompanyCard key={company.id} company={company} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CompanyCard = ({ company, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/identicon/svg?seed=${company.name}`}
            />
            <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{company.name}</CardTitle>
            <CardDescription className="text-lg">
              {company.jobTitle}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Building2 className="w-4 h-4" />
          <span>
            {company.companyCulture || "Culture information not available"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {company.skillsRequired &&
            company.skillsRequired.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {skill}
              </Badge>
            ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{company.summary}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{company.employeeCount || "N/A"} employees</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{company.location || "Location N/A"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-primary" />
            <span>{company.rating || "N/A"} rating</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {company.feedback.length} feedback(s)
          </span>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

const CompaniesListSkeleton = () => (
  <div className="container mx-auto py-12 px-4">
    <Skeleton className="w-64 h-10 mb-8 mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div>
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-4 mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-16 h-6 rounded-full" />
              ))}
            </div>
            <Skeleton className="w-full h-20 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-full h-4" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <Skeleton className="w-full h-8" />
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="container mx-auto py-12 px-4 text-center">
    <h2 className="text-3xl font-bold text-red-600 mb-4">
      Oops! Something went wrong
    </h2>
    <p className="text-xl text-muted-foreground mb-4">
      We encountered an error while fetching the companies.
    </p>
    <p className="text-lg text-muted-foreground">{error.message}</p>
    <Button className="mt-8" onClick={() => window.location.reload()}>
      Try Again
    </Button>
  </div>
);

const NoCompaniesFound = () => (
  <div className="container mx-auto py-12 px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">No Companies Found</h2>
    <p className="text-xl text-muted-foreground mb-8">
      It looks like there are no companies available at the moment.
    </p>
    <Button asChild>
      <Link to="/">Return to Home</Link>
    </Button>
  </div>
);

export default CompaniesList;
