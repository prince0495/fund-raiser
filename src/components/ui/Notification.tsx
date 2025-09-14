import axios from 'axios';
import React, { useEffect, useState } from 'react'

type NotificationType = {
  createdAt: Date;
  message: string;
}

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "just now";
};

const Notification = ({userId}: {userId: string}) => {
  const [notifications, setNotifications] = useState<NotificationType[] | null>(null)

  useEffect(() => {
    try {
      const fetchNotifications = async() => {
      const res = await axios.get(`/api/notification/${userId}`);
      if(res.data?.notifications) {
        setNotifications(res.data.notifications);
        console.log(res.data.notifications);
      }
    }
    fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  }, [userId])

  const renderContent = () => {
    if (notifications === null) {
      return (
        <div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 border-b border-gray-100 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.94-5-6.71V2a1 1 0 0 0-2 0v1.29C8.185 4.06 6 6.783 6 10v4.586l-1.707 1.707A1 1 0 0 0 5 18h14a1 1 0 0 0 .707-1.707L19 14.586z"></path>
          </svg>
          <h4 className="font-semibold text-gray-700">No notifications</h4>
          <p className="text-gray-500 text-sm mt-1">You&apos;re all caught up!</p>
        </div>
      );
    }
    return (
      <div>
        {notifications.map((notif, index) => (
          <div key={index} className="p-4 border-b border-gray-100 flex items-start space-x-3 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notif.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 text-left overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 text-lg">Notifications</h3>
      </div>
      <div className="h-80 overflow-y-auto">
        {renderContent()}
      </div>
       <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
            
        </div>
    </div>
  );
}

export default Notification
