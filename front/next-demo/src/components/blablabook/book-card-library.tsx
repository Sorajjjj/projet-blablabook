import { Card } from "@/components/ui/card";
import styles from "./book-card-library.module.css";
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
  onDelete: () => void;
}

export default function BookCardLibrary({ book, status, addedAt, onDelete }: BookCardLibraryProps) {
  const imageSource = book.imageUrl || "/couverture-livre-test.png";

  
  const statusLabel = status === "A lire" ? "A lire" : status;

  return (
    <Card className="flex flex-row items-center w-full max-w-2xl overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl h-45 group">
      
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
<div className={styles.cardContainer}>
  <div className={styles.contentWrapper}>
    <h3 className={styles.title}>
      {book.title}
    </h3>
    <p className={styles.author}>
      {book.author.fullName}
    </p>

    <div className={styles.infoGroup}>
      <span className={styles.badge}>
        {statusLabel}
      </span>
      {addedAt && (
        <span className={styles.date}>
          Ajouté hier
        </span>
      )}
    </div>
  </div>
</div>

{/* Zone Actions (Droite) */}
<div className={styles.actionsContainer}>
  
  {/* Boutons d'action */}
  <div className={styles.buttonGroup}>
    <button className={styles.heartBtn}>
      <Heart size={28} fill="currentColor" />
    </button>
    <button className={styles.deleteBtn} onClick={onDelete}>
      <XCircle size={28} strokeWidth={1.5} />
    </button>
  </div>

  {/* Lien Détails */}
  <Link
    href={`/detail-livre/${book.bookId}`}
    className={styles.detailsLink}
  >
    <span className={styles.detailsText}>Details</span>
    <ChevronRight size={24} />
  </Link>
</div>
    </Card>
  );
}