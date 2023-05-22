"use server";

import ArtistsSection from "@/components/artists_section";
import SongsSection from "@/components/songs_section";
import { IArtist, ISong } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

interface IData {
  discover: ISong[];
  popular: IArtist[];
}

export default async function Home() {
  let response = await fetch("http://localhost:3000/api/home", {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  let data: IData = await response.json();

  return (
    <main className="mt-20 pb-36  ">
      <section className="h-[320px] phone:p-2 p-8 bg-gray-800 rounded-[16px] flex justify-center flex-col tablet:items-center relative">
        <h3 className=" text-white tablet:text-center phone:text-3xl font-bold text-[32px] max-w-[416px] leading-[150%] ">
          You can now share music with your followers
        </h3>
        <Link
          className="h-12 w-fit text-black mt-7 rounded-full font-bold px-7 flex items-center justify-center bg-gradient1"
          href={"/upload"}
        >
          Start Uploading Now
        </Link>
        <Image
          width={273}
          height={368}
          alt="girl standing with headphone"
          className="absolute right-8 bottom-0 tablet:hidden"
          src="https://res.cloudinary.com/dwnvkwrox/image/upload/v1680784794/Landing_Image_q59zvq.png"
        />
      </section>
      <SongsSection title={"Discover"} data={data.discover} />
      <ArtistsSection title={"Popular Artists"} data={data.popular} />
    </main>
  );
}
