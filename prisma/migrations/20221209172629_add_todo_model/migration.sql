-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "todoId" INTEGER;

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
