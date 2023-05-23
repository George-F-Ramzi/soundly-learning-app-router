"use client";

import JoinContext from "@/utils/join_context";
import { IArtist, IContextJoin } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import AuthFollow from "./auth_follow";

export default function Follow({ id }: { id: number }) {
  const [myID, setMyID] = useState<number>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    let token: string = localStorage.getItem("token")!;
    setToken(token);
  }, []);

  useEffect(() => {
    let user: IArtist = JSON.parse(localStorage.getItem("user")!);
    if (user) setMyID(user.id);
  }, [token]);

  //
  if (myID === id) return <></>;

  if (token) return <AuthFollow id={id} />;

  return <UnAuth />;
}

//
function UnAuth() {
  const { setShow }: IContextJoin = useContext(JoinContext);

  return (
    <button
      onClick={() => {
        setShow && setShow(true);
      }}
      className="mt-16 w-full bg-gradient1 text-black font-bold p-4 rounded mb-8"
    >
      Follow
    </button>
  );
}
