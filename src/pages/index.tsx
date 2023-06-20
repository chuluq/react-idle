import ReactIdleTimer from "./ReactIdleTimer";

export default function HomePage() {
  return (
    <div>
      <p>Hello</p>
      <ReactIdleTimer timeout={15_000} promptBeforeIdle={5_000} />
    </div>
  );
}
