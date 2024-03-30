import { MESSAGES } from "@/config/constants";
import { useCall } from "@stream-io/video-react-sdk";

export const useStreamCall = () => {
  const call = useCall();

  if (!call) {
    throw new Error(MESSAGES.FAILURE.STREAM_CALL_NOT_FOUND);
  }

  return call;
};
