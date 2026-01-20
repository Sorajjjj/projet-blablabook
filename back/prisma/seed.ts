import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Nettoyage de la base de données...");
  await prisma.userLibrary.deleteMany();
  await prisma.bookGenre.deleteMany();
  await prisma.book.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.author.deleteMany();

  console.log("🌱 Début du seeding...");

  // 1. Définition des Auteurs
  // On stocke les noms dans un objet pour les retrouver facilement plus tard
  const authorNames = [
    "J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "Agatha Christie", 
    "Stephen King", "George Orwell", "Jane Austen", "F. Scott Fitzgerald", 
    "Herman Melville", "Leo Tolstoy", "James Joyce", "Harper Lee", 
    "Gabriel Garcia Marquez", "Dan Brown", "Arthur Conan Doyle"
  ];

  // Création en masse des auteurs
  await prisma.author.createMany({
    data: authorNames.map(name => ({ fullName: name })),
  });

  // On récupère les auteurs pour avoir leurs IDs
  const allAuthors = await prisma.author.findMany();
  
  // Petite fonction utilitaire pour trouver l'ID d'un auteur par son nom
  const getAuthorId = (name: string) => {
    const author = allAuthors.find(a => a.fullName === name);
    if (!author) throw new Error(`Auteur ${name} introuvable`);
    return author.authorId;
  };

  // 2. Création des Genres
  const genresList = ["Fantasy", "Thriller", "Horror", "Detective", "Adventure", "Sci-Fi", "Romance", "Classic", "Drama"];
  
  await prisma.genre.createMany({
    data: genresList.map(name => ({ name })),
  });

  const allGenres = await prisma.genre.findMany();
  const getGenreId = (name: string) => allGenres.find(g => g.name === name)!.genreId;

  // 3. Création de l'Utilisateur
  const user = await prisma.user.create({
    data: {
      username: "demo_user",
      email: "demo@test.com",
      passwordHash: "fake_hashed_password",
      isActive: true,
      settings: {
        create: { theme: "light" }
      }
    },
  });

  // 4. LA LISTE DES 20 LIVRES 📚
  // Pour éviter les erreurs d'images, j'ai réutilisé des couvertures fiables (Wikimedia)
  // Tu pourras remplacer les URLs par des vraies couvertures spécifiques plus tard.
  const booksData = [
    // --- LES 5 EXISTANTS ---
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      date: "1997-06-26",
      isbn: "9780747532743",
      summary: "Harry découvre qu'il est un sorcier et rejoint l'école de Poudlard.",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
      genres: ["Fantasy", "Adventure"]
    },
    {
      title: "Game of Thrones",
      author: "George R.R. Martin",
      date: "1996-08-01",
      isbn: "9780553103540",
      summary: "L'hiver vient. Les familles nobles s'affrontent pour le Trône de Fer.",
      img: "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg",
      genres: ["Fantasy", "Drama"]
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      date: "1954-07-29",
      isbn: "9780618640157",
      summary: "Frodon doit détruire l'Anneau Unique pour sauver la Terre du Milieu.",
      img: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif",
      genres: ["Fantasy", "Adventure"]
    },
    {
      title: "Murder on the Orient Express",
      author: "Agatha Christie",
      date: "1934-01-01",
      isbn: "9780007119318",
      summary: "Hercule Poirot enquête sur un meurtre dans un train bloqué par la neige.",
      img: "https://upload.wikimedia.org/wikipedia/en/c/c0/Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg",
      genres: ["Detective", "Thriller"]
    },
    {
      title: "The Shining",
      author: "Stephen King",
      date: "1977-01-28",
      isbn: "9780385121675",
      summary: "Un gardien d'hôtel sombre dans la folie, hanté par les fantômes des lieux.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg/430px-The_Shining_%281977%29_front_cover%2C_first_edition.jpg",
      genres: ["Horror", "Thriller"]
    },
    // --- NOUVEAUX LIVRES (15+) ---
    {
      title: "1984",
      author: "George Orwell",
      date: "1949-06-08",
      isbn: "9780451524935",
      summary: "Dans un monde totalitaire, Big Brother vous surveille en permanence.",
      img: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg",
      genres: ["Sci-Fi", "Drama"]
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      date: "1813-01-28",
      isbn: "9780141439518",
      summary: "Les relations complexes et l'amour naissant entre Elizabeth Bennet et Mr. Darcy.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/360px-PrideAndPrejudiceTitlePage.jpg",
      genres: ["Classic", "Romance"]
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "1925-04-10",
      isbn: "9780743273565",
      summary: "L'histoire du mystérieux millionnaire Jay Gatsby et de sa passion pour Daisy Buchanan.",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
      genres: ["Classic", "Drama"]
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      date: "1851-10-18",
      isbn: "9781503280786",
      summary: "La quête obsessionnelle du capitaine Achab pour se venger de la baleine blanche.",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/36/Moby-Dick_FE_title_page.jpg",
      genres: ["Adventure", "Classic"]
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      date: "1869-01-01",
      isbn: "9780199232765",
      summary: "La vie de cinq familles aristocratiques russes pendant les guerres napoléoniennes.",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg",
      genres: ["Classic", "Drama"]
    },
    {
      title: "Ulysses",
      author: "James Joyce",
      date: "1922-02-02",
      isbn: "9780679722762",
      summary: "Les pérégrinations de Leopold Bloom à travers Dublin au cours d'une journée ordinaire.",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg",
      genres: ["Classic", "Drama"]
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      date: "1960-07-11",
      isbn: "9780061120084",
      summary: "Un avocat blanc défend un homme noir accusé de viol dans l'Alabama des années 1930.",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
      genres: ["Classic", "Drama"]
    },
    {
      title: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      date: "1967-05-30",
      isbn: "9780060883287",
      summary: "L'histoire de la famille Buendia sur sept générations dans le village fictif de Macondo.",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg",
      genres: ["Classic", "Fantasy"]
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      date: "2003-03-18",
      isbn: "9780307474278",
      summary: "Une enquête palpitante à travers les symboles cachés dans les œuvres de Léonard de Vinci.",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
      genres: ["Thriller", "Detective"]
    },
    {
      title: "Sherlock Holmes: A Study in Scarlet",
      author: "Arthur Conan Doyle",
      date: "1887-11-01",
      isbn: "9780192123190",
      summary: "La première enquête du célèbre détective Sherlock Holmes et de son ami le Dr Watson.",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/ArthurConanDoyle_AStudyInScarlet_1887.jpg",
      genres: ["Detective", "Classic"]
    },
    // On rajoute quelques Harry Potter pour le volume
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      date: "1998-07-02",
      isbn: "9780747538493",
      summary: "Harry retourne à Poudlard où une chambre secrète a été ouverte, libérant un monstre.",
      img: "https://upload.wikimedia.org/wikipedia/en/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg",
      genres: ["Fantasy", "Adventure"]
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      date: "1999-07-08",
      isbn: "9780747542155",
      summary: "Le dangereux Sirius Black s'est échappé de la prison d'Azkaban pour retrouver Harry.",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg",
      genres: ["Fantasy", "Adventure"]
    },
    {
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      date: "2000-07-08",
      isbn: "9780747546245",
      summary: "Harry participe contre son gré au dangereux Tournoi des Trois Sorciers.",
      img: "https://upload.wikimedia.org/wikipedia/en/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png",
      genres: ["Fantasy", "Adventure"]
    },
    {
      title: "A Clash of Kings",
      author: "George R.R. Martin",
      date: "1998-11-16",
      isbn: "9780553108033",
      summary: "La guerre des cinq rois déchire le royaume de Westeros.",
      img: "https://upload.wikimedia.org/wikipedia/en/3/39/AClashOfKings.jpg",
      genres: ["Fantasy", "Drama"]
    },
    {
      title: "A Storm of Swords",
      author: "George R.R. Martin",
      date: "2000-08-08",
      isbn: "9780553106633",
      summary: "Les combats s'intensifient et des alliances inattendues se forment.",
      img: "https://upload.wikimedia.org/wikipedia/en/2/24/AStormOfSwords.jpg",
      genres: ["Fantasy", "Drama"]
    }
  ];

  // 5. Boucle de création des livres
  console.log(`📚 Création de ${booksData.length} livres...`);
  
  const createdBooks = [];
  
  for (const bookInfo of booksData) {
    // On crée le livre
    const newBook = await prisma.book.create({
      data: {
        title: bookInfo.title,
        releaseDate: new Date(bookInfo.date),
        isbn: bookInfo.isbn,
        summary: bookInfo.summary,
        imageUrl: bookInfo.img,
        authorId: getAuthorId(bookInfo.author), // On récupère l'ID via le nom
      },
    });
    
    createdBooks.push(newBook);

    // On lie les genres
    for (const genreName of bookInfo.genres) {
      await prisma.bookGenre.create({
        data: {
          bookId: newBook.bookId,
          genreId: getGenreId(genreName),
        },
      });
    }
  }

  // 6. Ajouter quelques livres dans la bibliothèque du user (au hasard)
  // On prend les 3 premiers livres de la liste
  await prisma.userLibrary.createMany({
    data: [
      { userId: user.userId, bookId: createdBooks[0].bookId, status: "want_to_read" },
      { userId: user.userId, bookId: createdBooks[1].bookId, status: "reading" },
      { userId: user.userId, bookId: createdBooks[5].bookId, status: "read" },
    ],
  });

  console.log("✅ Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });