"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Defining the shape of a User object
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Defining the shape of the data that the Context will share
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    /*We read LocalStorage inside the useState initializer.
    This way, we only access LocalStorage once when the component mounts,
   */
    const [user, setUser] = useState<User | null>(() => {
    // Check if window is defined to prevent errors during Next.js Server-Side Rendering
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("blablabook_user");
            return savedUser ? JSON.parse(savedUser) : null;
        }
    return null;
    });

    /**
     * Updates the global state and persists the user in LocalStorage.
     * This will be called from the Login Form.
   */
    const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("blablabook_user", JSON.stringify(userData));
    };

    /**
   * Resets the global state and removes the user from LocalStorage.
   * This will be called from the Header/UserMenu.
   */
 const logout = async () => {
    try {
      // Call the backend logout route
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include", 
      });
    } 
    catch (error) {
      console.error("Backend logout failed:", error);
    } 
    finally {
      // 2. Always clear local data, even if the network request fails
      setUser(null);
      localStorage.removeItem("blablabook_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to easily access the Auth context from any component (Header, Login, etc.)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};