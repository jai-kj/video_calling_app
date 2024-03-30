import { useStreamCall } from "@/app/hooks/useStreamCall";
import { MESSAGES } from "@/config/constants";
import {
  DeviceSettings,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";
import AudioVolumeIndicator from "../layout/AudioVolumeIndicator";
import Button from "../layout/Button";
import PermissionPrompt from "../layout/PermissionPrompt";

interface ISetupCallUIProps {
  onSetupComplete: () => void;
}

const SetupCallUI = ({ onSetupComplete }: ISetupCallUIProps) => {
  const call = useStreamCall();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const [micCamDisabled, setMicCamDisabled] = useState<boolean>(false);

  const cameraState = useCameraState();
  const microphoneState = useMicrophoneState();

  const handleMicCamEnable = useCallback(() => {
    call.camera.enable();
    call.microphone.enable();
  }, [call.camera, call.microphone]);

  const handleMicCamDisable = useCallback(() => {
    call.camera.disable();
    call.microphone.disable();
  }, [call.camera, call.microphone]);

  useEffect(() => {
    if (micCamDisabled) handleMicCamDisable();
    else handleMicCamEnable();

    return () => {
      handleMicCamDisable();
    };
  }, [handleMicCamEnable, handleMicCamDisable, micCamDisabled]);

  if (
    !cameraState.hasBrowserPermission ||
    !microphoneState.hasBrowserPermission
  ) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview className="w-full sm:w-[32rem]" />
      <div className="flex h-16 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={micCamDisabled}
          onChange={(e) => setMicCamDisabled(e.target.checked)}
        />
        {MESSAGES.SUCCESS.MIC_CAM_OFF}
      </label>
      <Button onClick={onSetupComplete}>Join meeting</Button>
    </div>
  );
};

export default SetupCallUI;