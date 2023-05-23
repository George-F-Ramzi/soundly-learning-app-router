"use client";

interface Prop {
  toggle: (value: boolean) => void;
}

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY4NDc3MjMxMX0.g7FABMbT-gmt-x1hRVVGd3sfSeQxdsTTI1_s0_5qfBs";

export default function Login({ toggle }: Prop) {
  return (
    <form>
      <h5 className="font-bold text-xl text-white mb-8">
        Welcome Back!
        <br />
        Login To Your Account
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
        Login
      </button>
      <p className="mt-[48px] text-center text-white">
        You Dont have Account?{" "}
        <span
          onClick={() => toggle(false)}
          className="text-emerald-400 cursor-pointer"
        >
          Register
        </span>
      </p>
    </form>
  );
}
