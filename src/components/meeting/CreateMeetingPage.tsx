"use client";

import { getUserIdsFromEmail } from "@/app/actions";
import { STREAM_CALL_MEMBER, STREAM_CALL_TYPES } from "@/config/constants";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Button from "../layout/Button";
import DescriptionInput from "./DescriptionInput";
import MeetingLink from "./MeetingLink";
import ParticipantsInput from "./ParticipantsInput";
import StartTimeInput from "./StartTimeInput";

const CreateMeetingPage = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [startTimeInput, setStartTimeInput] = useState<string>("");
  const [participantsInput, setParticipantsInput] = useState<string>("");
  const [call, setCall] = useState<Call>();

  const getParticipantsEmails = () => {
    if (!participantsInput.trim()) return [];

    const regex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return participantsInput.split(",").reduce((acc, email) => {
      const emailAddress = email.trim();
      if (emailAddress && regex.test(emailAddress)) acc.push(emailAddress);
      return acc;
    }, [] as string[]);
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !client) return;

    try {
      const meetingId = crypto.randomUUID();

      const participantEmails = getParticipantsEmails();
      const call = client.call(
        participantEmails.length
          ? STREAM_CALL_TYPES.PRIVATE
          : STREAM_CALL_TYPES.DEFAULT,
        meetingId,
      );

      const memberIds = await getUserIdsFromEmail(participantEmails);
      const members: MemberRequest[] = memberIds
        .map((id) => ({
          user_id: id,
          role: STREAM_CALL_MEMBER,
        }))
        .concat({ user_id: user.id, role: STREAM_CALL_MEMBER })
        .filter(
          (user, index, arr) =>
            arr.findIndex(
              (searchUser) => searchUser.user_id === user.user_id,
            ) === index,
        );

      await call.getOrCreate({
        data: {
          members,
          starts_at: new Date(startTimeInput || Date.now()).toISOString(),
          custom: { description: descriptionInput.trim() },
        },
      });
      setCall(call);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Please try again later.");
    }
  };

  if (!user || !client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username}!
      </h1>
      <form className="meeting-form mx-auto w-80 space-y-6 rounded-md p-5">
        <h2 className="text-xl font-bold">Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          handleUpdate={setDescriptionInput}
        />
        <StartTimeInput
          value={startTimeInput}
          handleUpdate={setStartTimeInput}
        />
        <ParticipantsInput
          value={participantsInput}
          handleUpdate={setParticipantsInput}
        />
        <Button type="submit" className="w-full" onClick={handleCreateMeeting}>
          Create meeting
        </Button>
      </form>
      {call && <MeetingLink call={call} />}
    </div>
  );
};

export default CreateMeetingPage;
