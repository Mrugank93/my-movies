/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ title, year, image });
  };

  return (
    <div
      className="flex min-h-screen flex-col  px-6 py-12 lg:px-8"
      style={{
        backgroundColor: "#06273D",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="right-0 text-3xl font-bold mb-8 text-white">
          Create a new movie
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-6"
        >
          <div className="w-full sm:w-1/2 flex justify-center items-center border-2 border-dashed border-white h-64 rounded-lg">
            <label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
              <span className="text-white mb-2">Drop an image here</span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#224957] text-white px-4 py-2 rounded-lg outline-none"
            />
            <input
              type="text"
              placeholder="Publishing year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-[#224957] text-white px-4 py-2 rounded-lg outline-none"
            />

            <div className="flex justify-center gap-2">
              <button
                type="button"
                className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition"
              >
                Submit
              </button>
            </div>
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
