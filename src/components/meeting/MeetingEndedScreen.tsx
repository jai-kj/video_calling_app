import { MESSAGES } from "@/config/constants";
import GoBack from "../layout/GoBack";

const MeetingEndedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">{MESSAGES.FAILURE.MEETING_ENDED}</p>
      <GoBack />
    </div>
  );
};

export default MeetingEndedScreen;
