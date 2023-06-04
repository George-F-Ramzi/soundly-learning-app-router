"use client";

import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import { useContext } from "react";
import AuthLike from "./auth_like";

export default function Like({ id }: { id: number }) {
  const { token }: IContextJoin = useContext(JoinContext);

  if (token !== "") return <AuthLike id={id} />;

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
      className="w-full border border-gray-500 bg-transparent text-white font-bold h-12 rounded mb-8"
    >
      Like
    </button>
  );
}
