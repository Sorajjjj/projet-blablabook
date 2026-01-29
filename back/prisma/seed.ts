import "dotenv/config";
import { PrismaClient, Book } from "@prisma/client";

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

  // --- 1. LISTE COMPLÈTE DES AUTEURS ---
  const authorNames = [
    "J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "Agatha Christie", 
    "Stephen King", "George Orwell", "Jane Austen", "F. Scott Fitzgerald", 
    "Herman Melville", "Leo Tolstoy", "James Joyce", "Harper Lee", 
    "Gabriel Garcia Marquez", "Dan Brown", "Arthur Conan Doyle",
    "Frank Herbert", "Isaac Asimov", "Ray Bradbury", "Aldous Huxley", "Mary Shelley", 
    "Bram Stoker", "Oscar Wilde", "C.S. Lewis", "Antoine de Saint-Exupéry", 
    "Albert Camus", "Victor Hugo", "Alexandre Dumas", "Gustave Flaubert", 
    "Émile Zola", "Charles Dickens", "Emily Brontë", "Charlotte Brontë", 
    "Mark Twain", "Ernest Hemingway", "John Steinbeck", "Kurt Vonnegut", 
    "Cormac McCarthy", "Margaret Atwood", "Paulo Coelho", "Haruki Murakami", 
    "Stieg Larsson", "Gillian Flynn", "Thomas Harris", "Ken Follett", 
    "Patrick Rothfuss", "Brandon Sanderson", "Neil Gaiman", "H.G. Wells",
    "Jules Verne", "Franz Kafka", "Fyodor Dostoevsky", "Homer", "Virgil",
    "J.D. Salinger", "William Golding", "Douglas Adams", "Orson Scott Card", 
    "William Gibson", "Miguel de Cervantes", "Dante Alighieri", "Lewis Carroll", 
    "J.M. Barrie", "Suzanne Collins", "Stephenie Meyer", "Yann Martel"
  ];

  console.log(`✍️ Création de ${authorNames.length} auteurs...`);
  
  await prisma.author.createMany({
    data: authorNames.map(name => ({ fullName: name })),
  });

  const allAuthors = await prisma.author.findMany();
  const getAuthorId = (name: string) => {
    const author = allAuthors.find(a => a.fullName === name);
    if (!author) {
        console.warn(`⚠️ Auteur introuvable : ${name}, assigné au premier auteur.`);
        return allAuthors[0].authorId; 
    }
    return author.authorId;
  };

  // --- 2. GENRES ---
  const genresList = ["Fantasy", "Thriller", "Horror", "Detective", "Adventure", "Sci-Fi", "Romance", "Classic", "Drama", "Philosophy", "Dystopian", "Young Adult"];
  
  await prisma.genre.createMany({
    data: genresList.map(name => ({ name })),
  });

  const allGenres = await prisma.genre.findMany();
  const getGenreId = (name: string) => {
    const genre = allGenres.find(g => g.name === name);
    return genre ? genre.genreId : allGenres[0].genreId;
  };

  // --- 3. UTILISATEUR ---
  const user = await prisma.user.create({
    data: {
      username: "demo_user",
      email: "demo@test.com",
      passwordHash: "fake_hashed_password",
      isActive: true,
      settings: { create: { theme: "light" } }
    },
  });

  // --- 4. LISTE DES 100 LIVRES ---
  const allBooksData = [
    { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", date: "1997-06-26", isbn: "9780747532743", summary: "Harry découvre qu'il est un sorcier.", img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", genres: ["Fantasy", "Adventure"] },
    { title: "Game of Thrones", author: "George R.R. Martin", date: "1996-08-01", isbn: "9780553103540", summary: "L'hiver vient.", img: "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg", genres: ["Fantasy", "Drama"] },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", date: "1954-07-29", isbn: "9780618640157", summary: "Frodon doit détruire l'Anneau Unique.", img: "https://upload.wikimedia.org/wikipedia/en/e/e9/First_Single_Volume_Edition_of_The_Lord_of_the_Rings.gif", genres: ["Fantasy", "Adventure"] },
    { title: "Murder on the Orient Express", author: "Agatha Christie", date: "1934-01-01", isbn: "9780007119318", summary: "Hercule Poirot enquête dans un train.", img: "https://upload.wikimedia.org/wikipedia/en/c/c0/Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg", genres: ["Detective", "Thriller"] },
    { title: "The Shining", author: "Stephen King", date: "1977-01-28", isbn: "9780385121675", summary: "Hôtel hanté et folie.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/The_Shining_%281977%29_front_cover%2C_first_edition.jpg/430px-The_Shining_%281977%29_front_cover%2C_first_edition.jpg", genres: ["Horror", "Thriller"] },
    { title: "1984", author: "George Orwell", date: "1949-06-08", isbn: "9780451524935", summary: "Big Brother vous surveille.", img: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg", genres: ["Sci-Fi", "Dystopian"] },
    { title: "Pride and Prejudice", author: "Jane Austen", date: "1813-01-28", isbn: "9780141439518", summary: "Amour et malentendus en Angleterre.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/360px-PrideAndPrejudiceTitlePage.jpg", genres: ["Classic", "Romance"] },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", date: "1925-04-10", isbn: "9780743273565", summary: "Les années folles et le rêve américain.", img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg", genres: ["Classic", "Drama"] },
    { title: "Moby Dick", author: "Herman Melville", date: "1851-10-18", isbn: "9781503280786", summary: "La chasse à la baleine blanche.", img: "https://upload.wikimedia.org/wikipedia/commons/3/36/Moby-Dick_FE_title_page.jpg", genres: ["Adventure", "Classic"] },
    { title: "War and Peace", author: "Leo Tolstoy", date: "1869-01-01", isbn: "9780199232765", summary: "Fresque historique russe.", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg", genres: ["Classic", "Drama"] },
    { title: "Ulysses", author: "James Joyce", date: "1922-02-02", isbn: "9780679722762", summary: "Une journée à Dublin.", img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg", genres: ["Classic", "Drama"] },
    { title: "To Kill a Mockingbird", author: "Harper Lee", date: "1960-07-11", isbn: "9780061120084", summary: "Injustice raciale dans le sud des USA.", img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg", genres: ["Classic", "Drama"] },
    { title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", date: "1967-05-30", isbn: "9780060883287", summary: "Réalisme magique en Colombie.", img: "https://upload.wikimedia.org/wikipedia/en/a/a0/Cien_a%C3%B1os_de_soledad_%28book_cover%2C_1967%29.jpg", genres: ["Classic", "Fantasy"] },
    { title: "The Da Vinci Code", author: "Dan Brown", date: "2003-03-18", isbn: "9780307474278", summary: "Complot religieux et art.", img: "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg", genres: ["Thriller", "Detective"] },
    
    // ✅ FIX SHERLOCK HOLMES (Updated dead link)
    { title: "Sherlock Holmes: A Study in Scarlet", author: "Arthur Conan Doyle", date: "1887-11-01", isbn: "9780192123190", summary: "La première enquête de Holmes.", img: "https://covers.openlibrary.org/b/isbn/9780192123190-L.jpg", genres: ["Detective", "Classic"] },
    
    { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", date: "1998-07-02", isbn: "9780747538493", summary: "La chambre des secrets.", img: "https://upload.wikimedia.org/wikipedia/en/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg", genres: ["Fantasy", "Adventure"] },
    { title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", date: "1999-07-08", isbn: "9780747542155", summary: "Sirius Black s'évade.", img: "https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg", genres: ["Fantasy", "Adventure"] },
    { title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", date: "2000-07-08", isbn: "9780747546245", summary: "Le tournoi des trois sorciers.", img: "https://upload.wikimedia.org/wikipedia/en/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png", genres: ["Fantasy", "Adventure"] },
    { title: "A Clash of Kings", author: "George R.R. Martin", date: "1998-11-16", isbn: "9780553108033", summary: "Guerre des cinq rois.", img: "https://upload.wikimedia.org/wikipedia/en/3/39/AClashOfKings.jpg", genres: ["Fantasy", "Drama"] },
    { title: "A Storm of Swords", author: "George R.R. Martin", date: "2000-08-08", isbn: "9780553106633", summary: "Batailles et trahisons.", img: "https://upload.wikimedia.org/wikipedia/en/2/24/AStormOfSwords.jpg", genres: ["Fantasy", "Drama"] },

    // --- SCI-FI & DYSTOPIAN ---
    { title: "Dune", author: "Frank Herbert", date: "1965-08-01", isbn: "9780441172719", genres: ["Sci-Fi", "Adventure"], summary: "Paul Atreides doit survivre sur la planète désertique Arrakis." },
    { title: "Foundation", author: "Isaac Asimov", date: "1951-06-01", isbn: "9780553293357", genres: ["Sci-Fi", "Classic"], summary: "Hari Seldon prédit la chute de l'Empire Galactique." },
    { title: "Fahrenheit 451", author: "Ray Bradbury", date: "1953-10-19", isbn: "9781451673319", genres: ["Sci-Fi", "Dystopian"], summary: "Un futur où les livres sont brûlés par les pompiers." },
    { title: "Brave New World", author: "Aldous Huxley", date: "1932-01-01", isbn: "9780060850524", genres: ["Sci-Fi", "Dystopian"], summary: "Une société parfaite conditionnée génétiquement." },
    { title: "The War of the Worlds", author: "H.G. Wells", date: "1898-01-01", isbn: "9780141439976", genres: ["Sci-Fi", "Classic"], summary: "Invasion de la Terre par des Martiens." },
    { title: "I, Robot", author: "Isaac Asimov", date: "1950-12-02", isbn: "9780553294385", genres: ["Sci-Fi", "Classic"], summary: "Les trois lois de la robotique." },
    { title: "The Martian Chronicles", author: "Ray Bradbury", date: "1950-05-04", isbn: "9781451673197", genres: ["Sci-Fi", "Classic"], summary: "La colonisation de Mars par les humains." },
    { title: "20,000 Leagues Under the Sea", author: "Jules Verne", date: "1870-06-20", isbn: "9780553212525", genres: ["Adventure", "Sci-Fi"], summary: "Le capitaine Nemo et son sous-marin, le Nautilus." },
    { title: "Journey to the Center of the Earth", author: "Jules Verne", date: "1864-11-25", isbn: "9780486440889", genres: ["Adventure", "Sci-Fi"], summary: "Une expédition vers le noyau terrestre." },
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", date: "1979-10-12", isbn: "9780345391803", genres: ["Sci-Fi", "Adventure"], summary: "Ne paniquez pas. Guide galactique." },
    { title: "Ender's Game", author: "Orson Scott Card", date: "1985-01-15", isbn: "9780812550702", genres: ["Sci-Fi", "Adventure"], summary: "Un enfant soldat prépare une guerre alien." },
    { title: "Neuromancer", author: "William Gibson", date: "1984-07-01", isbn: "9780441569595", genres: ["Sci-Fi", "Thriller"], summary: "Le livre fondateur du cyberpunk." },

    // --- HORROR & GOTHIC ---
    { title: "Dracula", author: "Bram Stoker", date: "1897-05-26", isbn: "9780141439846", genres: ["Horror", "Classic"], summary: "Le comte Dracula arrive en Angleterre." },
    { title: "Frankenstein", author: "Mary Shelley", date: "1818-01-01", isbn: "9780141439471", genres: ["Horror", "Sci-Fi"], summary: "Victor Frankenstein crée un monstre." },
    { title: "The Picture of Dorian Gray", author: "Oscar Wilde", date: "1890-07-01", isbn: "9780141439570", genres: ["Classic", "Horror"], summary: "Un portrait vieillit à la place de son modèle." },
    { title: "It", author: "Stephen King", date: "1986-09-15", isbn: "9781501142970", genres: ["Horror", "Thriller"], summary: "Un clown maléfique terrorise la ville de Derry." },
    { title: "Misery", author: "Stephen King", date: "1987-06-08", isbn: "9780451203772", genres: ["Horror", "Thriller"], summary: "Un écrivain séquestré par une fan obsessionnelle." },
    { title: "Carrie", author: "Stephen King", date: "1974-04-05", isbn: "9780307743664", genres: ["Horror", "Thriller"], summary: "Une adolescente aux pouvoirs télékinésiques se venge." },
    { title: "Pet Sematary", author: "Stephen King", date: "1983-11-14", isbn: "9781501156700", genres: ["Horror", "Thriller"], summary: "Un cimetière indien ramène les morts à la vie." },
    { title: "Salem's Lot", author: "Stephen King", date: "1975-10-17", isbn: "9780385007511", genres: ["Horror", "Thriller"], summary: "Des vampires envahissent une petite ville." },

    // --- CLASSIC FRENCH LITERATURE ---
    { title: "Les Misérables", author: "Victor Hugo", date: "1862-01-01", isbn: "9780451419439", genres: ["Classic", "Drama"], summary: "La rédemption de Jean Valjean." },
    { title: "Notre-Dame de Paris", author: "Victor Hugo", date: "1831-03-16", isbn: "9780199555802", genres: ["Classic", "Romance"], summary: "Quasimodo et Esmeralda." },
    { title: "The Count of Monte Cristo", author: "Alexandre Dumas", date: "1844-08-28", isbn: "9780140449266", genres: ["Adventure", "Classic"], summary: "La vengeance d'Edmond Dantès." },
    { title: "The Three Musketeers", author: "Alexandre Dumas", date: "1844-03-14", isbn: "9780140440256", genres: ["Adventure", "Classic"], summary: "Un pour tous, tous pour un." },
    { title: "Madame Bovary", author: "Gustave Flaubert", date: "1856-12-01", isbn: "9780140449129", genres: ["Classic", "Drama"], summary: "La vie tragique d'Emma Bovary." },
    { title: "The Stranger", author: "Albert Camus", date: "1942-05-19", isbn: "9780679720201", genres: ["Classic", "Philosophy"], summary: "Aujourd'hui, maman est morte." },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry", date: "1943-04-06", isbn: "9780156012195", genres: ["Classic", "Fantasy"], summary: "L'essentiel est invisible pour les yeux." },
    { title: "Germinal", author: "Émile Zola", date: "1885-03-01", isbn: "9780140447422", genres: ["Classic", "Drama"], summary: "La grève des mineurs dans le Nord." },

    // --- CLASSIC ENGLISH LITERATURE ---
    { title: "Great Expectations", author: "Charles Dickens", date: "1861-08-01", isbn: "9780141439563", genres: ["Classic", "Drama"], summary: "L'ascension sociale de Pip." },
    { title: "Oliver Twist", author: "Charles Dickens", date: "1838-02-01", isbn: "9780141439747", genres: ["Classic", "Drama"], summary: "Un orphelin tente de survivre à Londres." },
    { title: "A Tale of Two Cities", author: "Charles Dickens", date: "1859-11-26", isbn: "9780141439600", genres: ["Classic", "Drama"], summary: "Paris et Londres pendant la Révolution." },
    { title: "Jane Eyre", author: "Charlotte Brontë", date: "1847-10-16", isbn: "9780141441146", genres: ["Classic", "Romance"], summary: "L'histoire d'une gouvernante passionnée." },
    { title: "Wuthering Heights", author: "Emily Brontë", date: "1847-12-01", isbn: "9780141439556", genres: ["Classic", "Romance"], summary: "L'amour destructeur de Heathcliff et Cathy." },
    { title: "Adventures of Huckleberry Finn", author: "Mark Twain", date: "1884-12-10", isbn: "9780142437179", genres: ["Adventure", "Classic"], summary: "Voyage sur le Mississippi." },
    { title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", date: "1865-11-26", isbn: "9780141439761", genres: ["Classic", "Fantasy"], summary: "Alice tombe dans le terrier du lapin blanc." },
    { title: "Peter Pan", author: "J.M. Barrie", date: "1911-10-01", isbn: "9780141329819", genres: ["Classic", "Fantasy"], summary: "L'enfant qui ne voulait pas grandir." },
    
    // --- MODERN CLASSICS ---
    { title: "The Old Man and the Sea", author: "Ernest Hemingway", date: "1952-09-01", isbn: "9780684801223", genres: ["Classic", "Adventure"], summary: "Un vieux pêcheur combat un marlin géant." },
    { title: "Of Mice and Men", author: "John Steinbeck", date: "1937-01-01", isbn: "9780140177398", genres: ["Classic", "Drama"], summary: "Deux amis cherchent du travail pendant la Grande Dépression." },
    { title: "The Grapes of Wrath", author: "John Steinbeck", date: "1939-04-14", isbn: "9780143039433", genres: ["Classic", "Drama"], summary: "La migration d'une famille vers la Californie." },
    { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", date: "1969-03-31", isbn: "9780385333849", genres: ["Sci-Fi", "Classic"], summary: "Billy Pilgrim voyage dans le temps." },
    { title: "The Road", author: "Cormac McCarthy", date: "2006-09-26", isbn: "9780307387899", genres: ["Dystopian", "Drama"], summary: "Un père et son fils dans un monde post-apocalyptique." },
    { title: "The Handmaid's Tale", author: "Margaret Atwood", date: "1985-01-01", isbn: "9780385490818", genres: ["Dystopian", "Sci-Fi"], summary: "Les femmes sont asservies dans la république de Gilead." },
    { title: "The Alchemist", author: "Paulo Coelho", date: "1988-01-01", isbn: "9780062315007", genres: ["Adventure", "Philosophy"], summary: "Santiago cherche son trésor personnel." },
    { title: "Kafka on the Shore", author: "Haruki Murakami", date: "2002-09-12", isbn: "9781400079278", genres: ["Fantasy", "Drama"], summary: "Destins croisés et chats qui parlent." },
    { title: "Norwegian Wood", author: "Haruki Murakami", date: "1987-09-04", isbn: "9780307744661", genres: ["Romance", "Drama"], summary: "Nostalgie et amours de jeunesse." },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", date: "1951-07-16", isbn: "9780316769488", genres: ["Classic", "Drama"], summary: "L'adolescence rebelle de Holden Caulfield." },
    { title: "Lord of the Flies", author: "William Golding", date: "1954-09-17", isbn: "9780399501487", genres: ["Classic", "Dystopian"], summary: "Des enfants naufragés retournent à l'état sauvage." },
    { title: "Life of Pi", author: "Yann Martel", date: "2001-09-11", isbn: "9780156027328", genres: ["Adventure", "Fantasy"], summary: "Un jeune garçon survit en mer avec un tigre." },

    // --- THRILLER & MYSTERY ---
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", date: "2005-08-01", isbn: "9780307949486", genres: ["Thriller", "Detective"], summary: "Lisbeth Salander enquête sur une disparition." },
    { title: "Gone Girl", author: "Gillian Flynn", date: "2012-06-05", isbn: "9780307588371", genres: ["Thriller", "Drama"], summary: "Une femme disparaît le jour de son anniversaire." },
    { title: "The Silence of the Lambs", author: "Thomas Harris", date: "1988-08-29", isbn: "9780312924584", genres: ["Thriller", "Horror"], summary: "Clarice Starling interroge Hannibal Lecter." },
    { title: "Red Dragon", author: "Thomas Harris", date: "1981-10-01", isbn: "9780425220081", genres: ["Thriller", "Horror"], summary: "La première apparition d'Hannibal Lecter." },
    { title: "The Pillars of the Earth", author: "Ken Follett", date: "1989-10-01", isbn: "9780451166890", genres: ["Drama", "Adventure"], summary: "La construction d'une cathédrale au Moyen Âge." },
    { title: "And Then There Were None", author: "Agatha Christie", date: "1939-11-06", isbn: "9780062073488", genres: ["Detective", "Thriller"], summary: "Dix personnes invitées sur une île meurent une par une." },
    { title: "Death on the Nile", author: "Agatha Christie", date: "1937-11-01", isbn: "9780062073556", genres: ["Detective", "Thriller"], summary: "Meurtre lors d'une croisière en Égypte." },
    
    // --- FANTASY MODERNE & YOUNG ADULT ---
    { title: "The Name of the Wind", author: "Patrick Rothfuss", date: "2007-03-27", isbn: "9780756404741", genres: ["Fantasy", "Adventure"], summary: "L'histoire de Kvothe, magicien et musicien." },
    { title: "The Wise Man's Fear", author: "Patrick Rothfuss", date: "2011-03-01", isbn: "9780756407919", genres: ["Fantasy", "Adventure"], summary: "La suite des aventures de Kvothe." },
    { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", date: "2006-07-17", isbn: "9780765311788", genres: ["Fantasy", "Adventure"], summary: "Un monde où la cendre tombe du ciel." },
    { title: "American Gods", author: "Neil Gaiman", date: "2001-06-19", isbn: "9780380973651", genres: ["Fantasy", "Drama"], summary: "Les anciens dieux affrontent les nouveaux." },
    { title: "Coraline", author: "Neil Gaiman", date: "2002-02-24", isbn: "9780380977789", genres: ["Fantasy", "Horror"], summary: "Une porte secrète vers un autre monde." },
    { title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", date: "1950-10-16", isbn: "9780064404990", genres: ["Fantasy", "Adventure"], summary: "Quatre enfants découvrent le monde de Narnia." },
    { title: "The Hunger Games", author: "Suzanne Collins", date: "2008-09-14", isbn: "9780439023481", genres: ["Sci-Fi", "Young Adult"], summary: "Katniss Everdeen doit survivre à un jeu télévisé mortel." },
    { title: "Twilight", author: "Stephenie Meyer", date: "2005-10-05", isbn: "9780316015844", genres: ["Fantasy", "Romance", "Young Adult"], summary: "Bella tombe amoureuse d'un vampire." },
    
    // --- ANCIENT CLASSICS ---
    { title: "The Odyssey", author: "Homer", date: "1614-01-01", isbn: "9780140449112", genres: ["Classic", "Adventure"], summary: "Le long retour d'Ulysse à Ithaque." },
    { title: "The Iliad", author: "Homer", date: "1598-01-01", isbn: "9780140445923", genres: ["Classic", "Adventure"], summary: "La guerre de Troie." },
    { title: "The Aeneid", author: "Virgil", date: "1600-01-01", isbn: "9780140449327", genres: ["Classic", "Adventure"], summary: "La fondation de Rome par Énée." },
    { title: "Metamorphosis", author: "Franz Kafka", date: "1915-01-01", isbn: "9780553213690", genres: ["Classic", "Drama"], summary: "Gregor Samsa se réveille transformé en insecte." },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", date: "1866-01-01", isbn: "9780140449136", genres: ["Classic", "Drama"], summary: "Raskolnikov commet un meurtre pour se prouver sa valeur." },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", date: "1880-11-01", isbn: "9780374528379", genres: ["Classic", "Drama"], summary: "Drame familial et questions existentielles." },
    { title: "Anna Karenina", author: "Leo Tolstoy", date: "1878-01-01", isbn: "9780143035008", genres: ["Classic", "Romance"], summary: "Une liaison tragique dans la haute société russe." },
    { title: "Don Quixote", author: "Miguel de Cervantes", date: "1605-01-16", isbn: "9780060934347", genres: ["Classic", "Adventure"], summary: "Un chevalier errant combat des moulins à vent." },
    { title: "The Divine Comedy", author: "Dante Alighieri", date: "1320-01-01", isbn: "9780140448955", genres: ["Classic", "Philosophy"], summary: "Voyage à travers l'Enfer, le Purgatoire et le Paradis." },
    
    // --- Complément Harry Potter & Co ---
    { title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling", date: "2003-06-21", isbn: "9780747551003", genres: ["Fantasy", "Adventure"], summary: "La rébellion commence." },
    { title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", date: "2005-07-16", isbn: "9780747581086", genres: ["Fantasy", "Adventure"], summary: "Le passé de Voldemort." },
    { title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling", date: "2007-07-21", isbn: "9780545010221", genres: ["Fantasy", "Adventure"], summary: "La fin de la saga." },
    { title: "A Feast for Crows", author: "George R.R. Martin", date: "2005-10-17", isbn: "9780553801507", genres: ["Fantasy", "Drama"], summary: "Le chaos règne à Westeros." },
    { title: "A Dance with Dragons", author: "George R.R. Martin", date: "2011-07-12", isbn: "9780553801477", genres: ["Fantasy", "Drama"], summary: "Daenerys règne à Meereen." },
    { title: "The Hobbit", author: "J.R.R. Tolkien", date: "1937-09-21", isbn: "9780547928227", genres: ["Fantasy", "Adventure"], summary: "Bilbon Sacquet part à l'aventure." },
    { title: "The Silmarillion", author: "J.R.R. Tolkien", date: "1977-09-15", isbn: "9780345325815", genres: ["Fantasy", "Adventure"], summary: "La mythologie de la Terre du Milieu." },
    { title: "Animal Farm", author: "George Orwell", date: "1945-08-17", isbn: "9780451526342", genres: ["Classic", "Dystopian"], summary: "Les animaux prennent le pouvoir." }
  ];

  // 5. BOUCLE DE CRÉATION
  console.log(`📚 Insertion de ${allBooksData.length} vrais livres...`);
  
  const createdBooks: Book[] = [];

  for (const bookInfo of allBooksData) {
    // NOTE: OpenLibrary API Behavior Handling
    // --------------------------------------
    // PROBLEM: By default, when a book cover is missing, OpenLibrary returns a 1x1px transparent pixel
    // with a "200 OK" status instead of a "404 Not Found". This is a "silent failure": 
    // the Next/Image component thinks the image loaded successfully, so the 'onError' event never fires,
    // leaving the user with an invisible image.
    //
    // SOLUTION: Appending '?default=false' explicitly instructs the API to return a strict HTTP 404 error 
    // if the image does not exist. This allows our frontend to correctly detect the failure 
    // and switch to the local fallback image.
    const imageUrl = bookInfo.img || `https://covers.openlibrary.org/b/isbn/${bookInfo.isbn}-L.jpg?default=false`;

    const newBook = await prisma.book.create({
      data: {
        title: bookInfo.title,
        releaseDate: new Date(bookInfo.date),
        isbn: bookInfo.isbn,
        summary: bookInfo.summary,
        imageUrl: imageUrl,
        authorId: getAuthorId(bookInfo.author),
      },
    });
    createdBooks.push(newBook);

    for (const genreName of bookInfo.genres) {
      await prisma.bookGenre.create({
        data: { bookId: newBook.bookId, genreId: getGenreId(genreName) },
      });
    }
  }

  // 6. PEUPLEMENT DE LA BIBLIOTHÈQUE UTILISATEUR
  console.log("👤 Attribution de livres à l'utilisateur...");
  const userBooksIndices = [0, 1, 5, 10, 25, 42, 60, 75, 85, 95];
  const statuses = ["Terminé", "En cours", "A lire"];

  await prisma.userLibrary.createMany({
    data: userBooksIndices.map((index, i) => ({
      userId: user.userId,
      bookId: createdBooks[index].bookId,
      status: statuses[i % 3],
    })),
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