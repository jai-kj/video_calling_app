import { MESSAGES } from "@/config/constants";
import { useLoadRecordings } from "@/hooks/useLoadRecordings";
import { useStreamCall } from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const MeetingRecordingList = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const call = useStreamCall();
  const { recordings, recordingsLoading } = useLoadRecordings(call);

  if (userLoaded && !user)
    return (
      <p className="text-center">{MESSAGES.FAILURE.UNAUTHORIZED_RECORDINGS}</p>
    );

  if (recordingsLoading) return <Loader2 className="mx-auto animate-spin" />;

  return (
    <div className="space-y-3 text-center">
      {!recordings.length ? (
        <p>{MESSAGES.FAILURE.RECORDINGS_NOT_FOUND}</p>
      ) : (
        <ul className="list-inside list-disc">
          {recordings
            .sort((a, b) => b.end_time.localeCompare(a.end_time))
            .map((recording) => (
              <li key={recording.url}>
                <Link
                  href={recording.url}
                  target="_blank"
                  className="hover:underline"
                >
                  {new Date(recording.end_time).toLocaleString()}
                </Link>
              </li>
            ))}
        </ul>
      )}
      <p className="text-sm text-gray-500">
        {MESSAGES.SUCCESS.RECORDINGS_NOTE.map((note, i) => (
          <Fragment key={i}>
            {note}
            {i + 1 !== MESSAGES.SUCCESS.RECORDINGS_NOTE.length && <br />}
          </Fragment>
        ))}
      </p>
    </div>
  );
};

export default MeetingRecordingList;
