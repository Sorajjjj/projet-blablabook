"use client";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface User {
	name: string;
	email: string;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	login: (userData: User) => void;
	logout: () => Promise<void>;
	isHydrated: boolean; // Add this to track hydration
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isHydrated, setIsHydrated] = useState(false); // New state

	// Handle hydration and initial user load
	useEffect(() => {
		const savedUser = localStorage.getItem("blablabook_user");
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
		setIsHydrated(true); // App is now hydrated on the client
	}, []);

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem("blablabook_user", JSON.stringify(userData));
	};

	const logout = async () => {
		try {
			await fetch("http://localhost:4000/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
		} catch (error) {
			console.error("Backend logout failed:", error);
		} finally {
			setUser(null);
			localStorage.removeItem("blablabook_user");
		}
	};

	// Session validity check (the one we added before)
	useEffect(() => {
		if (!isHydrated || !user) return;

		const checkSessionValidity = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/settings", {
					method: "GET",
					credentials: "include",
				});
				if (!response.ok) {
					logout();
				}
			} catch (err) {
				console.error("Unable to verify session:", err);
			}
		};

		checkSessionValidity();
	}, [isHydrated, user]);

	return (
		<AuthContext.Provider value={{ user, login, logout, isHydrated }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
