import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import { useContext, useEffect, useState } from "react";

export default function AuthLike({ id }: { id: number }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token }: IContextJoin = useContext(JoinContext);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      let Res = await fetch(`http://localhost:3000/api/isliked/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token!,
        },
      });
      if (!Res.ok) throw Error();

      let data = await Res.json();
      setLoading(false);
      if (!data) setLiked(false);
      else setLiked(true);
    };
    api();
  }, [id, token]);

  if (loading)
    return (
      <button
        disabled
        className="w-full  bg-gray-700 font-bold h-12 rounded mb-8"
      >
        Loading..
      </button>
    );

  if (!liked)
    return (
      <button
        onClick={async () => {
          setLiked(true);
          await fetch(`http://localhost:3000/api/like/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token!,
            },
          });
        }}
        className="w-full border border-gray-500 bg-transparent text-white font-bold h-12 rounded mb-8"
      >
        Like
      </button>
    );

  return (
    <button
      onClick={async () => {
        setLiked(false);
        await fetch(`http://localhost:3000/api/dislike/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token!,
          },
        });
      }}
      className="w-full  bg-gray-700 font-bold h-12 rounded mb-8"
    >
      Dislike
    </button>
  );
}
