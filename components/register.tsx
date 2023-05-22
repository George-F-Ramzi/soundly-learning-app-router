"use client";

let token = "h";

interface Prop {
  toggle: (value: boolean) => void;
}

export default function Register({ toggle }: Prop) {
  return (
    <form>
      <h5 className="font-bold text-xl text-white mb-8">
        Hi There!
        <br />
        Create A New Account
      </h5>
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.setItem("token", token);
        }}
        className="w-full h-12 rounded-[4px] border border-gray-500 text-gray-300 font-bold mb-12"
      >
        Login As A Demo
      </button>
      <input
        name="username"
        type="text"
        placeholder="Enter Username"
        required
        className=" mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        required
        className="mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        required
        className=" mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      <button
        type="submit"
        className="bg-gradient1 text-black mt-[48px] w-full h-[48px] font-bold drop-shadow-md rounded-[4px]"
      >
        Join
      </button>
      <p className="mt-[48px] text-center text-white">
        You already have account?{" "}
        <span
          onClick={() => toggle(true)}
          className="text-emerald-400 cursor-pointer"
        >
          Login
        </span>
      </p>
    </form>
  );
}
