import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, FaClipboardList, FaPlus, FaUser,
  FaBars, FaTimes, FaChartLine
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from '../image/Fret.png'
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userName = "David"; // This would come from user context/auth

  const menuItems = [
    { 
      path: "/dashboard", 
      icon: <FaHome />, 
      label: t('Dashboard'),
      exact: true
    },
    { 
      path: "/dashboard/orders", 
      icon: <FaClipboardList />, 
      label: t('OrdersList')
    },
    { 
      path: "/dashboard/place-order", 
      icon: <FaPlus />, 
      label: t('PlaceOrder')
    },
    { 
      path: "/dashboard/orders?view=analytics", 
      icon: <FaChartLine />, 
      label: t('Analytics')
    }
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-midnight-900 text-white transition-all duration-300 flex flex-col z-40
        ${isCollapsed ? 'w-20' : 'w-64'} 
        lg:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Close button for mobile */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute right-4 top-4 text-stone-400 p-2 hover:bg-midnight-800/50 rounded-full transition-colors duration-300"
        aria-label={t('common.close')}
      >
        <FaTimes />
      </button>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className={`flex items-center space-x-2 text-2xl font-bold transition-all duration-300 ${isCollapsed ? "hidden" : "block"}`}>
          {/* <span className="gradient-text">{logo}</span> */}
          <img src={logo} className='h-[120px] ' alt="" />
        </h2>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-stone-400 hover:text-sunset focus:outline-none hidden lg:block transition-colors duration-300"
          aria-label={t(isCollapsed ? 'nav.expand' : 'nav.collapse')}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="mt-4 flex-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all duration-300 ${
              (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path.split('?')[0]))
                ? "bg-gradient-sunset text-white shadow-glow-orange" 
                : "hover:bg-midnight-800/50 text-stone-400 hover:text-white"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="transition-all duration-300">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-stone-600/10 mt-auto">
        <Link
          to="/dashboard/profile"
          className={`p-4 flex items-center gap-3 hover:bg-midnight-800/50 transition-all duration-300 cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center shadow-glow-orange">
            <FaUser className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h3 className="font-medium truncate text-white">{userName}</h3>
              <p className="text-sm text-stone-400 truncate">{t('Profile')}</p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
