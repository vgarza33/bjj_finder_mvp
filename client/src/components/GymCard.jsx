import React from "react";
import { Link } from "react-router-dom";

const GymCard = ({ gym }) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2">{gym.name}</h2>
      <p className="text-gray-600 mb-2">
        {gym.city}, {gym.province_state}
      </p>
      <p className="text-gray-600 mb-4">{gym.country}</p>
      {gym.instagram && (
        <a
          href={`https://www.instagram.com/${gym.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-700 mb-2 block"
        >
          {gym.instagram}
        </a>
      )}
      {gym.website !== "NA" && (
        <a
          href={gym.website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-700 mb-4 block"
        >
          Visit Website
        </a>
      )}
      <div className="mt-4">
        <Link
          to={`/gyms/${gym._id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          View Gym
        </Link>
      </div>
    </div>
  );
};

export default GymCard;
