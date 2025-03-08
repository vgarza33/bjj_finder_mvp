import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, PlusCircle } from "lucide-react";

const GymDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gym, setGym] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching gym with ID:", id); // Debug log
    window.scrollTo(0, 0);
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

  const handleAddReview = () => {
    //check if user is logged in
    const isLoggedIn = localStorage.getItem('token') || false; 

    if (isLoggedIn) {
      navigate(`/gyms/${id}/add-review`);
    } else {
      //show alert instead of navigating
      setShowAlert(true);

      //automatically hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000)
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

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {gym.name}
              </h1>
              <div className="text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Address: </span>
                  {gym.address}
                </p>
                <p>
                  {gym.city}, {gym.province_state}
                </p>
                <p>{gym.country}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <p className="font-semibold">Drop-in Fee</p>
                <p>{gym.drop_in_fee || "Contact gym"}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-4">
            {gym.instagram && (
              <a
                href={`https://www.instagram.com/${gym.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-pink-600 hover:text-pink-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @{gym.instagram}
              </a>
            )}

            {gym.website && (
              <a
                href={gym.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About the Gym
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {gym.description || "No description available."}
          </p>
        </div>

         {/* Alert message */}
         {showAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">Must be logged in to add gym.</span>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <span className="font-semibold">{averageRating}</span>
                {reviews.length > 0 && <span className="text-sm ml-1">/ 5</span>}
              </div>
              <button 
                onClick={handleAddReview}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Review
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
