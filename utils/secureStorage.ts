import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const AUTH_KEY = "auth_token";

/**
 * Cross-platform storage utility that uses SecureStore on native platforms
 * and falls back to AsyncStorage/localStorage on web
 */
export const secureStorage = {
  // Save data securely
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  },

  // Retrieve secure data
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  },

  // Remove secure data
  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },

  // Authentication specific methods
  async saveToken(token: string): Promise<void> {
    await this.setItem(AUTH_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await this.getItem(AUTH_KEY);
  },

  async removeToken(): Promise<void> {
    await this.removeItem(AUTH_KEY);
  },
};
