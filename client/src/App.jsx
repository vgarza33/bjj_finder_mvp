import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700">
          This is a Tailwind styled div
        </div>
      </div>
    </>
  );
}

export default App;
