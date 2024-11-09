import { useGetCompanyByIdQuery } from '@/redux/api/companySlice';
import React from 'react'
import { useParams } from 'react-router-dom';

const CompanyProfilePage = () => {
   const { id } = useParams<{ id: string }>();

   const { data, error, isLoading } = useGetCompanyByIdQuery(id!);

   if (isLoading) return <div>Loading...</div>;  // Handle loading state
   if (error) return <div>Error loading profile</div>; 




  return (
    <div>
      <h1>Company Profile</h1>
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
}

export default CompanyProfilePage
