"use client";

import { useState } from "react";
import FormErrorText from "./form_error";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY4NDc3MjMxMX0.g7FABMbT-gmt-x1hRVVGd3sfSeQxdsTTI1_s0_5qfBs";

interface Prop {
  toggle: (value: boolean) => void;
}

export default function Register({ toggle }: Prop) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (form: FormData) => {
    let username: FormDataEntryValue = form.get("username")!;
    let email: FormDataEntryValue = form.get("email")!;
    let password: FormDataEntryValue = form.get("password")!;

    let data = { username, email, password };
    let res = await fetch(`http://localhost:3000/api/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let token = res.headers.get("x-auth-token");
    if (token != null) {
      localStorage.setItem("token", token);
      return window.location.reload();
    } else {
      let message = (await res.text()).toLowerCase();
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        let form: FormData = new FormData(e.currentTarget);
        await handleSubmit(form);
      }}
    >
      <h5 className="font-bold text-xl text-white mb-8">
        Hi There!
        <br />
        Create A New Account
      </h5>
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.setItem("token", token);
          window.location.reload();
        }}
        className="w-full h-12 rounded-[4px] border border-gray-500 text-gray-300 font-bold mb-12"
      >
        Login As A Demo
      </button>
      <input
        minLength={8}
        name="username"
        type="text"
        placeholder="Enter Username"
        required
        className=" mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      {error.includes("username") ? <FormErrorText text={error} /> : ""}
      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        required
        className="mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      {error.includes("email") ? <FormErrorText text={error} /> : ""}
      <input
        minLength={8}
        name="password"
        type="password"
        placeholder="Enter Password"
        required
        className=" mb-4 w-full valid:border-green-500 
        h-12 rounded-[4px] border border-gray-500 text-gray-300 
        bg-transparent p-4"
      />
      {error.includes("password") ? <FormErrorText text={error} /> : ""}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient1 disabled:hidden text-black mt-[48px] w-full h-[48px] font-bold drop-shadow-md rounded-[4px]"
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
