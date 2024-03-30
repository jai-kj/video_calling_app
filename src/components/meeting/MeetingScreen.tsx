import { useStreamCall } from "@/app/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingEndedScreen from "./MeetingEndedScreen";
import SetupCallUI from "./SetupCallUI";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";

const MeetingScreen = () => {
  const call = useStreamCall();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const handleSetupComplete = () => {
    call.join();
    setSetupComplete(true);
  };

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  const description = call.state.custom.description;

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-center">
          Meeting description: <span className="font-bold">{description}</span>
        </p>
      )}
      {setupComplete ? (
        "Call UI"
      ) : (
        <SetupCallUI onSetupComplete={handleSetupComplete} />
      )}
    </div>
  );
};

export default MeetingScreen;
