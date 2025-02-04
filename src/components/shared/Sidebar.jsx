
import React from 'react';
import SidebarItem from './SidebarItem';
import {
  Plane,
  ChartPie,
} from 'lucide-react';

const routes = [
  {
    title: 'Data Analysis',
    Icon: ChartPie,
    path: '/',
  },
  {
    title: 'Data Table',
    Icon: Plane,
    path: '/data-table',
  },
];

const SideBar = () => {
  return (
    <div className="relative flex flex-col h-full md:w-56 w-24">
      {/* Logo Section */}
      <div className="w-full flex gap-x-4 justify-center py-6">
        <h2 className=' sm:text-md md:text-2xl font-semibold'>Bicameral</h2>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-1 mt-6  flex-grow">
        {routes.map((item, index) => {


          return (
            <React.Fragment key={item.path}>
              <SidebarItem {...item} />
              {index === 2 && <hr className="!my-3 w-[90%] border-blue-200" />}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};

export default SideBar;
