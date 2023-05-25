"use client";

import { InboxCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightCircleLine } from "react-icons/ri";
import Loading from "../loading";
import NothingHere from "@/utils/nothing";

export default function Inbox() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InboxCardType[]>();

  useEffect(() => {
    const api = async () => {
      let Res = await fetch("http://localhost:3000/api/inbox", {
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

  return (
    <main className="h-full max-w-[544px] scrollbar-hide overflow-y-scroll m-auto">
      <h5 className="text-white mt-12 mb-8 font-bold text-xl">Notifications</h5>
      {Array.isArray(data) && data.length ? (
        data.map((e, i) => {
          return <InboxCard key={i} data={e} />;
        })
      ) : (
        <NothingHere />
      )}
    </main>
  );
}

function InboxCard({ data }: { data: InboxCardType }) {
  const handleTo = () => {
    if (data.message_detail.includes("Started")) {
      return `/artist/${data.trigger_id}`;
    }
    if (data.message_detail.includes("Commented")) {
      return `/song/${data.song_id}`;
    }

    if (data.message_detail.includes("Uploaded")) {
      return `/song/${data.song_id}`;
    }

    return `/song/${data.song_id}`;
  };

  return (
    <div className="mb-4 phone:p-3 h-[100px] rounded p-[20px] flex items-center bg-gray-800  text-white">
      <Link href={`/artist/${data.trigger_id}`}>
        <Image
          height={72}
          width={72}
          alt="Proifle Image"
          src={data.trigger.photo_url}
          className="w-12 min-w-[72px] phone:min-w-[56px] phone:h-[56px] h-[72px] rounded-full"
        />
      </Link>
      <div className="grow phone:ml-2 ml-4">
        <Link
          href={`/artist/${data.trigger_id}`}
          className="text-gray-300  tablet:text-sm"
        >
          {data.trigger.username}
        </Link>
        <h5 className="font-bold  phone:text-base  phone:mt-1 mt-2 text-lg">
          {data.message_detail}
        </h5>
      </div>
      <Link href={handleTo()}>
        <RiArrowRightCircleLine size={"32px"} />
      </Link>
    </div>
  );
}
