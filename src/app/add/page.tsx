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
      <div className="max-w-6xl w-full p-12">
        <h1 className="text-5xl font-bold mb-8 text-white">Create a new movie</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-1/2 flex justify-center items-center border-2 border-dashed border-white h-96 rounded-lg bg-[#224957]">
            <label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <>
                  <span className="text-white mb-4 text-lg">
                    Drop an image here
                  </span>
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
              className="bg-[#224957] text-white px-5 py-3 rounded-lg outline-none text-lg w-1/2"
            />

            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition text-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#2BD17E] text-white px-6 py-3 rounded-lg hover:bg-[#2BD17E] transition text-lg"
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
