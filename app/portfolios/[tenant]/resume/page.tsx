import { getProfile } from "@/lib/dbMock";
import ResumeClient from "@/components/ResumeClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ResumePageProps {
  params: Promise<{
    tenant: string;
  }>;
}

// Generate static parameters for Next.js static HTML export
export async function generateStaticParams() {
  return [
    { tenant: "alex-smith" },
  ];
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { tenant } = await params;
  const profile = await getProfile(tenant);

  if (!profile) {
    return { title: "Resume Not Found" };
  }

  return {
    title: `${profile.personal.fullName} - Executive Resume (ATS-Vetted)`,
    description: `Official professional credentials of ${profile.personal.fullName}.`,
  };
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { tenant } = await params;
  const profile = await getProfile(tenant);

  if (!profile) {
    notFound();
  }

  return <ResumeClient profile={profile} tenant={tenant} />;
}
