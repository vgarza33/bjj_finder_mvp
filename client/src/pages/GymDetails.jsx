import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GymDetails = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching gym with ID:", id); // Debug log
    // fetch(`/api/gyms/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setGym(data));
    fetchGymAndReviews();
  }, [id]);

  const fetchGymAndReviews = async () => {
    try {
      console.log("Starting fetch requests"); // Debug log
      const [gymResponse, reviewsResponse] = await Promise.all([
        fetch(`/api/gyms/${id}`),
        fetch(`/api/reviews/${id}`),
      ]);

      console.log("Gym Response:", gymResponse); // Debug log
      console.log("Reviews Response:", reviewsResponse); // Debug log

      if (!gymResponse.ok || !reviewsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const [gymData, reviewsData] = await Promise.all([
        gymResponse.json(),
        reviewsResponse.json(),
      ]);

      console.log("Gym Data:", gymData); // Debug log
      console.log("Reviews Data:", reviewsData); // Debug log

      setGym(gymData);
      setReviews(reviewsData);
      setLoading(false);
    } catch (err) {
      console.error("Fetch err:", err); // Debug log
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !gym) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">
          Error: {error || "Gym not found"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{gym.name}</h1>
        <div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <p className="mb-2">{gym.address}</p>
            <p className="mb-2">
              {gym.city}, {gym.province_state}
            </p>
            <p className="mb-4">{gym.country}</p>
            <p className="mb-4">Drop-in Fee: {gym.drop_in_fee}</p>
            {gym.instagram && (
              <a
                href={`https://www.instagram.com/${gym.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-700 mb-2 block"
              >
                @{gym.instagram}
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
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{gym.description}</p>
          </div>
          <div>
            <h2>Reviews</h2>
            {/* Copilot Generated */}
            {/* {reviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p>
                      {review.rating} stars - {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )} */}
            {reviews.length > 0 ? (
              <div>
                {reviews.map((review) => (
                  <div key={review.id}>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
