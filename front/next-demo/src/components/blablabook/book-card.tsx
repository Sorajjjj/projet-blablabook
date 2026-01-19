import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Definition of what de card component can receive as props
interface BookCardProps {
	title: string;
	// author: string
	// imagePath: string
	// bgColor: string // Ex: "bg-[#9DB2BF]" ou "bg-[#E76F51]"
}
// author, imagePath, bgColor

export default function BookCard({ title }: BookCardProps) {
	return (
		<Card className="w-70 mt-8 overflow-hidden border-none shadow-sm bg-white rounded-xl group cursor-pointer">
			{/* 1. Top zone : The colored background + the book */}
			{/* We don't use CardHeader here because we want the color to touch the edges */}
			<div
				className={`bg-blabla-taupe p-2 flex justify-center items-center h-55 transition-colors`}
			>
				<Image
					src="https://covers.openlibrary.org/b/id/12642231-L.jpg"
					alt="Cover"
					width={144}
					height={208}
					className="w-32 h-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm transform group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			{/* 2. Bottom zone : Book information */}
			<CardContent className="p-4">
				<h3 className="font-bold text-black text-sm uppercase tracking-tight line-clamp-1">
					{title}
				</h3>
				<p className="text-xs text-gray-500 mt-1">TEST</p>
			</CardContent>
			{/* 3. Bottom card : link "Voir plus" */}
			<CardFooter className="flex justify-center pb-4 pt-0">
				<Link
					href="#"
					className="text-blabla-orange text-sm font-bold hover:underline"
				>
					Voir plus
				</Link>
			</CardFooter>
		</Card>
	);
}
