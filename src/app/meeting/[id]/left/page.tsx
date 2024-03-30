import { buttonClassNames } from "@/components/layout/Button";
import { APP_ROUTES, MESSAGES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

interface IPageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: IPageProps): Metadata {
  return {
    title: `Left Meeting: ${id}`,
  };
}

const MeetingLeftPage = ({ params: { id } }: IPageProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">{MESSAGES.SUCCESS.MEETING_LEFT}</p>
      <Link
        href={APP_ROUTES.MEETING(id)}
        className={cn(
          buttonClassNames,
          "bg-gray-500 hover:bg-gray-600 active:bg-gray-600",
        )}
      >
        Rejoin
      </Link>
    </div>
  );
};

export default MeetingLeftPage;
