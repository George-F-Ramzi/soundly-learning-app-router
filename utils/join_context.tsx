"use client";

import { createContext } from "react";
import { IContextJoin } from "./types";

let JoinContext = createContext<IContextJoin>({});

export default JoinContext;
