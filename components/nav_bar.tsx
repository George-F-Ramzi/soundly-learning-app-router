"use client";

import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthNav from "./auth_nav";
import { RiSearch2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { token }: IContextJoin = useContext(JoinContext);

  if (token === "") return <UnAuth />;

  return <AuthNav />;
}

function UnAuth() {
  let navigate = useRouter();
  const [Ivalue, setIvalue] = useState("");
  const { setShow }: IContextJoin = useContext(JoinContext);
  return (
    <nav className="h-12 flex items-center justify-between">
      <Link
        href={"/"}
        className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#06ff3d] to-[#2bffcc] font-bold"
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
      <button
        onClick={() => setShow && setShow(true)}
        className="h-12  rounded-full font-bold px-7 flex items-center justify-center bg-gradient1"
      >
        Join
      </button>
    </nav>
  );
}
