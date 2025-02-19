import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import GymCard from "../components/GymCard";
import HeroSection from "../components/HeroSection";

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
      } else if (searchType === "province_state") {
        endpoint = `/api/gyms/province_state/${encodeURIComponent(searchTerm)}`;
      } else {
        endpoint = `/api/gyms/country/${encodeURIComponent(searchTerm)}`;
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
            searchType === "city"
              ? "city"
              : searchType === "province_state"
              ? "province/state"
              : "country"
          }.`
        );
      } else {
        setError(null);
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
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-2">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
