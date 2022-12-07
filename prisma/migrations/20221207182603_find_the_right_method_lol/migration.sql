-- DropForeignKey
ALTER TABLE "weathers" DROP CONSTRAINT "weathers_cityId_fkey";

-- AddForeignKey
ALTER TABLE "weathers" ADD CONSTRAINT "weathers_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
