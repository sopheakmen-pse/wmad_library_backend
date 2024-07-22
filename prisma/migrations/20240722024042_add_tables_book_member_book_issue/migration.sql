-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publication_year" INTEGER NOT NULL,
    "edition" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "number_of_pages" INTEGER NOT NULL,
    "cover_image_url" TEXT,
    "shelf_location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "member_code" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_issue" (
    "id" SERIAL NOT NULL,
    "transaction_code" TEXT NOT NULL,
    "member_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "processed_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_isbn_key" ON "book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "member_member_code_key" ON "member"("member_code");

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "book_issue_transaction_code_key" ON "book_issue"("transaction_code");

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_processed_by_id_fkey" FOREIGN KEY ("processed_by_id") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
