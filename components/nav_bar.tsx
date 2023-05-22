"use client";

import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthNav from "./auth_nav";

export default function NavBar() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token")!);
  }, []);

  if (token === "") return <UnAuth />;

  return <AuthNav />;
}

function UnAuth() {
  const { setShow }: IContextJoin = useContext(JoinContext);
  return (
    <nav className="h-12 flex items-center justify-between">
      <Link
        href={"/"}
        className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#06ff3d] to-[#2bffcc] font-bold"
      >
        Soundly
      </Link>
      <button
        onClick={() => setShow && setShow(true)}
        className="h-12  rounded-full font-bold px-7 flex items-center justify-center bg-gradient1"
      >
        Join
      </button>
    </nav>
  );
}
