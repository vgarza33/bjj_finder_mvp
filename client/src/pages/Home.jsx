import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("/api/gyms")
  //     .then((res) => res.json())
  //     .then((data) => setGyms(data));
  // }, []);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    try {
      const response = await fetch("/api/gyms");
      if (!response.ok) {
        throw new Error("Something went wrong while fetching the gyms.");
      }
      const data = await response.json();
      setGyms(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm, searchType) => {
    try {
      setLoading(true);

      let endpoint;
      if (searchType === "city") {
        endpoint = `/api/gyms/city/${encodeURIComponent(searchTerm)}`;
      } else {
        endpoint = `/api/gyms/province_state/${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Something went wrong while searching for gyms.");
      }

      const data = await response.json();
      console.log(data);
      setGyms(data);

      // Show message if no gyms found
      if (data.length === 0) {
        setError(
          `No gyms found in this ${
            searchType === "city" ? "city" : "province/state"
          }.`
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Find NoGi BJJ Gyms
      </h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {gyms.map((gym) => (
          <li key={gym.id}>
            <a href={`/gym/${gym.id}`}>{gym.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
