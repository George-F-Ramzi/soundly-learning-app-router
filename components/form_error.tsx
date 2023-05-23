"use client";

export default function FormErrorText({ text }: { text: string }) {
  return (
    <div className=" mb-4 p-2 bg-red-500 rounded-[4px] font-bold">{text}</div>
  );
}
