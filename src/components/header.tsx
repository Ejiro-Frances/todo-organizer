import React from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { GoBell } from "react-icons/go";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full h-20 z-50 py-4 transition-all duration-300 bg-transparent ",
          isScrolled && "bg-[rgba(245,245,245,0.1)] shadow-md backdrop-blur-sm"
        )}
      >
        <div
          className={cn(
            "flex justify-between max-w-[95%] mx-auto px-5 py-2 border border-[#F4EDED] rounded",
            isScrolled && "border-none"
          )}
        >
          <Link to="/" className="flex gap-2 items-center">
            <img
              src="/logo.svg"
              alt=""
              aria-polite
              className="w-6 md:w-10 h-6 md:h-10"
            />
            <p className="text-[#001633] md:text-2xl font-bold">To-Do</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300 transition-all duration-200">
              <GoBell />
            </div>
            <Avatar className="rounded-full border border-[#0EA420]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-[#001633] text-white">
                EJ
              </AvatarFallback>
            </Avatar>
            <h1 className="font-normal">Ejiro Frances</h1>
          </div>
        </div>
      </header>
      <Link
        to="/testerror"
        className="fixed bottom-2 right-4 z-50 bg-red-600 hover:bg-red-700 py-2 px-4 text-sm rounded text-white transition-colors duration-200 ease-in-out"
      >
        Error test page
      </Link>
    </>
  );
};

export default Header;
