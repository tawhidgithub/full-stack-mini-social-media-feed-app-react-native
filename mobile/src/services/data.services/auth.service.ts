import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

export const authService = {
  login: async (body: { email: string; password: string }) => {
    const res = await api.post(ENDPOINTS.login, body);
    console.log("");

    await AsyncStorage.setItem("token", res.data.token);

    return res.data;
  },

  register: async (body: {
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post(ENDPOINTS.register, body);

    await AsyncStorage.setItem("token", res.data.token);

    return res.data;
  },
  savePushToken: async (token: string) => {
    const res = await api.post(ENDPOINTS.notifications, {
      token,
    });

    return res.data;
  },

  logout: async () => {
    await AsyncStorage.multiRemove(["token", "user"]);
  },
};
