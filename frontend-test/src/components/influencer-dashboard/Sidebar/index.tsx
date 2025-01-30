"use client";


import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { PiChartLineUpThin, PiStudentLight } from "react-icons/pi";
// import AdminPermissions from "@/src/hooks/AdminProtected";
import dynamic from "next/dynamic";
import { MdOutlineCampaign } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineBarChart } from "react-icons/ai";
import { LiaClipboardListSolid } from "react-icons/lia";
import {
  HiOutlineClipboardDocument
} from "react-icons/hi2";
import {
  PiChalkboardThin,
  PiStudentDuotone,
  PiUsersThreeLight
} from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { TfiAlignLeft } from "react-icons/tfi";
import PageLoadingSpinner from "../../layouts/PageLoadingSpinner";
import SidebarItem from "./SidebarItem";
import { JSX } from "react";
import ClickOutside from "../../ClickOutside";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import { IoHomeOutline } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  desktopSidebarOpen: boolean;
  setDesktopSidebarOpen: (arg0: boolean) => void;
}

interface MenuItem {
  icon?: JSX.Element | string;
  label: string;
  route: string;
  children?: MenuItem[];
}

interface MenuGroup {
  name?: string;
  menuItems: MenuItem[];
}
const menuGroups: MenuGroup[] = [
  {
    name: "MENU",
    menuItems: [
 
      {
        icon: <CiHome size={20} />,
        
        label: "Home",
        route: "/campaigns",
      },
      {
        icon: <MdOutlineCampaign size={20} />,
        
        label: "My campaings",
        route: "/my-campaigns",
      },
      
    
     
      
     
      
          
    ],
  },
 
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}: SidebarProps) => {

  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { user, loading, error } = useAppSelector(
    (state: RootState) => state.auth
  );
  if (loading) {
    return <PageLoadingSpinner />;
  }
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 transition-all duration-300 ease-linear flex h-screen ${
          desktopSidebarOpen ? "lg:w-62.5" : "w-0 lg:w-0"
        } flex-col overflow-y-hidden bg-white  dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 w-62.5" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 lg:py-3">
          <Link href="#"
         
           >
           
            <h2 className="text-lg font-bold text-blue-800">Campaigns Hub</h2>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <TfiAlignLeft size={30} />
          </button>
        </div>

        <div className=" flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-[#585882ff]">
                  {group.name}
                </h3> */}

                <ul className="mb-6 flex flex-col gap-4">
                  {group.menuItems.map((menuItem, menuIndex) => {
                   
                    return (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
