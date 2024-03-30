import {
  createSoundDetector,
  Icon,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const AudioVolumeIndicator = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { isEnabled, mediaStream } = useMicrophoneState();
  const [audioLevel, setAudioLevel] = useState<number>(0);

  useEffect(() => {
    if (!isEnabled || !mediaStream) return;

    const disposeSoundDetector = createSoundDetector(
      mediaStream,
      ({ audioLevel: al }) => setAudioLevel(al),
      {
        detectionFrequencyInMs: 80,
        destroyStreamOnStop: false,
      },
    );

    return () => {
      disposeSoundDetector().catch((err) => console.error(err));
    };
  }, [isEnabled, mediaStream]);

  if (!isEnabled) return <></>;

  return (
    <div className="flex w-72 items-center gap-3 rounded-md bg-slate-900 p-4">
      <Icon icon="mic" />
      <div className="h-1.5 flex-1 rounded-md bg-white">
        <div
          className="h-full w-full origin-left bg-blue-500"
          style={{ transform: `scaleX(${audioLevel / 100})` }}
        />
      </div>
    </div>
  );
};

export default AudioVolumeIndicator;
