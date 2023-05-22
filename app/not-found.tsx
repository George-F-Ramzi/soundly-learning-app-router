import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full p-8 tablet:p-2  h-full flex-col flex items-center justify-center text-white">
      <h1 className="text-[156px] tablet:text-[48px] phone:text-[36px] leading-[150%] font-bold">
        4<span className="text-emerald-400">0</span>4
      </h1>
      <h1 className="leading-[150%] tablet:text-[36px] phone:text-[20px] text-center font-bold text-[64px]">
        SORRY,THERE’S
        <br />
        NOTHING TO SHOW HERE
      </h1>
      <Link
        href={"/"}
        className="mt-[48px] text-black tablet:px-4 tablet:text-sm text-lg tablet:py-2 font-bold  px-[48px] py-[12px] bg-gradient1 rounded-full"
      >
        GO HOME
      </Link>
    </div>
  );
}
