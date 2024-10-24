import React from "react";

const ClockIcon = ({ color = "#9b9b9b", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <path
      d="M5.048 8.607L2.538 8.454C4.337 3.705 9.503 1 14.54 2.345c5.364 1.433 8.55 6.917 7.116 12.25-1.434 5.333-6.945 8.495-12.31 7.062C5.364 20.592 2.582 17.295 2 13.484"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 8v4l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ClockIcon;
