import {
  ParticipantView,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface IParticipantsOverSpeaker {
  otherParticipants: StreamVideoParticipant[];
  pageLimit?: number;
}

interface IRange {
  start: number;
  end: number;
}

const ParticipantsOverSpeaker = ({
  otherParticipants,
  pageLimit = 2,
}: IParticipantsOverSpeaker) => {
  const [range, setRange] = useState<IRange>({
    start: 0,
    end: Math.min(otherParticipants.length, pageLimit),
  });

  const hasPrev = useMemo(() => range.start > 0, [range.start]);
  const hasNext = useMemo(
    () => range.end < otherParticipants.length,
    [range.end, otherParticipants.length],
  );

  const handlePrev = useCallback(() => {
    if (!hasPrev) return;

    setRange((curr) => {
      const start = Math.max(0, curr.start - pageLimit);
      const end = Math.min(start + pageLimit, otherParticipants.length);
      return {
        start,
        end,
      };
    });
  }, [hasPrev, otherParticipants.length, pageLimit]);

  const handleNext = useCallback(() => {
    if (!hasNext) return;

    setRange((curr) => {
      const start = Math.min(curr.start + pageLimit, otherParticipants.length);
      const end = Math.min(start + pageLimit, otherParticipants.length);
      return {
        start,
        end,
      };
    });
  }, [hasNext, otherParticipants.length, pageLimit]);

  if (!otherParticipants.length) return <></>;
  return (
    <>
      <div className="flex justify-between bg-slate-800">
        <button
          type="button"
          title="previous"
          disabled={!hasPrev}
          onClick={handlePrev}
          className="text-white disabled:cursor-not-allowed disabled:text-gray-900"
        >
          <ChevronLeft className="h-4" />
        </button>
        <button
          type="button"
          title="next"
          disabled={!hasNext}
          onClick={handleNext}
          className="text-white disabled:cursor-not-allowed disabled:text-gray-900"
        >
          <ChevronRight className="h-4" />
        </button>
      </div>
      <div className="participants-bar flex flex-col">
        {otherParticipants.slice(range.start, range.end).map((participant) => (
          <div
            className="participant-tile h-full w-full"
            key={participant.sessionId}
          >
            <ParticipantView participant={participant} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ParticipantsOverSpeaker;
