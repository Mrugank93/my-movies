/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "test123@gmail.com",
    password: "mymovies",
  });
  const [error, setError] = useState<any | string>(null);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth", formData);
      console.log("Response", response.data.message);
      if (response.status === 200) {
        const { token } = response.data;
        setCookie("token", token, {
          path: "/",
          maxAge: 60 * 60 * 24, 
          sameSite: "strict", 
          secure: process.env.NODE_ENV === "production",
        });
        const res = await fetch(`/api/movies?page=1`, { method: "GET" });
        const data = await res.json();
        if (data.success && data.data.length) {
          router.push("/movies");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setError((error as any).response.data.message);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm w-full">
        <h2 className="text-center text-[48px] sm:text-[64px] font-bold leading-9 tracking-tight text-white">
          Sign in
        </h2>
        <form className="space-y-6 mt-8" onSubmit={handleLogin}>
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                autoComplete="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full rounded-md bg-[#224957] py-3 px-4 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-400"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={formData.password}
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full rounded-md bg-[#224957] py-3 px-4 text-white text-[14px] placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-400"
              />
              {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 appearance-none bg-[#224957] checked:bg-green-500 focus:ring-green-400 border-gray-300 rounded checked:border-transparent"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#2BD17E] px-4 py-3 text-[16px] sm:text-[16px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2BD17E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 w-full">
        <img
          src="/Vectors.svg"
          alt="Background Vectors"
          className="w-full"
          style={{ transform: "translateY(20%)" }}
        />
      </div>
    </div>
  );
}
