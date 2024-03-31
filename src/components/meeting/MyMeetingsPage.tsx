"use client";

import { APP_ROUTES, MESSAGES } from "@/config/constants";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyMeeting from "./MyMeeting";

const MyMeetingsPage = () => {
  const router = useRouter();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [callList, setCallList] = useState<Call[]>();

  useEffect(() => {
    if (!client || !user?.id) {
      router.push(APP_ROUTES.BASE_ROUTE);
      return;
    }

    const loadCalls = async () => {
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
          watch: true,
        });

        setCallList(calls);
      } catch (err) {
        console.error(err);
        setCallList([]);
      }
    };

    loadCalls();
  }, [client, router, user?.id]);

  return (
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-bold">My Meetings</h1>
      {!callList ? (
        <Loader2 className="mx-auto animate-spin" />
      ) : !callList.length ? (
        <p>{MESSAGES.FAILURE.MEETINGS_NOT_FOUND}</p>
      ) : (
        <ul className="list-inside list-disc space-y-2">
          {callList.map((call) => (
            <StreamCall key={call.id} call={call}>
              <MyMeeting call={call} user={user!} />
            </StreamCall>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyMeetingsPage;
