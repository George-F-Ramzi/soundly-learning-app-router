"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="w-full h-screen  bg-gray-800 p-8 tablet:p-2   flex-col flex items-center justify-center text-white">
          <h1 className="text-[156px] tablet:text-[48px] phone:text-[36px] leading-[150%] font-bold">
            2<span className="text-emerald-400">0</span>2
          </h1>
          <h1 className="leading-[150%] tablet:text-[36px] phone:text-[20px] text-center font-bold text-[64px]">
            SOMETHING WRONG
            <br />
            JUST HAPPEN
          </h1>

          <Link
            href={"/"}
            className=" mt-6 text-black tablet:px-4 tablet:text-sm text-lg tablet:py-2 font-bold  px-[48px] py-[12px] bg-gradient1 rounded-full"
          >
            GO HOME
          </Link>
        </div>
      </body>
    </html>
  );
}
