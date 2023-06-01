"use client";

import { ReactNode, useEffect, useState } from "react";
import Login from "./login";
import Register from "./register";
import JoinContext from "@/utils/join_context";
import { RiCloseLine } from "react-icons/ri";
import { IArtist } from "@/utils/types";

export default function Join({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [me, setMe] = useState<IArtist>();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  return (
    <div>
      <JoinContext.Provider value={{ setShow, token, setToken, setMe, me }}>
        {children}
      </JoinContext.Provider>
      {show ? (
        <ModelBody setShow={setShow} setToken={setToken} show={setShow} />
      ) : (
        ""
      )}
    </div>
  );
}

function ModelBody({
  show,
  setToken,
  setShow,
}: {
  show: (v: boolean) => void;
  setToken: (v: string) => void;
  setShow: (v: boolean) => void;
}) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-screen bg-black bg-opacity-50 z-10 translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2 flex items-center justify-center fixed h-screen">
      <div className="z-20 m-4 phone:px-3 max-w-[440px] relative rounded-lg text-white bg-gray-800 p-7 border border-gray-500 ">
        <RiCloseLine
          onClick={() => show(false)}
          size={28}
          className="absolute cursor-pointer right-4 top-4"
        />
        {toggle ? (
          <Login setToken={setToken} setShow={setShow} toggle={setToggle} />
        ) : (
          <Register setShow={setShow} setToken={setToken} toggle={setToggle} />
        )}
      </div>
    </div>
  );
}
