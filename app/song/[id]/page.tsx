"use server";

import Like from "@/components/like";
import PlayButton from "@/components/play";
import { songs } from "@/utils/db";
import { ISong } from "@/utils/types";
import Image from "next/image";

export default async function SongPage({ params }: { params: { id: string } }) {
  let { id } = params;

  let res = await fetch(`http://localhost:3000/api/song/${id}`, {
    next: { revalidate: 10 },
  });

  let data: ISong = await res.json();

  return (
    <main className="mt-16 pb-36 text-white">
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          alt="song cover"
          className="min-w-[100px]  max-h-[100px] rounded mb-10"
          src={data.cover}
        />
        <h1 className="font-bold tablet:text-xl text-5xl mb-7">{data.name}</h1>
        <div className="flex">
          <p className="text-base tablet:text-sm  font-bold text-gray-300">
            {data.likes}:Likes
          </p>
        </div>
      </div>
      <div className="mt-14 w-full h-12 grid grid-cols-2 gap-6">
        <PlayButton data={data} />
        <Like id={data.id} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const data: ISong[] = songs.chain().find().limit(9).data();

  return data.map((s: ISong) => ({
    id: String(s.id),
  }));
}
