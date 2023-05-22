"use client";

import { IContextJoin } from "@/utils/types";
import { Context, ReactNode, createContext, useState } from "react";
import Login from "./login";
import Register from "./register";

export let JoinContext: Context<IContextJoin>;

function Join({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  JoinContext = createContext<IContextJoin>({ setShow });

  return (
    <div>
      <JoinContext.Provider value={{ setShow }}>
        {children}
      </JoinContext.Provider>
      {show ? <ModelBody /> : ""}
    </div>
  );
}

export default Join;

function ModelBody() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="z-10 translate-x-1/2 -translate-y-1/2 w-[448px] top-1/2 right-1/2 rounded-lg text-white bg-gray-800 p-7 border border-gray-500 fixed">
      {toggle ? <Login /> : <Register />}
    </div>
  );
}
