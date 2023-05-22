"use client";

import { ReactNode, useState } from "react";
import Login from "./login";
import Register from "./register";
import JoinContext from "@/utils/join_context";

export default function Join({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(true);

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
    <div className="z-10 translate-x-1/2 -translate-y-1/2 max-w-[448px] w-[448px] top-1/2 right-1/2 rounded-lg text-white bg-gray-800 p-7 border border-gray-500 fixed">
      {toggle ? <Login toggle={setToggle} /> : <Register toggle={setToggle} />}
    </div>
  );
}
