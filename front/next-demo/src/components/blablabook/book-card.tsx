"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
	title: string;
	author: string;
	bookId: string;
	imageUrl?: string | null;
}

export default function BookCard({
	title,
	author,
	bookId,
	imageUrl,
}: BookCardProps) {
	const fallbackImage = "/couverture-secours.png";
	const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);

	return (
		<Card className="w-[145px] h-[260px] md:w-70 md:h-83 overflow-hidden border-none shadow-sm bg-white rounded-xl group flex flex-col">
			{/* Image Zone */}
			<div className="bg-blabla-taupe p-2 md:p-4 flex justify-center items-center h-[165px] md:h-64 transition-colors relative">
				<Link href={`/detail-livre/${bookId}`} className="contents">
					<Image
						src={imgSrc}
						alt={`Cover of the book ${title}`}
						width={144}
						height={180}
						className="h-[130px] md:h-48 w-auto object-contain shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
						unoptimized
						onError={() => {
							setImgSrc(fallbackImage);
						}}
					/>
				</Link>
			</div>

			{/* Info Zone */}
			<CardContent className="p-2 md:p-4 flex-grow">
				<h3 className="font-bold text-black text-[10px] md:text-sm uppercase tracking-tight line-clamp-2 leading-tight">
					{title}
				</h3>
				<p className="text-[9px] md:text-xs text-gray-500 mt-0.5 md:mt-1 line-clamp-1">
					{author}
				</p>
			</CardContent>

			{/* Link Zone */}
			<CardFooter className="flex justify-center pb-2 md:pb-4 pt-0">
				<Link
					href={`/detail-livre/${bookId}`}
					className="text-blabla-orange text-[10px] md:text-sm font-bold hover:underline"
				>
					Voir plus
				</Link>
			</CardFooter>
		</Card>
	);
}
