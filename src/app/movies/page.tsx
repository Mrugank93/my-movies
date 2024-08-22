/* eslint-disable @next/next/no-img-element */
"use client";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const MOVIES_PER_PAGE = 8;

export default function Movie() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalData / MOVIES_PER_PAGE);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/movies?page=${currentPage}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setMovies(data.data);
          setTotalData(data.totalData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (pageNumber: any) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const router = useRouter();

  const handleLogin = () => {
    router.push("/add");
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };
  const handleEdit = (id: any) => {
    router.push(`/add/${id}`);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 relative overflow-hidden bg-[#093545]">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-[#093545]/50 z-50">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl">
            <div className="flex justify-between items-start pt-4">
              <div className="text-2xl text-white font-bold mt-10 mb-6 flex items-center">
                <span className="mr-2 text-[36px] sm:text-[48px]">
                  My Movies
                </span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="hover:cursor-pointer"
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
                className="text-[14px] sm:text-[16px] text-white font-bold mt-10 mb-6 flex items-center cursor-pointer"
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
                  <div
                    className="relative w-full h-40 sm:h-60 hover:cursor-pointer"
                    onClick={() => handleEdit(movie._id)}
                  >
                    <Image
                      src={movie.image || "/default.jpg"}
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
            <div className="flex flex-col items-center mt-10 relative z-10">
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  className={`text-white font-bold px-4 py-2 rounded-l-md transition-colors duration-200 ${currentPage === 1
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
                    className={`px-4 py-2 mx-1 rounded-md transition-colors duration-200 ${currentPage === index + 1
                      ? "bg-[#2BD17E] text-white"
                      : "bg-[#092C39] text-white hover:bg-[#2BD17E] hover:text-white"
                      }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`text-white font-bold px-4 py-2 rounded-r-md transition-colors duration-200 ${currentPage === totalPages
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
          </div>
          <img
            src="/Vectors.svg"
            alt="Background Vectors"
            className="w-full absolute bottom-0 left-0"
            style={{ transform: "translateY(20%)" }}
          />
        </>
      )}
    </div>
  );
}
