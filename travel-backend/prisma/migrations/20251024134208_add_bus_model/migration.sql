-- CreateTable
CREATE TABLE "buses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plateNumber" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 52,
    "occupancy" INTEGER NOT NULL DEFAULT 0,
    "currentLocation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "driver" TEXT,
    "route" TEXT,
    "fuelLevel" INTEGER DEFAULT 100,
    "lastMaintenance" TIMESTAMP(3),
    "nextMaintenance" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buses_plateNumber_key" ON "buses"("plateNumber");
