-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "author" (
    "author_id" UUID NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "book" (
    "book_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "release_date" DATE,
    "isbn" VARCHAR(13),
    "summary" TEXT,
    "author_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "genre" (
    "genre_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "book_genre" (
    "book_id" UUID NOT NULL,
    "genre_id" UUID NOT NULL,

    CONSTRAINT "book_genre_pkey" PRIMARY KEY ("book_id","genre_id")
);

-- CreateTable
CREATE TABLE "user_library" (
    "user_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'want_to_read',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_library_pkey" PRIMARY KEY ("user_id","book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "book_isbn_key" ON "book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("author_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genre" ADD CONSTRAINT "book_genre_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genre" ADD CONSTRAINT "book_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_library" ADD CONSTRAINT "user_library_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_library" ADD CONSTRAINT "user_library_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;
