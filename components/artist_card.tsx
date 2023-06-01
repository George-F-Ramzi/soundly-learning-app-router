"use client";

import { IArtist } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function ArtistCard({ data }: { data: IArtist }) {
  return (
    <Link
      href={`/artist/${data.id}`}
      className="w-full cursor-pointer p-[8px] flex items-center  h-[80px] bg-gray-800 text-white rounded-[4px]"
    >
      <Image
        width={64}
        height={64}
        src={data.cover}
        alt={`${data.name}`}
        className="min-w-[64px] h-full rounded"
      />
      <section className="ml-4 grow ">
        <h5 className="font-bold mb-1 grow">{data.name}</h5>
        <p className="text-gray-300">{data.followers}:Followers</p>
      </section>
    </Link>
  );
}
