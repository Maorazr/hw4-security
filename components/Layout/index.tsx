import React, { ReactNode, useContext } from "react";
import Header from "../Header/index";
import { ThemeContext } from "../../context/ThemeContext";
import FullScreenLayout from "./FullScreenLayout";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : ""
      } flex flex-col min-h-screen bg-sky-300`} // Set the background color to your preference
    >
      <Header />
      <div className="container mx-auto">
        <div
          className={`${
            theme === "dark" ? "dark:bg-neutral-800" : "bg-cyan-50"
          } flex-grow mx-4 py-4 px-4 sm:px-6 lg:px-8`} // Adjust the mx-4 to change the width of your main content area
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
