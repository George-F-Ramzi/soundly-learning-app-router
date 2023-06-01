"use client";

import { useState } from "react";
import FormErrorText from "./form_error";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY4NTYzOTAwM30.vfrrD-AkTdmnGVO-Tn1b1eRZOBF8Z_VB0c_RxaI4lXc";

interface Prop {
  setToken: (v: string) => void;
  toggle: (value: boolean) => void;
  setShow: (v: boolean) => void;
}

export default function Login({ toggle, setToken, setShow }: Prop) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (form: FormData) => {
    let email: FormDataEntryValue = form.get("email")!;
    let password: FormDataEntryValue = form.get("password")!;

    let data = { email, password };
    let res = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let token = res.headers.get("x-auth-token");
    if (token != null) {
      localStorage.setItem("token", token);
      setToken(token);
      setShow(false);
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
        Welcome back!
        <br />
        Login To Your Account
      </h5>
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.setItem("token", token);
          setToken(token);
          setShow(false);
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
        You Dont Have Account?{" "}
        <span
          onClick={() => toggle(false)}
          className="text-emerald-400 cursor-pointer"
        >
          Join
        </span>
      </p>
    </form>
  );
}
