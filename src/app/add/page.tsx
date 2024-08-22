"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setImagePreview(base64String); // Set preview
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        ...formData,
        image: base64Image, // Send base64 string of a single image
      };

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!res.ok) {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="max-w-6xl w-full p-4 sm:p-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-white text-center sm:text-left">
          Create a new movie
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
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
                    onChange={handleFileChange}
                  />
                </>
              )}
            </label>
          </div>

          <div className="w-full sm:w-1/2 flex flex-col gap-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#224957] text-white px-5 py-3 rounded-lg outline-none text-lg"
            />
            <input
              type="text"
              name="year"
              placeholder="Publishing Year"
              value={formData.year}
              onChange={handleChange}
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
