import React from "react";

const BjjVoyageurLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    {/* Background circle */}
    <circle cx="100" cy="100" r="90" fill="#f0f0f0" />
    {/* Body */}
    <circle cx="100" cy="100" r="60" fill="#8c8c8c" />
    {/* Belt */}
    <rect x="35" y="95" width="130" height="20" fill="#4a2105" />
    <rect x="85" y="95" width="30" height="20" fill="#6b3207" />
    <circle cx="100" cy="105" r="5" fill="#ffd700" /> {/* Belt buckle */}
    {/* Ears */}
    <circle cx="55" cy="55" r="20" fill="#8c8c8c" />
    <circle cx="145" cy="55" r="20" fill="#8c8c8c" />
    <circle cx="55" cy="55" r="12" fill="#595959" />
    <circle cx="145" cy="55" r="12" fill="#595959" />
    {/* Face */}
    <circle cx="100" cy="90" r="25" fill="#595959" /> {/* Snout */}
    <ellipse cx="100" cy="95" rx="15" ry="10" fill="#333333" /> {/* Nose */}
    {/* Eyes */}
    <circle cx="75" cy="75" r="10" fill="#333333" />
    <circle cx="125" cy="75" r="10" fill="#333333" />
    <circle cx="78" cy="72" r="3" fill="white" /> {/* Eye highlights */}
    <circle cx="128" cy="72" r="3" fill="white" />
  </svg>
);

export default BjjVoyageurLogo;
