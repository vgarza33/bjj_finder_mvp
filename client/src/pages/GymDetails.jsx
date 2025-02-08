import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GymDetails = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);

  useEffect(() => {
    fetch(`/api/gyms/${id}`)
      .then((res) => res.json())
      .then((data) => setGym(data));
  }, [id]);

  if (!gym) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{gym.name}</h1>
      <p>{gym.description}</p>
    </div>
  );
};

export default GymDetails;
