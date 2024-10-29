"use client";
import { useState, useEffect } from "react";
import { urlB64ToUint8Array } from "@/lib/utils";

export type NotificationStatus = "granted" | "denied" | "default";

const NotificationRequest = () => {
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationStatus>("default");

  const showNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          subscribeUser();
        } else {
          console.log("please go to setting and enable noitificatoin.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  async function subscribeUser() {
    if ("serviceWorker" in navigator) {
      try {
        // Check if service worker is already registered
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          generateSubscribeEndPoint(registration);
        } else {
          // Register the service worker
          const newRegistration = await navigator.serviceWorker.register(
            "/sw.js"
          );
          // Subscribe to push notifications
          generateSubscribeEndPoint(newRegistration);
        }
      } catch (error) {
        console.log(
          "Error during service worker registration or subscription:",
          error
        );
      }
    } else {
      console.log("Service workers are not supported in this browser");
    }
  }

  const generateSubscribeEndPoint = async (
    newRegistration: ServiceWorkerRegistration
  ) => {
    const applicationServerKey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY!
    );
    const options = {
      applicationServerKey,
      userVisibleOnly: true, // This ensures the delivery of notifications that are visible to the user, eliminating silent notifications. (Mandatory in Chrome, and optional in Firefox)
    };
    const subscription = await newRegistration.pushManager.subscribe(options);
    console.log(
      "Subscribed to push notifications!",
      JSON.stringify(subscription)
    );
  };

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission !== "granted") {
          console.log("please go to setting and enable noitificatoin.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  }, []);

  return (
    <div>
      {notificationPermission !== "granted" && (
        <button onClick={showNotification}>recibir notificaciones</button>
      )}
    </div>
  );
};

export default NotificationRequest;
