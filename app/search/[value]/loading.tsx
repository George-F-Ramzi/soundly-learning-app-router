import { RiLoader2Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <RiLoader2Fill
        size={"96px"}
        className="text-emerald-400 mt-20 animate-spin"
      />
    </div>
  );
}
