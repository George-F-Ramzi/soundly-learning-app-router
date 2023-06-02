"use client";

import JoinContext from "@/utils/join_context";
import { IContextJoin } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";

export default function Upload() {
  const navigate = useRouter();
  const [Loading, setLoading] = useState(false);
  const [song, setSong] = useState("");
  const [cover, setCover] = useState("");
  const { me, token }: IContextJoin = useContext(JoinContext);

  const HandleUpload = async (form: FormData) => {
    form.set("song", song);
    form.set("cover", cover);

    let res = await fetch(`https://soundly-peach.vercel.app/api/upload`, {
      method: "POST",
      headers: {
        "x-auth-token": token!,
      },
      body: form,
    });

    if (!res.ok) throw Error();

    navigate.push(`/artist/${me?.id}`);
  };

  const Convert = (file: Blob, name: string) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      if (name === "song") setSong(String(reader.result));
      else setCover(String(reader.result));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid phone:bg-transparent  tablet:grid-cols-1 tablet:mt-8 grid-cols-2 mx-auto mt-[100px] max-w-[800px] rounded-xl h-[500px] bg-gray-800">
      <div className="py-[40px] phone:px-3 relative text-white px-8">
        <h5 className="font-bold mb-12 text-2xl">Upload</h5>
        <form
          encType="multipart/form-data"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            let form: FormData = new FormData(e.currentTarget);
            await HandleUpload(form);
          }}
        >
          <input
            className=" mb-4 w-full h-12 rounded-[4px] border border-gray-500 text-gray-300  bg-transparent p-4"
            name="name"
            placeholder="Enter Song Name"
            type="text"
          />

          <div className="w-full relative  mb-4 text-sm flex items-center justify-center text-black  bg-gray-300 rounded h-12">
            <input
              className="w-full absolute top-0 right-0 cursor-pointer h-full opacity-0"
              type="file"
              accept="audio/*"
              required
              name="song"
              onChange={(e) => {
                if (e.target.files) {
                  Convert(e.target.files[0], "song");
                }
              }}
            />
            Click Here To Choose Song File
          </div>
          <div className="w-full relative text-sm flex items-center justify-center text-black  bg-gray-300 rounded h-12">
            <input
              className="w-full absolute top-0 right-0 cursor-pointer h-full opacity-0"
              type="file"
              required
              accept="image/*"
              name="cover"
              onChange={(e) => {
                if (e.target.files) {
                  Convert(e.target.files[0], "cover");
                }
              }}
            />
            Click Here To Choose Thumbnail File
          </div>
          {!Loading ? (
            <div className="w-full phone:p-3 p-8 -translate-x-1/2 rounded -translate-y-1/2  bottom-10 left-1/2 h-12  absolute ">
              <button className=" bg-gradient1 w-full rounded text-black font-bold h-12">
                Upload
              </button>
            </div>
          ) : (
            <div className="w-full phone:p-3 p-8 -translate-x-1/2 rounded -translate-y-1/2  bottom-10 left-1/2 h-12  absolute ">
              <div className=" bg-gradient1 text-xl flex items-center justify-center w-full rounded text-black font-bold h-12">
                <RiLoader2Fill className="mr-3 animate-spin" size={"24px"} />
                Uploading...
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="bg-upload p-7 tablet:hidden flex items-center text-white text-[40px]  leading-[150%] font-bold">
        Share Your Work With Thousands Of Peoples
      </div>
    </div>
  );
}
