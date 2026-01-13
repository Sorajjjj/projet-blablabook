import "dotenv/config";
import { PrismaClient } from "../node_modules/@prisma/client";


const prisma = new PrismaClient();

async function main() {
  // 1. Créer des auteurs
  const authors = await prisma.author.createMany({
    data: [
      { fullName: "J.K. Rowling" },
      { fullName: "George R.R. Martin" },
      { fullName: "J.R.R. Tolkien" },
      { fullName: "Agatha Christie" },
      { fullName: "Stephen King" },
    ],
  });

  // 2. Récupérer les auteurs créés
  const allAuthors = await prisma.author.findMany();

  // 3. Créer des genres
  await prisma.genre.createMany({
    data: [
      { name: "Fantasy" },
      { name: "Thriller" },
      { name: "Horror" },
      { name: "Detective" },
      { name: "Adventure" },
    ],
  });

  const allGenres = await prisma.genre.findMany();

  // 4. Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      username: "demo_user",
      email: "demo@test.com",
      passwordHash: "fake_hashed_password",
    },
  });

  // 5. Créer des livres
  const book1 = await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      authorId: allAuthors[0].authorId,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Game of Thrones",
      authorId: allAuthors[1].authorId,
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "The Lord of the Rings",
      authorId: allAuthors[2].authorId,
    },
  });

  const book4 = await prisma.book.create({
    data: {
      title: "Murder on the Orient Express",
      authorId: allAuthors[3].authorId,
    },
  });

  const book5 = await prisma.book.create({
    data: {
      title: "The Shining",
      authorId: allAuthors[4].authorId,
    },
  });

  const books = [book1, book2, book3, book4, book5];

  // 6. Lier livres ↔ genres
  await prisma.bookGenre.createMany({
    data: [
      { bookId: books[0].bookId, genreId: allGenres[0].genreId },
      { bookId: books[1].bookId, genreId: allGenres[0].genreId },
      { bookId: books[2].bookId, genreId: allGenres[4].genreId },
      { bookId: books[3].bookId, genreId: allGenres[3].genreId },
      { bookId: books[4].bookId, genreId: allGenres[2].genreId },
    ],
  });

  // 7. Ajouter des livres dans la bibliothèque du user
  await prisma.userLibrary.createMany({
    data: [
      { userId: user.userId, bookId: books[0].bookId, status: "want_to_read" },
      { userId: user.userId, bookId: books[1].bookId, status: "reading" },
      { userId: user.userId, bookId: books[2].bookId, status: "read" },
    ],
  });

  console.log("✅ Seeding terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
