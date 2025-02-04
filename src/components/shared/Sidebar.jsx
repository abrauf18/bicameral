import React from "react";
import SidebarItem from "./SidebarItem";
import { Plane, ChartPie } from "lucide-react";

const routes = [
  {
    title: "Data Analysis",
    Icon: ChartPie,
    path: "/",
  },
  {
    title: "Data Table",
    Icon: Plane,
    path: "/data-table",
  },
];

const SideBar = () => {
  const [active, setActive] = React.useState(0);

  const onClick = (index) => {
    setActive(index);
  };

  return (
    <div className="relative flex flex-col h-full md:w-60 w-24 bg-[#1A1919] p-2">
      {/* Logo Section */}
      <div className="w-full flex gap-x-4 justify-center py-6">
        <h2 className=" sm:text-md md:text-2xl font-semibold text-white">
          Bicameral
        </h2>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-1 mt-6  flex-grow">
        {routes.map((item, index) => {
          return (
            <React.Fragment key={item.path}>
              <SidebarItem
                {...item}
                className={active === index && "bg-white/90 text-black"}
                onClick={() => onClick(index)}
              />
              {index === 1 && <hr className="!my-3 w-[90%] border-white/20" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
