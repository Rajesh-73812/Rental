import React, { useState, useEffect, useRef } from "react";
import { NotificationIcon, ProfileIcon } from "./Icons";
import { FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [popupTimeout, setPopupTimeout] = useState(null); 
  const notificationRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isHovered) {
        setShowCard(true);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isHovered) {
        setShowCard(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications', { withCredentials: true });
      const newNotifications = response.data;
      setNotifications(newNotifications);
      setNotificationCount(newNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
      setNotificationCount((prev) => prev + 1);
      setIsPopupVisible(true);

      if (popupTimeout) {
        clearTimeout(popupTimeout);
      }

      const timeoutId = setTimeout(() => {
        setIsPopupVisible(false);
      }, 100000);

      setPopupTimeout(timeoutId);
    });

    return () => {
      socket.off("notification");
      if (popupTimeout) {
        clearTimeout(popupTimeout); 
      }
    };
  }, [popupTimeout]); 

  useEffect(() => {
    // Add event listener to detect clicks outside
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false); 
      }
    };
  
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
  
    // Cleanup the event listener on unmount or update
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/admin/logout`, {}, { withCredentials: true });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const navigation = (data) => {
    if (data === 'profile') {
      navigate("/profile");
    } else if (data === 'settings') {
      navigate("/settings");
    }
  };

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications); 
    if (!showNotifications) {
      await fetchNotifications(); 
    }
  };
  
  

  return (
    <div className="bg-white h-[65px] sm:h-[80px] p-6 flex items-center justify-between relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100 z-50">
          <span className="loader"></span>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl font-bold">Dashboard</span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <div className="relative">
          <div className="bg-[#f7fbff] rounded-full size-8 sm:size-11 flex items-center justify-center cursor-pointer" onClick={handleNotificationClick}>
            <NotificationIcon />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {notificationCount}
              </span>
            )}
          </div>

          {isPopupVisible && (
            <div className="notification-popup">
              <p>{notifications[0]?.message}</p>
            </div>
          )}

          {showNotifications && (
            <div ref={notificationRef} className="absolute top-12 right-0 w-[220px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 transition-all duration-300">
              <ul className="py-2 divide-y divide-gray-200">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                      <span>{notification.message}</span> 
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Icon with Smooth Hover Card */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-[#f7fbff] rounded-full size-8 sm:size-11 flex items-center justify-center cursor-pointer">
            <ProfileIcon />
          </div>

          {showCard && (
            <div
              className={`absolute top-12 right-0 w-[220px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 transition-all duration-300`}
            >
              <ul className="py-2 divide-y divide-gray-200">
                <li className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer" onClick={() => { navigation('profile') }}>
                  <FaUser  className="text-gray-500" /> <span>Account</span>
                </li>
                <li className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                  <FaSignOutAlt className="text-gray-500" /> <span>Logout</span>
                </li>
                <li className="px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer" onClick={() => { navigation('settings') }}>
                  <FaCog className="text-gray-500" /> <span>Settings</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
