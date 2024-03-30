"use client";

import { useLoadCall } from "@/app/hooks/useLoadCall";
import { MESSAGES, STREAM_CALL_TYPES } from "@/config/constants";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import MeetingScreen from "./MeetingScreen";

interface IMeetingPageProps {
  id: string;
}

const MeetingPage = ({ id }: IMeetingPageProps) => {
  const { user, isLoaded: userLoaded } = useUser();
  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return (
      <p className="text-center font-bold">{MESSAGES.FAILURE.CALL_NOT_FOUND}</p>
    );
  }

  const notAllowedToJoin =
    call.type === STREAM_CALL_TYPES.PRIVATE &&
    (!user || !call.state.members.find((member) => member.user_id === user.id));

  if (notAllowedToJoin) {
    return (
      <p className="text-center font-bold">
        {MESSAGES.FAILURE.UNAUTHORIZED_CALL}
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
