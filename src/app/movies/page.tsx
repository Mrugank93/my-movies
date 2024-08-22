/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MOVIES_PER_PAGE = 8;

export default function Movie() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [movies, setMovies] = useState([]);
  const totalPages = Math.ceil(totalData / MOVIES_PER_PAGE);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(`/api/movies?page=${currentPage}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setMovies(data.data);
          setTotalData(data.totalData);
        }
      };
      fetchMovies();
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber: any) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      console.log("Page Number: ", pageNumber);
    }
  };
  const currentMovies = movies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const router = useRouter();

  const handleLogin = () => {
    router.push("/add");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-start">
          <div className="text-2xl text-white font-bold mt-10 mb-6 text-center flex items-center">
            <span className="mr-2 text-[36px] sm:text-[48px]">My Movies</span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleLogin}
            >
              <g clipPath="url(#clip0_3_194)">
                <path
                  d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_194">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            className="text-[14px] sm:text-[16px] text-white font-bold mt-10 mb-6 text-center flex items-center cursor-pointer"
            onClick={handleLogout}
          >
            <span className="mx-3 hidden sm:inline">Logout</span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7_232)">
                <path
                  d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_232">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: any) => (
            <div
              key={movie._id}
              className="bg-[#092C39] rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-40 sm:h-60">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-white text-lg sm:text-xl font-semibold">
                  {movie.title}
                </h2>
                <p className="text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 relative z-10">
          <button
            className={`text-white font-bold px-6 py-2 rounded-l-md transition-colors duration-200 ${currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#2BD17E]"
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-6 py-2 mx-1 rounded-md transition-colors duration-200 ${currentPage === index + 1
                ? "bg-[#2BD17E] text-white"
                : "bg-[#093545] text-white hover:bg-[#2BD17E] hover:text-white"
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`text-white font-bold px-6 py-2 rounded-r-md transition-colors duration-200 ${currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#2BD17E]"
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <img
        src="/Vectors.svg"
        alt="Background Vectors"
        className="w-full"
        style={{ transform: "translateY(20%)" }}
      />
    </div>
  );
}
