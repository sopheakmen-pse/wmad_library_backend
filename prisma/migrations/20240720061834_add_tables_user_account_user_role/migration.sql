-- CreateTable
CREATE TABLE "user_account" (
    "id" SERIAL NOT NULL,
    "user_role_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_activated" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "user_role_name" TEXT NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_username_key" ON "user_account"("username");

-- AddForeignKey
ALTER TABLE "user_account" ADD CONSTRAINT "user_account_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
