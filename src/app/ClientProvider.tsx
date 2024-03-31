"use client";

import { StreamVideo } from "@stream-io/video-react-sdk";
import { useInitializeVideoClient } from "../hooks/useInitializeVideoClient";
import { Loader2 } from "lucide-react";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default ClientProvider;
