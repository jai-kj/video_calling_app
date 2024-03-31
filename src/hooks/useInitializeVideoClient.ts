import { MESSAGES } from "@/config/constants";
import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { getToken } from "../app/actions";

export const useInitializeVideoClient = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (!userLoaded) return;

    let streamUser: User;
    if (!user?.id) {
      const id = nanoid();
      streamUser = {
        id,
        name: `Guest ${id}`,
        type: "guest",
      };
    } else {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    if (!apiKey) {
      throw new Error(MESSAGES.FAILURE.NO_STREAM_API_KEY);
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.username, user?.imageUrl, userLoaded]);

  return videoClient;
};
