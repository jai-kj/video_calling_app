import { useStreamCall } from "@/hooks/useStreamCall";
import {
  combineComparators,
  Comparator,
  conditional,
  dominantSpeaker,
  ParticipantView,
  pinned,
  publishingAudio,
  publishingVideo,
  reactionType,
  screenSharing,
  SfuModels,
  speaking,
  StreamVideoParticipant,
  useCallStateHooks,
  VisibilityState,
} from "@stream-io/video-react-sdk";
import { useEffect, useMemo } from "react";
import FloatingBrowserWindow from "./FloatingBrowserWindow";
import ParticipantsOverSpeaker from "./ParticipantsOverSpeaker";

const hasScreenShare = (p: StreamVideoParticipant) =>
  p.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE);

const getCustomSortingPreset = (
  isOneToOneCall: boolean = false,
): Comparator<StreamVideoParticipant> => {
  // 1:1 calls are a special case, where we want to always show the other
  // participant in the spotlight, and not show them in the participants bar.
  if (isOneToOneCall) {
    return (a: StreamVideoParticipant, b: StreamVideoParticipant) => {
      if (a.isLocalParticipant) return 1;
      if (b.isLocalParticipant) return -1;
      return 0;
    };
  }

  // a comparator decorator which applies the decorated comparator only if the
  // participant is invisible.
  // This ensures stable sorting when all participants are visible.
  const ifInvisibleBy = conditional(
    (a: StreamVideoParticipant, b: StreamVideoParticipant) =>
      a.viewportVisibilityState?.videoTrack === VisibilityState.INVISIBLE ||
      b.viewportVisibilityState?.videoTrack === VisibilityState.INVISIBLE,
  );

  // the custom sorting preset
  return combineComparators(
    screenSharing,
    dominantSpeaker,
    pinned,
    ifInvisibleBy(speaking),
    ifInvisibleBy(reactionType("raised-hand")),
    ifInvisibleBy(publishingVideo),
    ifInvisibleBy(publishingAudio),
  );
};

const SpeakerFullLayout = () => {
  const call = useStreamCall();
  const { useParticipants } = useCallStateHooks();

  const [participantInSpotlight, ...otherParticipants] = useParticipants();

  const moreParticipants = useMemo(
    () => otherParticipants.length > 0,
    [otherParticipants],
  );

  const screenShareOn = useMemo(
    () => hasScreenShare(participantInSpotlight),
    [participantInSpotlight],
  );

  const showFloatingWindowOnScreenShare = useMemo(
    () => moreParticipants && screenShareOn,
    [moreParticipants, screenShareOn],
  );

  const remainingParticipants = useMemo(() => {
    return [
      ...otherParticipants,
      ...(screenShareOn ? [participantInSpotlight] : []),
    ];
  }, [otherParticipants, participantInSpotlight, screenShareOn]);

  const isOneToOneCall = useMemo(
    () => otherParticipants.length === 1,
    [otherParticipants.length],
  );

  useEffect(() => {
    const customSortingPreset = getCustomSortingPreset(isOneToOneCall);
    call.setSortParticipantsBy(customSortingPreset);
  }, [call, isOneToOneCall]);

  return (
    <div className="speaker-view">
      <div className="spotlight relative overflow-x-hidden">
        {participantInSpotlight && (
          <ParticipantView
            className={`
              ${screenShareOn ? "aspect-video" : "h-screen"}`}
            participant={participantInSpotlight}
            trackType={screenShareOn ? "screenShareTrack" : "videoTrack"}
          />
        )}

        {/* show participants over spotlight person when not sharing screen */}
        {!showFloatingWindowOnScreenShare && (
          <div className="absolute bottom-0 right-0 flex w-1/2 flex-col md:w-1/4">
            <ParticipantsOverSpeaker otherParticipants={otherParticipants} />
          </div>
        )}
      </div>

      {/* Show remaining participants on screen share */}
      {screenShareOn && (
        <div className="mt-6 w-full overflow-x-auto">
          <div className="mx-auto block w-fit">
            <div className="participants-bar flex space-x-6">
              {remainingParticipants.map((participant) => (
                <div
                  className="participant-tile min-w-40 max-w-40 sm:min-w-60 sm:max-w-60 md:min-w-80 md:max-w-80"
                  key={participant.sessionId}
                >
                  <ParticipantView participant={participant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Open in new window, only for laptops with xl screen */}
      {/* available only on screen share */}
      {showFloatingWindowOnScreenShare && (
        <FloatingBrowserWindow call={call}>
          <div className="bg-slate-700">
            <ParticipantsOverSpeaker
              otherParticipants={remainingParticipants}
              pageLimit={1}
            />
          </div>
        </FloatingBrowserWindow>
      )}
    </div>
  );
};

export default SpeakerFullLayout;
