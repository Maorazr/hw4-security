import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isMinimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    setMinimized(!isMinimized);
  };
  return (
    <>
      {!isMinimized && (
        <div className="w-50 h-full fixed left-0 top-0 bg-gray-800 text-white z-10 mt-5">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sidebar</h1>
            <nav>
              <ul>
                <li className="mb-2">
                  <Link href="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link href="/about">About</Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <button
        onClick={toggleMinimized}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 z-20"
      >
        <img src="../../public/menu.png" />
      </button>
    </>
  );
};

export default Sidebar;
