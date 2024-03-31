import GuestLoginScreen from "@/components/meeting/GuestLoginScreen";
import MeetingPage from "@/components/meeting/MeetingPage";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

interface IPageProps {
  params: { id: string };
  searchParams: { guest: string };
}

export function generateMetadata({ params: { id } }: IPageProps): Metadata {
  return {
    title: `Meeting: ${id}`,
  };
}

const Page = async ({
  params: { id },
  searchParams: { guest },
}: IPageProps) => {
  const user = await currentUser();

  if (!user && guest !== "true") {
    return <GuestLoginScreen />;
  }

  return <MeetingPage id={id} />;
};

export default Page;
