"use client";

import { createContext } from "react";
import { IContextPlayer } from "./types";

let PlayerContext = createContext<IContextPlayer>({});

export default PlayerContext;
