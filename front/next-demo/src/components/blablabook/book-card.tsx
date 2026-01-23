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

export default function BookCard({ title, author, bookId, imageUrl }: BookCardProps) {

  // Definition of the path to your new fallback image
  const fallbackImage = "/couverture-secours.png";

  // State initialization (imgSrc)
  // - If an 'imageUrl' is provided via props, use it as the starting point.
  // - Otherwise (if null or undefined), display the fallback image directly.
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage);

  return (
    <Card className="w-70 overflow-hidden border-none shadow-sm bg-white rounded-xl group flex flex-col h-full">
      {/* Image Zone */}
      {/* h-64 (256px) for the container */}
      <div className="bg-blabla-taupe p-4 flex justify-center items-center h-64 transition-colors relative">

        <Link href={`/detail-livre/${bookId}`} className="contents">
          <Image
            // Use the 'imgSrc' state variable as the source
            src={imgSrc}
            alt={`Cover of the book ${title}`}
            width={144}
            height={180}
            // h-48 (192px) for the image, leaving room for the shadow
            // object-contain ensures your fallback image isn't cropped
            className="h-48 w-auto object-contain shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            unoptimized
            // 4️⃣ Error handler
            onError={() => {
              // If the main image fails to load, update the state
              // to use the fallback image.
              setImgSrc(fallbackImage);
            }}
          />
        </Link>

      </div>

      {/* Info Zone */}
      <CardContent className="p-4 flex-grow">
        <h3 className="font-bold text-black text-sm uppercase tracking-tight line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{author}</p>
      </CardContent>

      {/* Link Zone */}
      <CardFooter className="flex justify-center pb-4 pt-0">
        <Link
          href={`/detail-livre/${bookId}`}
          className="text-blabla-orange text-sm font-bold hover:underline"
        >
          Voir plus
        </Link>
      </CardFooter>
    </Card>
  );
}