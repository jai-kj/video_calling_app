import { MESSAGES } from "@/config/constants";
import GoBack from "../layout/GoBack";
import MeetingRecordingList from "./MeetingRecordingList";

const MeetingEndedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">{MESSAGES.FAILURE.MEETING_ENDED}</p>
      <GoBack />
      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <MeetingRecordingList />
      </div>
    </div>
  );
};

export default MeetingEndedScreen;
