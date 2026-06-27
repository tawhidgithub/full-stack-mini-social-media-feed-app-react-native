import { Expo } from "expo-server-sdk";

const expo = new Expo();

export async function sendNotification(
  token: string,
  title: string,
  body: string,
  data: Record<string, any> = {},
) {
  console.log("Notifications Fn---run----1");

  if (!Expo.isExpoPushToken(token)) {
    console.log("Invalid Expo Push Token:", token);
    return;
  }
  console.log("Notifications Fn---run----2");

  const messages = [
    {
      to: token,
      sound: "default",
      title,
      body,
      data,
    },
  ];
  console.log("Notifications messages-------", messages);

  try {
    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log(tickets);
    }
  } catch (err) {
    console.error(err);
  }
}
