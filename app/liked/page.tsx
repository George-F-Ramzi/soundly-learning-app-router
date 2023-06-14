"use client";

import SongsSection from "@/components/songs_section";
import { IContextJoin, ISong } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading";
import JoinContext from "@/utils/join_context";

export default function Liked() {
  const [data, setData] = useState<ISong[]>();
  const [loading, setLoading] = useState(true);
  const { token }: IContextJoin = useContext(JoinContext);

  useEffect(() => {
    const api = async () => {
      let Res = await fetch("http://localhost:3000/api/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token!,
        },
      });
      if (!Res.ok) throw Error();

      let data = await Res.json();
      setData(data);
      setLoading(false);
    };
    api();
  }, [token]);

  if (loading) return <Loading />;

  return <SongsSection title={"Liked Songs"} data={data!} />;
}
