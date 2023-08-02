import React, { ReactNode, useContext } from "react";
import Header from "../Header/index";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Header />
      <div
        className={`${
          theme === "dark" ? "dark:bg-neutral-800" : "bg-neutral-100"
        } w-full mx-auto py-4 px-4 sm:px-6 lg:px-8`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
