import React from "react";
import Link from "next/link";

function Card({
  id,
  image,
  discount,
  tag,
  rating,
  reviews,
  location,
  title,
  description,
  price,
  oldPrice,
}) {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 m-4">
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={image}
          alt="Nature scene"
        />
        <div className="absolute top-0 left-0 bg-white text-orange-400 px-2 py-1 m-2 rounded-md text-sm font-semibold">
          {discount}
        </div>
        <div className="absolute bottom-0 left-0 bg-orange-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          {tag}
        </div>
        <button className="absolute top-0 right-0 px-2 py-1 m-2 rounded-md bg-white p-2.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-600 ml-1">
              {rating} ({reviews})
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <Link
            href={`/details/${id}`}
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Details</span>
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              {oldPrice && (
                <span className="text-lg text-red-500 line-through">
                  ${oldPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-800">${price}</span>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
