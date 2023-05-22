export default function Login({
  toggle,
}: {
  toggle: (value: boolean) => void;
}) {
  return (
    <div>
      Login
      <button onClick={() => toggle(false)}>toggle</button>
    </div>
  );
}
