/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; 
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    year: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeyear = (e: any) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setImagePreview(base64String);
        setImageError(null); 
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!base64Image) {
      setImageError("Image is required");
      return;
    }

    setLoading(true); 

    try {
      const formDataToSend = {
        ...formData,
        image: base64Image,
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
      router.push("/movies");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
        <ToastContainer />
      <div className="max-w-6xl w-full p-4 sm:p-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8 text-white text-center sm:text-left">
          Create a new movie
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-8"
        >
          <div className="w-full sm:w-1/2 flex flex-col justify-center items-center border-2 border-dashed border-white h-60 sm:h-96 rounded-lg bg-[#224957]">
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
                    required
                  />
                </>
              )}
            </label>
            {imageError && (
              <span className="text-red-500 text-sm mt-2">{imageError}</span>
            )}
          </div>

          <div className="w-full sm:w-1/2 flex flex-col gap-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-[#224957] text-white px-5 py-3 rounded-lg outline-none text-lg"
            />
            <input
              type="text"
              name="year"
              placeholder="Publishing Year"
              value={formData.year}
              onChange={handleChangeyear}
              required
              pattern="\d*" 
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
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-[#093545]/50 z-50">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                                <path
                  d="M88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
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
