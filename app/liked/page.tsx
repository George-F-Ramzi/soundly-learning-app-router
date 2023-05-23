"use client";

import SongsSection from "@/components/songs_section";
import { ISong } from "@/utils/types";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Liked() {
  const [data, setData] = useState<ISong[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = async () => {
      let Res = await fetch("http://localhost:3000/api/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")!,
        },
      });
      if (!Res.ok) throw Error();

      let data = await Res.json();
      setData(data);
      setLoading(false);
    };
    api();
  }, []);

  if (loading) return <Loading />;

  return <SongsSection title={"Liked Songs"} data={data!} />;
}
