import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/components/Notification.css";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, visible } = useSelector((state) => state.notification);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) {
    return null;
  }

  return <div className="notification-container show">{message}</div>;
};

export default Notification;
