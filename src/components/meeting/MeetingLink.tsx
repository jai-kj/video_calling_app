import { APP_ROUTES, MESSAGES } from "@/config/constants";
import { Call } from "@stream-io/video-react-sdk";
import { Copy } from "lucide-react";
import Link from "next/link";

interface IMeetingLinkProps {
  call: Call;
}

interface ISendMailInvite {
  meetingLink: string;
  startsAt?: Date;
  description?: string;
}

const sendMailInvite = ({
  meetingLink,
  startsAt,
  description,
}: ISendMailInvite) => {
  const startDateFormatted = startsAt
    ? startsAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;

  const subject = `Join my meeting${startDateFormatted ? ` at ${startDateFormatted}` : ""}`;
  const body = `
    Join my meeting at
      ${meetingLink}.${
        startDateFormatted
          ? `\n\nThe meeting starts at ${startDateFormatted}`
          : ""
      }
      ${description ? `\n\nDescription: ${description}` : ""}
    
  `;

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const MeetingLink = ({ call }: IMeetingLinkProps) => {
  const meetingLink = APP_ROUTES.MEETING(call.id);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <span>Invitation link: </span>
        <div className="flex items-center gap-3">
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
          <button
            type="button"
            title="Copy invite link"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              alert(MESSAGES.SUCCESS.LINK_COPY);
            }}
          >
            <Copy />
          </button>
        </div>
      </div>
      <a
        href={sendMailInvite({
          meetingLink,
          startsAt: call.state.startsAt,
          description: call.state.custom.description,
        })}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send mail invitation
      </a>
    </div>
  );
};

export default MeetingLink;
