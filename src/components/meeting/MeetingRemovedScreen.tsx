import { MESSAGES } from "@/config/constants";
import GoBack from "../layout/GoBack";

const MeetingRemovedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">{MESSAGES.FAILURE.MEETING_REMOVED}</p>
      <GoBack />
    </div>
  );
};

export default MeetingRemovedScreen;
