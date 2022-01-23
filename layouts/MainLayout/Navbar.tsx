import Image from "next/image";
import React from "react";

const LOGO_URL = "https://www.api-football.com/public/img/news/f1-mini.png";

const Navbar = () => {
  return (
    <header
      style={{
        background:
          "linear-gradient(to right, rgba(255, 238, 238, 0.44), rgba(137, 235, 221, 0.44))",
        backdropFilter: "blur(3px)",
      }}
      className="flex items-center justify-center md:justify-start h-24 px-5 shadow-md fixed top-0 z-50  w-full"
    >
      <div className="flex items-center gap-4 md:gap-1 font-semibold">
        <span className="text-lg tracking-wider">Formula F1</span>
        <Image src={LOGO_URL} width={80} height={80} />
      </div>
    </header>
  );
};

export default Navbar;
