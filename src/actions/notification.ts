"use server";
import webpush from "web-push";

export const sendNotification = async (message: string, name: string) => {
  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  };
  //setting our previously generated VAPID keys
  webpush.setVapidDetails(
    "mailto:myuserid@email.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  try {
    await webpush.sendNotification(
      JSON.parse(
        '{"endpoint":"https://fcm.googleapis.com/fcm/send/euJDi4OFcLc:APA91bHaYr0kG5t88oG4YCg3eiAf42nfdxW_I4hpTPWwc5dhbYMJuQdCFIt-EcX0C4CNQD-TCLFEzfK5uhnS1dDufqHh9cU_gVhBPs8RwS88emH2AmmVh3qyhfuHJ53w5mztFyJ85Ikf","expirationTime":null,"keys":{"p256dh":"BLMCVcfJaP4skkidSIhAqiOe9mEjYhIGFi3ABPAjnxHl5k_uCiymUVNGK0-w7d6X9hMQlbpPed7mW3YSpKWaOn0","auth":"JznWYsy_l9FT7xuVcARk-g"}}'
      ),
      JSON.stringify({
        message: name,
        icon: "/icon512_rounded.png",
        body: message,
      })
    );
    return "{}";
  } catch (e) {
    return JSON.stringify({error: "failed to send notification", e});
  }
};
