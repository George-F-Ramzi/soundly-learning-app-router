export default function Register({
  toggle,
}: {
  toggle: (value: boolean) => void;
}) {
  return (
    <div>
      register
      <button onClick={() => toggle(true)}>toggle</button>
    </div>
  );
}
