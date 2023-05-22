import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiCloseLine, RiMenu5Fill, RiSearch2Line } from "react-icons/ri";

export default function SideBar({ id }: { id: number }) {
  const [show, setShow] = useState(false);
  return (
    <div className="desktop-min:hidden desktop:hidden tablet:block text-white">
      {!show ? (
        <MenuButton show={setShow} />
      ) : (
        <BarBody id={id} show={setShow} />
      )}
    </div>
  );
}

//

function BarBody({ show, id }: { id: number; show: (v: boolean) => void }) {
  const [Ivalue, setIvalue] = useState("");
  let navigate = useRouter();

  return (
    <div className="right-0 w-[320px] z-10 p-4 bg-gray-800 border-l border-gray-600 h-screen top-0 fixed">
      <div
        onClick={() => show(false)}
        className="flex items-center mb-9  text-white justify-between font-bold text-base"
      >
        <RiCloseLine className="cursor-pointer" size={"24px"} />
        Hi There!
      </div>
      <div className="w-full flex flex-col">
        <Link
          onClick={() => show(false)}
          href={`/artist/${id}`}
          className="w-full font-bold mb-4 flex items-center justify-center border border-gray-500 h-12 rounded"
        >
          Profile
        </Link>
        <Link
          onClick={() => show(false)}
          href={`/inbox`}
          className="w-full font-bold mb-4 flex items-center justify-center border border-gray-500 h-12 rounded"
        >
          Inbox
        </Link>
        <Link
          onClick={() => show(false)}
          href={`/liked`}
          className="w-full font-bold mb-4 flex items-center justify-center border border-gray-500 h-12 rounded"
        >
          Liked
        </Link>
        <Link
          onClick={() => show(false)}
          href={`/upload`}
          className="w-full font-bold flex items-center justify-center border border-gray-500 h-12 rounded"
        >
          Upload
        </Link>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate.push(`/search/${Ivalue}`);
          show(false);
        }}
      >
        <div className="w-full  h-12  relative rounded mt-10  border-gray-500 border-[0.4px] ">
          <input
            placeholder="Search"
            className="w-full h-full  rounded-full border-none outline-none bg-gray-800 text-gray-300  p-4"
            value={Ivalue}
            onChange={(e) => setIvalue(e.currentTarget.value)}
          />

          <RiSearch2Line
            size={"24px"}
            className="absolute right-4 top-[11px] text-gray-300 "
          />
        </div>
      </form>
    </div>
  );
}

//

function MenuButton({ show }: { show: (v: boolean) => void }) {
  return (
    <div
      onClick={() => show(true)}
      className="min-w-12 w-12 cursor-pointer text-black flex bg-gradient1 items-center justify-center h-12 rounded-full"
    >
      <RiMenu5Fill size={"26px"} />
    </div>
  );
}
