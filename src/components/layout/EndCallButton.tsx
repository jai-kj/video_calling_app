import { useStreamCall } from "@/app/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMemo } from "react";
import Button from "./Button";

const EndCallButton = () => {
  const call = useStreamCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isParticipantCallOwner = useMemo(() => {
    return (
      localParticipant &&
      call.state.createdBy &&
      localParticipant.userId === call.state.createdBy.id
    );
  }, [localParticipant, call.state.createdBy]);

  if (!isParticipantCallOwner) {
    return <></>;
  }

  return (
    <Button
      onClick={call.endCall}
      className="mx-auto block bg-red-500 font-medium hover:bg-red-600 active:bg-red-600"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
