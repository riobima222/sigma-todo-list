"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  navigateText: string;
  navigate: string;
  isLogin: boolean;
  button: string;
}

export default function Auth(props: Props) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (!props.isLogin) {
      // register click
      const user = {
        username: event.target.username.value || "",
        email: event.target.email ? event.target.email.value : "",
        password: event.target.password ? event.target.password.value : "",
        gender: event.target.gender.value || "",
      };
      fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          setMessage(res.message);
          setTimeout(() => {
            if (res.status) {
              router.push("/auth/login");
            }
          }, 2000);
          setIsLoading(false);
          event.target.username.value = "";
          event.target.email.value = "";
          event.target.password.value = "";
        });
      setMessage("");
    } else {
      // login click
      setMessage("");
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl: "/",
      });
      if (res?.ok) {
        setIsLoading(false);
        setMessage("Berhasil login");
        setButtonDisable(true);
        router.push("/");
      } else {
        console.log("gagal");
        setIsLoading(false);
        setMessage("username atau password salah");
        setIsLoading(false);
      }
    }
  };
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/", redirect: false });
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <p
        className={`${
          message == "Kamu berhasil mendaftar" || message == "Berhasil login"
            ? "text-[#56f55e]"
            : "text-[#ed4444]"
        } font-bold mb-2 tracking-wide !!`}
      >
        {message && `${message} !!`}
      </p>
      <form
        className={`flex flex-col items-center justify-between max-w-[20em] sm:max-w-[25em] w-full ${
          props.isLogin ? "h-[19em]" : "h-[23em]"
        } border-2 rounded-lg p-5`}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-indigo-500 text-transparent bg-clip-text">
          {props.title || "..."}
        </h1>
        {!props.isLogin && (
          <input
            type="text"
            name="username"
            placeholder="username"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
            maxLength={10}
            minLength={3}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
          required
        />
        {!props.isLogin && (
          <div className="flex items-center mb-2">
            <label>
              <input
                type="radio"
                name="gender"
                value="man"
                className="mr-1"
                defaultChecked
              />
              Man
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="woman"
                className="ml-3 mr-1"
              />
              Woman
            </label>
          </div>
        )}
        {isLoading ? (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full h-12"
          >
            <span className="inline-block loading loading-spinner text-info"></span>
          </button>
        ) : (
          <button
            disabled={buttonDisable}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full h-12"
          >
            {props.button}
          </button>
        )}
        {props.isLogin &&
          (googleLoading ? (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full h-12"
            >
              <span className="inline-block loading loading-spinner text-info"></span>
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full h-12"
              onClick={() => handleGoogleLogin()}
            >
              Login with Google
            </button>
          ))}
        <p className="text-sm">
          {props.isLogin && "belum "}punya akun ?{" "}
          <Link
            href={props.navigate || "..."}
            className="text-blue-500 underline"
          >
            {props.navigateText || "..."}
          </Link>{" "}
        </p>
      </form>
    </section>
  );
}
