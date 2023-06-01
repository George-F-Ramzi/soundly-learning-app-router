"use client";

import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import { useContext } from "react";
import AuthFollow from "./auth_follow";

export default function Follow({ id }: { id: number }) {
  const { token, me }: IContextJoin = useContext(JoinContext);

  //
  if (me?.id === id) return <></>;

  if (token !== "") return <AuthFollow id={id} />;

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
