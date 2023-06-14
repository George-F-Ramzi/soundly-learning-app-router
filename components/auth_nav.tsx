"use client";

import { RiSearch2Line, RiInboxArchiveLine, RiHeartLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IArtist } from "@/utils/types";
import SideBar from "./side_bar";
import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";

export default function AuthNav() {
  let navigate = useRouter();
  const [Ivalue, setIvalue] = useState("");
  const [data, setData] = useState<IArtist>();
  const { token, setMe }: IContextJoin = useContext(JoinContext);

  useEffect(() => {
    const api = async () => {
      let Res = await fetch("https://soundly-peach.vercel.app/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token!,
        },
      });
      if (!Res.ok) throw Error;

      let data: IArtist = await Res.json();
      setMe && setMe(data);
      setData(data);
    };
    api();
  }, [setMe, token]);

  if (!data)
    return (
      <nav className="h-12 flex items-center justify-between">
        <Link
          href={"/"}
          className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#06ff3d] to-[#2bffcc] font-bold"
        >
          Soundly
        </Link>
        <h5 className="text-white">Loading...</h5>
      </nav>
    );

  //

  return (
    <nav className="h-12 flex items-center justify-between">
      <Link
        href={"/"}
        className="text-xl  text-transparent bg-clip-text bg-gradient-to-r from-[#06ff3d] to-[#2bffcc] font-bold"
      >
        Soundly
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate.push(`/search/${Ivalue}`);
        }}
      >
        <div className="w-[280px] mx-4 h-full tablet:hidden  relative rounded-full  border-gray-500 border-[0.4px] ">
          <input
            placeholder="Search"
            className="w-full h-full  rounded-full border-none outline-none bg-gray-800 text-gray-300  p-4"
            value={Ivalue}
            onChange={(e) => setIvalue(e.currentTarget.value)}
          />

          <RiSearch2Line
            size={"24px"}
            className="absolute right-4 top-[14px] text-gray-300 "
          />
        </div>
      </form>
      <div className="flex min-w-fit tablet:hidden">
        <Link
          href={"/upload"}
          className="h-12  rounded-full font-bold px-7 flex items-center justify-center bg-gradient1"
        >
          Upload
        </Link>
        <Link
          className="h-12 min-w-12 w-12 rounded-full ml-4  flex items-center justify-center bg-gradient1"
          href={"/inbox"}
        >
          <RiInboxArchiveLine size={"26px"} />
        </Link>
        <Link
          className="h-12  min-w-12 w-12 rounded-full ml-4  flex items-center justify-center bg-gradient1"
          href={"/liked"}
        >
          <RiHeartLine size={"26px"} />
        </Link>
        <div>
          <Link href={`/artist/${data.id}`}>
            <Image
              height={48}
              width={48}
              alt="profile image"
              src={data.cover}
              className="h-12 w-12 cursor-pointer rounded-full ml-4 "
            />
          </Link>
        </div>
      </div>
      <SideBar id={data.id} />
    </nav>
  );
}
