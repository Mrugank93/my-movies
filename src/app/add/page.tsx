/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, year, image });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="max-w-6xl w-full p-4 sm:p-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-white text-center sm:text-left">
          Create a new movie
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-8"
        >
          <div className="w-full sm:w-1/2 flex justify-center items-center border-2 border-dashed border-white h-60 sm:h-96 rounded-lg bg-[#224957]">
            <label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <>
                  <svg
                    className="h-8 w-8 text-white mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="text-white text-lg">Drop an image here</span>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </label>
          </div>

          <div className="w-full sm:w-1/2 flex flex-col gap-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#224957] text-white px-5 py-3 rounded-lg outline-none text-lg"
            />
            <input
              type="text"
              placeholder="Publishing Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-[#224957] text-white px-5 py-3 rounded-lg outline-none text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/2"
            />

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition text-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#2BD17E] text-white px-6 py-3 rounded-lg hover:bg-[#28a76d] transition text-lg"
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
          style={{ transform: "translateY(30%)" }}
        />
      </div>
    </div>
  );
}
