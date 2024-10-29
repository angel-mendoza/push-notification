"use server";
import webpush from "web-push";

export const sendNotification = async (
	message: string,
	name: string
) => {
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
      JSON.parse('{"endpoint":"https://fcm.googleapis.com/fcm/send/c5hZI6mIHyM:APA91bGNI4HBW3v_wDkiYs0XUK6BngxB-dK2d21tzvx7nc9SIL2bcdKCizCIralIkrtkSBvLZSMlzqxFHcu_vxjituASwmaCCXDxWoWWuIoNNdRCIlFX2zsuA5EqQQZ3yjsABt8MwdVD","expirationTime":null,"keys":{"p256dh":"BKTIfeCRLuviNs5MyIR521YBd6eCYQRaV3WJDov0dK4h0ENTTVrdPS840td4zXzzS6FUDd-eTjyJWZLv4sdClro","auth":"sDgGQraR3EtKSWCOR97kPw"}}'),
      JSON.stringify({
        message: name,
        icon: '/icon512_rounded.png',
        body: message,
      })
    );
    return "{}";
  } catch (e) {
    return JSON.stringify({ error: "failed to send notification", e });
  }
};
