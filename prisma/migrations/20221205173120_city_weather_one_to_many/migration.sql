/*
  Warnings:

  - You are about to drop the `_CityToWeather` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cityId` to the `weathers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CityToWeather" DROP CONSTRAINT "_CityToWeather_A_fkey";

-- DropForeignKey
ALTER TABLE "_CityToWeather" DROP CONSTRAINT "_CityToWeather_B_fkey";

-- AlterTable
ALTER TABLE "weathers" ADD COLUMN     "cityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CityToWeather";

-- AddForeignKey
ALTER TABLE "weathers" ADD CONSTRAINT "weathers_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
