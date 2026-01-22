import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart, XCircle, ChevronRight } from "lucide-react";


interface BookCardLibraryProps {
  book: {
    bookId: string;
    title: string;
    imageUrl?: string | null;
    author: {
      fullName: string;
    };
  };
  // Provient de UserLibrary 
  status: string; 
  // Provient de created_at de UserLibrary
  addedAt?: Date; 
}

export default function BookCardLibrary({ book, status, addedAt }: BookCardLibraryProps) {
  const imageSource = book.imageUrl || "/couverture-livre-test.png";

  
  const statusLabel = status === "want_to_read" ? "A lire" : status;

  return (
    <Card className="flex flex-row items-center w-full max-w-2xl overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl h-32 group">
      
      {/* Zone Image (Gauche) */}
      <div className="relative bg-[#B2C3C9] h-full w-28 flex-shrink-0 flex items-center justify-center p-2">
        <div className="relative w-full h-full shadow-lg">
          <Image
            src={imageSource}
            alt={`Couverture de ${book.title}`}
            fill
            className="object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Zone Infos (Centre) */}
      <div className="flex flex-col flex-grow px-6 justify-center">
        <h3 className="font-black text-black text-lg uppercase tracking-tight line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 font-medium lowercase italic">
          {book.author.fullName}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <span className="px-4 py-1 border border-slate-400 rounded-full text-xs font-medium text-slate-600">
            {statusLabel}
          </span>
          {addedAt && (
            <span className="text-xs text-gray-300">
              Ajouté hier
            </span>
          )}
        </div>
      </div>

      {/* Zone Actions (Droite) */}
      <div className="flex items-center gap-6 pr-6">
        {/* Boutons d'action */}
        <div className="flex items-center gap-2">
          <button className="text-orange-500 hover:scale-110 transition-transform">
            <Heart size={28} fill="currentColor" className="text-[#E76F51]" />
          </button>
          <button className="text-slate-300 hover:text-red-500 transition-colors">
            <XCircle size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Lien Détails */}
        <Link
          href={`/detail-livre/${book.bookId}`}
          className="flex items-center gap-1 text-slate-800 font-bold hover:translate-x-1 transition-transform"
        >
          <span className="text-lg">Details</span>
          <ChevronRight size={24} />
        </Link>
      </div>
    </Card>
  );
}