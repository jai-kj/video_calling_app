import MeetingPage from "@/components/meeting/MeetingPage";
import { Metadata } from "next";

interface IPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: IPageProps): Metadata {
  return {
    title: `Meeting: ${id}`,
  };
}

const Page = ({ params: { id } }: IPageProps) => {
  return <MeetingPage id={id} />;
};

export default Page;
