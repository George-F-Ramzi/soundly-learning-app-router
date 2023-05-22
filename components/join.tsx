"use client";

import { ReactNode, useState } from "react";
import Login from "./login";
import Register from "./register";
import JoinContext from "@/utils/join_context";
import { RiCloseLine } from "react-icons/ri";

export default function Join({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <JoinContext.Provider value={{ setShow }}>
        {children}
      </JoinContext.Provider>
      {show ? <ModelBody show={setShow} /> : ""}
    </div>
  );
}

function ModelBody({ show }: { show: (v: boolean) => void }) {
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
          <Login toggle={setToggle} />
        ) : (
          <Register toggle={setToggle} />
        )}
      </div>
    </div>
  );
}
