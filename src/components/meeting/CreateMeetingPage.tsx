"use client";

import { STREAM_CALL_TYPES } from "@/config/constants";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";
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

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !client) return;

    try {
      const meetingId = crypto.randomUUID();
      const call = client.call(STREAM_CALL_TYPES.DEFAULT, meetingId);

      await call.getOrCreate({
        data: {
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
      <form className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
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
        <button type="submit" className="w-full" onClick={handleCreateMeeting}>
          Create meeting
        </button>
      </form>
      {call && <MeetingLink call={call} />}
    </div>
  );
};

export default CreateMeetingPage;
