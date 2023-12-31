import React, { ReactNode, useContext } from "react";
import Header from "../Header/index";
import { ThemeContext } from "../../context/ThemeContext";
import Sidebar from "../Sidebar/index";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Sidebar /> */}
      <div className="container mx-auto border">
        <div className="mt-14 flex-grow py-4 px-4 sm:px-6 lg:px-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
