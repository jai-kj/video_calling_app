import { APP_ROUTES, MESSAGES } from "@/config/constants";
import Link from "next/link";
import { buttonClassNames } from "../layout/Button";

const MeetingEndedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">{MESSAGES.FAILURE.MEETING_ENDED}</p>
      <Link href={APP_ROUTES.BASE_ROUTE} className={buttonClassNames}>
        Go home
      </Link>
    </div>
  );
};

export default MeetingEndedScreen;
