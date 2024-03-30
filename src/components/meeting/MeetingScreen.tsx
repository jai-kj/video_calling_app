import { useCallStateHooks } from "@stream-io/video-react-sdk";
import MeetingEndedScreen from "./MeetingEndedScreen";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";

const MeetingScreen = () => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  return <div>Call UI</div>;
};

export default MeetingScreen;
