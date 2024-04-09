import { CallLayout } from "@/config/constants";
import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import SpeakerFullLayout from "./SpeakerFullLayout";

interface ICallLayoutViewProps {
  layout: CallLayout;
}

const CallLayoutView = ({ layout }: ICallLayoutViewProps) => {
  switch (layout) {
    case CallLayout.VERTICAL:
      return <SpeakerLayout />;

    case CallLayout.HORIZONTAL:
      return <SpeakerLayout participantsBarPosition="right" />;

    case CallLayout.SPEAKER_FULLSCREEN:
      return <SpeakerFullLayout />;

    case CallLayout.GRID:
    default:
      return <PaginatedGridLayout />;
  }
};

export default CallLayoutView;
