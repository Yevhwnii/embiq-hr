import React from "react";
import Content from "./Content";
import Navbar from "./Navbar";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: "url(/images/background.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full bg-cyan-50 min-h-screen h-full z-10 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100 overflow-auto"
    >
      <Navbar />
      <Content>{children}</Content>
    </div>
  );
};

export default MainLayout;
