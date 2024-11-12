import { IJobSeeker } from "../../interfaces/IJobSeeker";

// TODO: Create embeddings for each job seeker record
export async function createJobSeekerProfileSummary(
  jobseeker: Partial<IJobSeeker>
): Promise<string> {
  return new Promise(async (resolve) => {
    const jobSeekerDetails = `${jobseeker.name} is a ${
      jobseeker.position
    } with ${jobseeker.experience} years of experience. Has Skills included: ${(
      jobseeker.skills ?? []
    ).join(", ")}. And Well-being preferences are: ${(
      jobseeker.wellBeingPreferences ?? []
    ).join(", ")}`;
    resolve(jobSeekerDetails);
  });
}
