"use client";

import React, { useState, useEffect } from "react";
//import NotificationsPage from "../../../components/dashcomp/Notifications.js";
import NotificationsPage from "../../../../components/dashcomp/Notifications/Notifications";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationsPage />
    </div>
  );
};

export default Notifications;
