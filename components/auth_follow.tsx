import { useEffect, useState } from "react";

export default function AuthFollow({ id }: { id: number }) {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      let Res = await fetch(`http://localhost:3000/api/followed/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")!,
        },
      });
      if (!Res.ok) throw Error();

      let data = await Res.json();
      setLoading(false);
      if (!data) setFollowed(false);
      else setFollowed(true);
    };
    api();
  }, [id]);

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
          await fetch(`http://localhost:3000/api/follow/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token")!,
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
        await fetch(`http://localhost:3000/api/unfollow/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")!,
          },
        });
      }}
      className="mt-16 w-full bg-transparent border border-gray-500 text-white font-bold p-4 rounded mb-8"
    >
      UnFollow
    </button>
  );
}
