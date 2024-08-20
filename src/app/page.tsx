/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="text-center text-[64px] font-bold leading-9 tracking-tight text-white">
          Sign in
        </h2>
        <form className="space-y-6 mt-8">
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
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
                required
                className="block w-full rounded-md bg-[#224957] py-3 px-4 text-white text-[14px] placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-400"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-500 text-[14px] focus:ring-green-400 border-gray-300 rounded"
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
              onClick={handleLogin}
              type="submit"
              className="flex w-full justify-center rounded-md text-[16px `] bg-[#2BD17E] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2BD17E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
