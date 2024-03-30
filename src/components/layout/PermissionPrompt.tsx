import { MESSAGES } from "@/config/constants";
import { Mic, Webcam } from "lucide-react";

const PermissionPrompt = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <Webcam size={40} />
        <Mic size={40} />
      </div>
      <p className="text-center">{MESSAGES.FAILURE.PERMISSIONS_REQUIRED}</p>
    </div>
  );
};

export default PermissionPrompt;
