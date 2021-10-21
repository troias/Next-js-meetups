import React, { useState, useEffect } from "react";

const NotificationContext = React.createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const contextObj = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={contextObj}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
