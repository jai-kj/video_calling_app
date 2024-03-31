import { APP_ROUTES, STREAM_CALL_TYPES } from "@/config/constants";
import type { UserResource } from "@clerk/types";
import { Call, useCallStateHooks } from "@stream-io/video-react-sdk";
import Link from "next/link";
import { useMemo } from "react";
import Button from "../layout/Button";

interface IMyMeetingProps {
  call: Call;
  user: UserResource;
}

const MyMeeting = ({ call, user }: IMyMeetingProps) => {
  const meetingLink = APP_ROUTES.MEETING(call.id);
  const owner = "You";

  const { useCallEndedAt, useCallStartsAt, useCallCreatedBy } =
    useCallStateHooks();

  const callCreatedBy = useCallCreatedBy();
  const startsAt = useCallStartsAt();
  const hasEnded = useCallEndedAt();

  const isInFuture = useMemo(
    () => startsAt && new Date(startsAt) > new Date(),
    [startsAt],
  );

  const meetingOwner = useMemo(
    () => (user.id === callCreatedBy?.id ? owner : callCreatedBy?.name),
    [user.id, callCreatedBy],
  );

  const canTerminate = useMemo(
    () => meetingOwner === owner && !hasEnded,
    [hasEnded, meetingOwner],
  );

  return (
    <li className="relative">
      <Link href={meetingLink} className="hover:underline">
        {startsAt?.toLocaleString()}
        {isInFuture && " (Upcoming)"}
        {hasEnded && " (Ended)"} &#128279;
      </Link>
      {call.type === STREAM_CALL_TYPES.PRIVATE && (
        <label className="ml-3 rounded-full bg-blue-500 px-2 py-1 text-white">
          &#128274; private
        </label>
      )}
      {call.state.custom.description && (
        <p className="ml-6 text-gray-500">
          Description: {call.state.custom.description}
        </p>
      )}
      <p className="ml-6 text-gray-500">Created by: {meetingOwner}</p>
      {canTerminate && (
        <Button
          className="relative right-0 top-0 mx-5 my-3 bg-red-500 hover:bg-red-600 active:bg-red-600 md:absolute md:m-0"
          onClick={call.endCall}
        >
          Terminate Call
        </Button>
      )}
    </li>
  );
};

export default MyMeeting;
