import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { secureStorage } from "@/utils/secureStorage";

type User = {
  id: string;
  name: string;
  // Add other user properties as needed
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on startup
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await secureStorage.getToken();

        if (storedToken) {
          // In a real app, you would validate the token here
          // and fetch the user data from your API
          setToken(storedToken);
          setIsAuthenticated(true);

          // For demo purposes, we're creating a mock user
          // In a real app, you would fetch the user data from your API
          setUser({
            id: "1",
            name: "Demo User",
          });
        }
      } catch (error) {
        console.error("Failed to load auth token", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async (newToken: string, userData: User) => {
    try {
      await secureStorage.saveToken(newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Sign in failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await secureStorage.removeToken();
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign out failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
