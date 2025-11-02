-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "bus" TEXT,
ADD COLUMN     "licenseNumber" TEXT;

-- AlterTable
ALTER TABLE "tour_leaders" ADD COLUMN     "bus" TEXT;
