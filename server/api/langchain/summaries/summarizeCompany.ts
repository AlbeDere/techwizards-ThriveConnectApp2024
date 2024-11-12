import { ICompany } from "../../interfaces/ICompany";

export async function createCompanyProfileSummary(
  company: Partial<ICompany>
): Promise<string> {
  return new Promise(async (resolve) => {
    const companyDetails = `Company ${company.name} with email ${
      company.email
    } has a culture of ${company.companyCulture} with wellbeing metrics of ${
      company.wellBeingMetrics
    } is finding a candidate in position ${company.jobTitle} with skills in ${(
      company.skillsRequired ?? []
    ).join(", ")} and ${company.experienceRequired} years of experience`;
    resolve(companyDetails);
  });
}