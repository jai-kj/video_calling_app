import { useUser } from "@clerk/nextjs";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useLoadRecordings = (call: Call) => {
  const { user } = useUser();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadRecordings = async () => {
      setLoading(true);
      try {
        const { recordings } = await call.queryRecordings();
        setRecordings(recordings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecordings();
  }, [user?.id, call]);

  return {
    recordings,
    recordingsLoading: loading,
  };
};
