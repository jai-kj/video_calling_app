import { useNavigationEvent } from "@/hooks/useNavigationEvent";
import { useStreamCall } from "@/hooks/useStreamCall";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import CallLayouts from "../layout/CallLayouts";

const OngoingCallUI = () => {
  const call = useStreamCall();

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const handleMicCamDisable = useCallback(() => {
    call.camera.disable();
    call.microphone.disable();
  }, [call.camera, call.microphone]);

  const closeCallIfPathChange = useCallback(() => {
    call.leave();
    handleMicCamDisable();
  }, [call, handleMicCamDisable]);

  useNavigationEvent({ onPathChange: closeCallIfPathChange });

  if (callingState !== CallingState.JOINED) {
    return <Loader2 className="mx-auto animate-spin" />;
  }
  return <CallLayouts />;
};

export default OngoingCallUI;
