import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Nettoyage de la base de données...");
  
  // 1. On supprime tout pour éviter l'erreur "Unique constraint failed"
  // L'ordre est important à cause des relations (on supprime les liaisons avant les parents)
  await prisma.userLibrary.deleteMany();
  await prisma.bookGenre.deleteMany();
  await prisma.book.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.author.deleteMany();

  console.log("🌱 Début du seeding...");

  // 2. Créer des auteurs
  const authors = await prisma.author.createMany({
    data: [
      { fullName: "J.K. Rowling" },
      { fullName: "George R.R. Martin" },
      { fullName: "J.R.R. Tolkien" },
      { fullName: "Agatha Christie" },
      { fullName: "Stephen King" },
    ],
  });

  // 3. Récupérer les auteurs créés (nécessaire pour avoir leurs ID)
  const allAuthors = await prisma.author.findMany();

  // 4. Créer des genres
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

  // 5. Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      username: "demo_user",
      email: "demo@test.com",
      passwordHash: "fake_hashed_password",
      isActive: true,
    },
  });

  // 5bis. Créer les paramètres d'utilisateur
  const userSettings = await prisma.userSettings.create({
    data: {
      userId: user.userId,
      theme: "light",
    },
  });

  // 5. Créer des livres
  const book1 = await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      authorId: allAuthors[0].authorId,
      releaseDate: new Date("1997-06-26"),
      isbn: "9780747532743",
      summary: "Orphelin vivant chez son oncle et sa tante qui ne l'aiment pas, Harry découvre qu'il est magicien.",
      // Couverture Harry Potter
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Game of Thrones",
      authorId: allAuthors[1].authorId,
      releaseDate: new Date("1996-08-01"),
      isbn: "9780553103540",
      summary: "Il y a fort longtemps, au Royaume des Sept Couronnes, une force mystérieuse a plongé la terre dans un hiver éternel.",
      // Couverture Game of Thrones
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg",
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: "The Lord of the Rings",
      authorId: allAuthors[2].authorId,
      releaseDate: new Date("1954-07-29"),
      isbn: "9780618640157",
      summary: "Le Tiers Âge touche à sa fin et l'Ombre grandit à l'Est. Frodon Sacquet hérite de l'Anneau Unique.",
      // Couverture LOTR
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
    },
  });

  const book4 = await prisma.book.create({
    data: {
      title: "Murder on the Orient Express",
      authorId: allAuthors[3].authorId,
      releaseDate: new Date("1934-01-01"),
      isbn: "9780007119318",
      summary: "Le train de l'Orient-Express est bloqué par la neige. Un passager américain est retrouvé poignardé.",
      // Couverture Agatha Christie
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c0/Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg",
    },
  });

  const book5 = await prisma.book.create({
    data: {
      title: "The Shining",
      authorId: allAuthors[4].authorId,
      releaseDate: new Date("1977-01-28"),
      isbn: "9780385121675",
      summary: "Jack Torrance accepte le poste de gardien d'un hôtel isolé dans les montagnes du Colorado.",
      // Couverture The Shining
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg/430px-The_Shining_%281977%29_front_cover%2C_first_edition.jpg",
    },
  });

  const books = [book1, book2, book3, book4, book5];

  // 7. Lier livres ↔ genres
  await prisma.bookGenre.createMany({
    data: [
      { bookId: books[0].bookId, genreId: allGenres[0].genreId },
      { bookId: books[1].bookId, genreId: allGenres[0].genreId },
      { bookId: books[2].bookId, genreId: allGenres[4].genreId },
      { bookId: books[3].bookId, genreId: allGenres[3].genreId },
      { bookId: books[4].bookId, genreId: allGenres[2].genreId },
    ],
  });

  // 8. Ajouter des livres dans la bibliothèque du user
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
    console.error("❌ Erreur seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });