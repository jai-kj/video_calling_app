import { CallLayout } from "@/config/constants";
import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";

interface ICallLayoutViewProps {
  layout: CallLayout;
}

const CallLayoutView = ({ layout }: ICallLayoutViewProps) => {
  switch (layout) {
    case CallLayout.VERTICAL:
      return <SpeakerLayout />;

    case CallLayout.HORIZONTAL:
      return <SpeakerLayout participantsBarPosition="right" />;

    case CallLayout.GRID:
    default:
      return <PaginatedGridLayout />;
  }
};

export default CallLayoutView;
