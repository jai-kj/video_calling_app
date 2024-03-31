import { useStreamCall } from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingEndedScreen from "./MeetingEndedScreen";
import MeetingRemovedScreen from "./MeetingRemovedScreen";
import OngoingCallUI from "./OngoingCallUI";
import SetupCallUI from "./SetupCallUI";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";

const MeetingScreen = () => {
  const { user } = useUser();
  const call = useStreamCall();
  const {
    useCallEndedAt,
    useCallStartsAt,
    useCallCallingState,
    useCallBlockedUserIds,
  } = useCallStateHooks();
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();
  const callingState = useCallCallingState();

  const blockedUsers = useCallBlockedUserIds();
  const currentParticipant = user && user.id;

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const callBlocked =
    currentParticipant && blockedUsers.includes(currentParticipant);

  const handleSetupComplete = () => {
    if (callingState !== CallingState.IDLE) {
      return;
    }

    call.join();
    setSetupComplete(true);
  };

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  if (callBlocked) {
    return <MeetingRemovedScreen />;
  }

  const description = call.state.custom.description;

  return (
    <div className="space-y-6">
      {setupComplete ? (
        <OngoingCallUI />
      ) : (
        <>
          {description && (
            <p className="text-center">
              Meeting description:{" "}
              <span className="font-bold">{description}</span>
            </p>
          )}
          <SetupCallUI onSetupComplete={handleSetupComplete} />
        </>
      )}
    </div>
  );
};

export default MeetingScreen;
