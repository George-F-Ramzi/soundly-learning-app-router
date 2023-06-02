import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import { useContext, useEffect, useState } from "react";

export default function AuthFollow({ id }: { id: number }) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token }: IContextJoin = useContext(JoinContext);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      let Res = await fetch(
        `https://soundly-peach.vercel.app/api/followed/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token!,
          },
        }
      );
      if (!Res.ok) throw Error();

      let data = await Res.json();
      setLoading(false);
      if (!data) setFollowed(false);
      else setFollowed(true);
    };
    api();
  }, [id, token]);

  if (loading)
    return (
      <button
        disabled
        className="mt-16 w-full bg-gray-600 text-gray-300 font-bold p-4 rounded mb-8"
      >
        Loading..
      </button>
    );

  if (!followed)
    return (
      <button
        onClick={async () => {
          setFollowed(true);
          await fetch(`https://soundly-peach.vercel.app/api/follow/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token!,
            },
          });
        }}
        className="mt-16 w-full bg-gradient1 text-black font-bold p-4 rounded mb-8"
      >
        Follow
      </button>
    );

  return (
    <button
      onClick={async () => {
        setFollowed(false);
        await fetch(`https://soundly-peach.vercel.app/api/unfollow/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token!,
          },
        });
      }}
      className="mt-16 w-full bg-transparent border border-gray-500 text-white font-bold p-4 rounded mb-8"
    >
      UnFollow
    </button>
  );
}
