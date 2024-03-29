import { Call } from "@stream-io/video-react-sdk";

interface IMeetingLinkProps {
  call: Call;
}

const MeetingLink = ({ call }: IMeetingLinkProps) => {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  return <div>{meetingLink}</div>;
};

export default MeetingLink;
