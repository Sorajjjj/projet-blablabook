import { Card } from "@/components/ui/card";
import styles from "./book-card-library.module.css";
import Image from "next/image";
import Link from "next/link";
import { XCircle, ChevronRight } from "lucide-react";

interface BookCardLibraryProps {
  book: {
    bookId: string;
    title: string;
    imageUrl?: string | null;
    author: {
      fullName: string;
    };
  };
  status: string;
  addedAt?: Date;
  onDelete: () => void;
  onUpdateStatus: (newStatus: string) => void;
}

export default function BookCardLibrary({ book, status, addedAt, onDelete, onUpdateStatus }: BookCardLibraryProps) {

  /* Updates book status via API and triggers parent state update */
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    try {
      const response = await fetch(`http://localhost:4000/api/libraries/${book.bookId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onUpdateStatus(newStatus);
      }
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
    }
  };

  /* Fallback image logic */
  const imageSource = book.imageUrl || "/couverture-livre-test.png";

  return (
    <Card className="flex flex-row items-center w-full max-w-2xl overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl h-44 group transition-all duration-500 hover:shadow-md hover:-translate-y-0.5">

      {/* Book cover section */}
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

      {/* Info Zone (Center) */}
      <div className={styles.cardContainer}>
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>
            {book.title}
          </h3>
          <p className={styles.author}>
            {book.author.fullName}
          </p>

          <div className={styles.infoGroup}>
            <select
              value={status}
              onChange={handleStatusChange}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-full px-3 py-1 outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer appearance-none"
            >
              <option value="A lire">À lire</option>
              <option value="En cours">En cours</option>
              <option value="Lu">Lu</option>
            </select>
            {addedAt && (
              <span className={styles.date}>
                Ajouté le {new Date(addedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions Zone (Right) */}
      <div className={styles.actionsContainer}>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.deleteBtn} onClick={onDelete}>
            <XCircle size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Details Link */}
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