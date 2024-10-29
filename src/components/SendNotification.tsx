"use client";
import {sendNotification} from "@/actions/notification";

const SendNotification = () => {
  const handlePushNotification = async () => {
    await sendNotification("mensaje", "name");
  };

  // setInterval(() => {
  //   handlePushNotification();
  // }, 30000);

  return <button onClick={handlePushNotification}>enviar notificacion</button>;
};

export default SendNotification;
