import { useGetJobSeekerByIdQuery } from "@/redux/api/jobseekerSlice";
import React from "react";
import { useParams } from "react-router-dom";

const JobSeekerProfilePage = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from URL params

  // Fetch the job seeker by id using the RTK query hook
  const { data, error, isLoading } = useGetJobSeekerByIdQuery(id!);  // id! to avoid undefined

  if (isLoading) return <div>Loading...</div>;  // Handle loading state
  if (error) return <div>Error loading profile</div>;  // Handle error state

  return (
    <div>
      <h1>Job Seeker Profile</h1>
      {/* Display the job seeker data */}
      {data && (
        <div>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          {/* You can display more fields depending on the JobSeeker data */}
        </div>
      )}
    </div>
  );
};

export default JobSeekerProfilePage;
