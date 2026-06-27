import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@auth_token";
const USER_KEY = "@auth_user";

export const storage = {
  async saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async saveUser(user: object) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser() {
    const user = await AsyncStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  async removeUser() {
    await AsyncStorage.removeItem(USER_KEY);
  },

  async clear() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  },
};
