import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("city"); // Default to city search

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Gym</h2>
        <p className="text-gray-600">Look for NoGi BJJ gyms in your area</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="city">City</option>
              <option value="province_state">State/Province</option>
              <option value="country">Country</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by ${
                searchType === "city"
                  ? "city"
                  : searchType === "province_state"
                  ? "state/province"
                  : "country"
              }`} // Dynamic placeholder text
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
