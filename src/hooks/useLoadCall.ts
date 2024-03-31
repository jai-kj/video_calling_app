import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useLoadCall = (id: string) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [callLoading, setCallLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCall = async () => {
      setCallLoading(true);
      try {
        if (!client) return;

        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (!calls.length) return;

        const call = calls[0];
        await call.get();
        setCall(call);
      } catch (err) {
        console.error(err);
      } finally {
        setCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return {
    call,
    callLoading,
  };
};
