/*
  Warnings:

  - A unique constraint covering the columns `[title,user_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "posts_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_user_id_key" ON "posts"("title", "user_id");
