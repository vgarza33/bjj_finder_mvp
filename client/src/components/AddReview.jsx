import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const AddReview = () => {
  const { id } = useParams(); // This will be the gym ID
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (comment.trim() === "") {
      setError("Please add a comment");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/reviews/gym/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating,
          comment
          // The user_id is handled by the backend through the userShouldBeLoggedIn middleware
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit review. You must be logged in to make a review.");
      }
      
      // Redirect back to gym details page after successful submission
      navigate(`/gyms/${id}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate(`/gyms/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h1>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Rating Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    onClick={() => handleRatingClick(star)}
                    className={`cursor-pointer ${
                      rating >= star
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Comment */}
            <div className="mb-6">
              <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience with this gym..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                // This inline approach with onChange={(e) => setComment(e.target.value)} is functionally equivalent to having a separate handleChange function. 
              ></textarea>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;