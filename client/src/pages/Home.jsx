import React, { useState, useEffect } from "react";

const Home = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    fetch("/api/gyms")
      .then((res) => res.json())
      .then((data) => setGyms(data));
  }, []);

  return (
    <div>
      <h1>Gyms</h1>
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
