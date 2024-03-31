import { useStreamCall } from "@/hooks/useStreamCall";
import { APP_ROUTES, CallLayout } from "@/config/constants";
import { CallControls } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CallLayoutView from "./CallLayoutView";
import EndCallButton from "./EndCallButton";
import ToggleCallLayoutButtonGroup from "./ToggleCallLayoutButtonGroup";

const CallLayouts = () => {
  const call = useStreamCall();
  const router = useRouter();
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
      <CallControls
        onLeave={() => router.push(APP_ROUTES.LEFT_MEETING(call.id))}
      />
      <EndCallButton />
    </div>
  );
};

export default CallLayouts;
