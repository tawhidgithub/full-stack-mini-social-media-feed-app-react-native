import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { authService } from "../services/data.services/auth.service";
import { registerForPushNotifications } from "../services/data.services/notification.service";

export const useAuth = () => {
  const { login: authLogin, logout: clearSession } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const login = async (body: { email: string; password: string }) => {
    try {
      setLoading(true);
      console.log("login body --------------", body);

      const res = await authService.login(body);
      console.log("Login Response --------------", res);
      console.log("Login Response --------------", res.user);

      await authLogin(res.user, res.token);
      // Register push notification
      try {
        const token = await registerForPushNotifications();

        if (token) {
          await authService.savePushToken(token);
          console.log("✅ Push token saved");
        }
      } catch (error) {
        console.log("❌ Failed to save push token", error);
      }

      return res;
    } finally {
      setLoading(false);
    }
  };
  const register = async (body: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      console.log("Registration body --------------", body);
      const res = await authService.register(body);
      console.log("Registration Response --------------", res);

      await authLogin(res.data, res.token);
      try {
        const token = await registerForPushNotifications();

        if (token) {
          await authService.savePushToken(token);
          console.log("✅ Push token saved");
        }
      } catch (error) {
        console.log("❌ Failed to save push token", error);
      }

      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await authService.logout();
      await clearSession();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    logout,
    register,
  };
};
