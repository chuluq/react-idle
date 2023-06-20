import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

interface IReactIdle {
  timeout: number;
  promptBeforeIdle: number;
}

export default function ReactIdleTimer({
  timeout,
  promptBeforeIdle,
}: IReactIdle) {
  const router = useRouter();

  const [remaining, setRemaining] = useState<number>(timeout);
  const [open, setOpen] = useState<boolean>(false);

  const onIdle = () => {
    setOpen(false);
    router.push("/login");
  };

  const onActive = () => {
    setOpen(false);
  };

  const onPrompt = () => {
    setOpen(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1_000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleLogout = () => {
    router.push("/login");
  };

  const handleStillHere = () => {
    activate();
  };

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1_000, 0);
  const seconds = timeTillPrompt > 1 ? "seconds" : "second";

  return (
    <>
      <h1>React Idle Timer</h1>
      <h2>Confirm Prompt</h2>
      <br />
      {timeTillPrompt > 0 ? (
        <p>
          {timeTillPrompt} {seconds} until prompt
        </p>
      ) : null}
      <div className={`${open ? "flex" : "hidden"} modal`}>
        <h3>Are you still here?</h3>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-red-400 text-white px-2 py-1 rounded font-medium"
          >
            Logout {remaining} seconds
          </button>
          <button
            onClick={handleStillHere}
            className="bg-blue-400 text-white px-2 py-1 rounded font-medium cursor-pointer"
          >
            Im still here
          </button>
        </div>
      </div>
    </>
  );
}
