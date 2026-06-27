import { Expo } from "expo-server-sdk";

const expo = new Expo();

export const sendPushNotification = async (
  token: string,
  title: string,
  body: string,
) => {
  if (!Expo.isExpoPushToken(token)) {
    console.log("Invalid Expo Push Token");

    return;
  }

  await expo.sendPushNotificationsAsync([
    {
      to: token,
      sound: "default",
      title,
      body,
    },
  ]);
};
