"use client";

import NothingHere from "@/utils/nothing";
import { IComment } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Comments({ data, id }: { data: IComment[]; id: number }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [Ivalue, setInput] = useState("");

  const HandlePost = async () => {
    let user = JSON.parse(localStorage.getItem("user")!);
    let clone: IComment[] = [...comments];
    clone.unshift({
      artist: user.id,
      details: Ivalue,
      song: id,
      info: { photo: user.photo, username: user.username },
    });
    setComments(clone);
    setInput("");

    let res = await fetch(`http://localhost:3000/api/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")!,
      },
      body: JSON.stringify({ details: Ivalue }),
    });

    console.log(await res.text());
  };

  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await HandlePost();
        }}
        className="mt-20 w-full"
      >
        <input
          className="w-full h-16 border border-gray-500 rounded-full font-bold bg-gray-800 p-4 text-white"
          placeholder="what's on your mind?"
          required
          minLength={1}
          name="details"
          value={Ivalue}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
      <h5 className="my-8 font-bold text-xl">Comments</h5>
      {Array.isArray(comments) && comments.length ? (
        comments.map((c, i) => {
          return <CommentCard key={i} data={c} />;
        })
      ) : (
        <NothingHere />
      )}
    </div>
  );
}

export default Comments;

function CommentCard({ data }: { data: IComment }) {
  return (
    <div className="mt-8 flex">
      <Link className="min-w-fit" href={`/artist/${data.artist}`}>
        <Image
          height={48}
          width={48}
          alt="profile image"
          src={data.info.photo}
          className="min-w-12 w-12  h-12  rounded-full"
        />
      </Link>
      <div className="h-fit ml-4 p-4 max-w-[512px] rounded-lg bg-gray-800">
        <Link href={`/artist/${data.artist}`} className="font-bold text-white">
          {data.info.username}
        </Link>
        <div className="font-bold mt-4 text-gray-300">{data.details}</div>
      </div>
    </div>
  );
}
