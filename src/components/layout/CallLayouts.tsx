import { useStreamCall } from "@/app/hooks/useStreamCall";
import { CallLayout } from "@/config/constants";
import { CallControls } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallLayoutView from "./CallLayoutView";
import EndCallButton from "./EndCallButton";
import ToggleCallLayoutButtonGroup from "./ToggleCallLayoutButtonGroup";

const CallLayouts = () => {
  const call = useStreamCall();
  const [currentLayout, setCurrentLayout] = useState<CallLayout>(
    CallLayout.VERTICAL,
  );

  return (
    <div className="space-y-3">
      <ToggleCallLayoutButtonGroup
        layout={currentLayout}
        handleLayoutChange={setCurrentLayout}
      />
      <CallLayoutView layout={currentLayout} />
      <CallControls />
      <EndCallButton />
    </div>
  );
};

export default CallLayouts;
