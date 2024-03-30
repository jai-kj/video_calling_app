import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import CallLayouts from "../layout/CallLayouts";

const OngoingCallUI = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  return <CallLayouts />;
};

export default OngoingCallUI;
