import { useStreamCall } from "@/app/hooks/useStreamCall";
import { MESSAGES } from "@/config/constants";
import GoBack from "../layout/GoBack";

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
      <GoBack />
    </div>
  );
};

export default UpcomingMeetingScreen;
