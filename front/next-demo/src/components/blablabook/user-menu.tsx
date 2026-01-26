"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Library, Settings, LogOut, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	user: {
		name: string;
		email: string;
		avatar?: string;
	};
	onLogout?: () => void;
	isMobile?: boolean;
}

export default function UserMenu({
	user,
	onLogout,
	isMobile = false,
}: UserMenuProps) {
	const router = useRouter();

	const handleLogout = () => {
		if (onLogout) onLogout();
	};

	const getInitials = () => {
		if (!user || !user.name) return "U";

		return user.name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-2 cursor-pointer focus:outline-none">
					<Avatar className={isMobile ? "w-9 h-9" : "w-10 h-10"}>
						<AvatarImage src={user?.avatar} alt={user?.name || "User"} />
						<AvatarFallback className="bg-blabla-orange text-white">
							{getInitials()}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="w-56 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 rounded-md"
			>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{user.name}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="cursor-pointer hover:bg-blabla-cream md:hidden"
					onClick={() => router.push("/catalogue")}
				>
					<BookOpen className="mr-2 h-4 w-4" />
					<span>Catalogue</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer hover:bg-blabla-cream"
					onClick={() => router.push("/accueil")}
				>
					<Home className="mr-2 h-4 w-4" />
					<span>Accueil</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer hover:bg-blabla-cream"
					onClick={() => router.push("/bibliotheque")}
				>
					<Library className="mr-2 h-4 w-4" />
					<span>Bibliothèque</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					className="cursor-pointer hover:bg-blabla-cream"
					onClick={() => router.push("/parametres")}
				>
					<Settings className="mr-2 h-4 w-4" />
					<span>Paramètres du compte</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900"
					onClick={handleLogout}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Déconnexion</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
