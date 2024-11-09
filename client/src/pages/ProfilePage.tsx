import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { useFetchCompanyUserQuery, useFetchJobseekerUserQuery } from '../redux/api/fetchUserSlice'; // Adjust path

const ProfilePage = () => {

   console.log(useSelector((state: RootState) => state))

   const userRole = useSelector((state: RootState) => state.auth.role);


   // Fetch company or jobseeker data based on the user's role
   const { data: companyData, error: companyError, isLoading: companyLoading } = useFetchCompanyUserQuery(undefined, {
     skip: userRole !== 'company', // Only fetch company data if the user is a company
   });
   
   const { data: jobseekerData, error: jobseekerError, isLoading: jobseekerLoading } = useFetchJobseekerUserQuery(undefined, {
     skip: userRole !== 'jobseeker', // Only fetch jobseeker data if the user is a jobseeker
   });
 
   // Conditional rendering for loading, error, and data states
   if (companyLoading || jobseekerLoading) {
     return <div>Loading...</div>;
   }
 
   if (companyError) {
     return <div>Error fetching company data: {companyError.message}</div>;
   }
 
   if (jobseekerError) {
     return <div>Error fetching jobseeker data: {jobseekerError.message}</div>;
   }
 
   return (
     <div>
       {userRole === 'company' ? (
         <div>
           <h1>Company Profile</h1>
           <pre>{JSON.stringify(companyData, null, 2)}</pre>
         </div>
       ) : userRole === 'jobseeker' ? (
         <div>
           <h1>Jobseeker Profile</h1>
           <pre>{JSON.stringify(jobseekerData, null, 2)}</pre>
         </div>
       ) : (
         <div>No user data available.</div>
       )}
     </div>
   );
};

export default ProfilePage;