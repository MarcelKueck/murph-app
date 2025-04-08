-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
