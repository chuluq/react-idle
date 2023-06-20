import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIdleTimer } from "react-idle-timer";

export const useIdleTimeout = ({ idleTime = 1 }: { idleTime: number }) => {
  const router = useRouter();

  const idleTimeout = 1000 * idleTime;
  const [state, setState] = useState<string>("Active");
  const [remaining, setRemaining] = useState<number>(0);

  const handleIdle = () => {
    setState("Idle");
    console.log("idle");
    router.replace("/login");
  };

  const { getRemainingTime } = useIdleTimer({
    timeout: idleTimeout,
    throttle: 500,
    onIdle: handleIdle,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return {
    state,
    remaining,
  };
};

export default useIdleTimeout;
