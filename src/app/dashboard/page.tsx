/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/movies");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-8 md:leading-9 tracking-tight text-white">
          Your movie list is empty
        </h2>
      </div>
      <div className="mt-6 md:mt-10">
        <button
          onClick={handleClick}
          type="submit"
          className="flex w-full justify-center rounded-md bg-[#2BD17E] px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add a new movie
        </button>
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
