import { useStreamCall } from "@/app/hooks/useStreamCall";
import { APP_ROUTES, MESSAGES } from "@/config/constants";
import Link from "next/link";
import { buttonClassNames } from "../layout/Button";

const UpcomingMeetingScreen = () => {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        {MESSAGES.FAILURE.MEETING_NOT_STARTED}{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}
      <Link href={APP_ROUTES.BASE_ROUTE} className={buttonClassNames}>
        Go home
      </Link>
    </div>
  );
};

export default UpcomingMeetingScreen;
