const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Hash the admin password
  const hashedPassword = await bcrypt.hash('admin', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@travel.com' },
    update: {},
    create: {
      email: 'admin@travel.com',
      password: hashedPassword,
      name: 'Admin Travel',
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin);

  // Create buses with simple IDs
  const buses = [
    {
      id: 'A1',
      name: 'Bus Sekolah 1',
      plateNumber: 'B1234ABC',
      capacity: 52,
      occupancy: 0,
      currentLocation: 'Jakarta',
      status: 'available',
      driver: 'Pak Budi',
      tourLeader: 'Bu Sari',
      route: 'Jakarta - Bandung',
      fuelLevel: 100,
    },
    {
      id: 'B1',
      name: 'Bus Sekolah 2',
      plateNumber: 'B5678DEF',
      capacity: 45,
      occupancy: 0,
      currentLocation: 'Bandung',
      status: 'available',
      driver: 'Pak Andi',
      tourLeader: 'Bu Rina',
      route: 'Bandung - Yogyakarta',
      fuelLevel: 85,
    },
    {
      id: 'C1',
      name: 'Bus Sekolah 3',
      plateNumber: 'B9999XYZ',
      capacity: 50,
      occupancy: 0,
      currentLocation: 'Yogyakarta',
      status: 'available',
      driver: 'Pak Joko',
      tourLeader: 'Bu Maya',
      route: 'Yogyakarta - Surabaya',
      fuelLevel: 90,
    },
    {
      id: 'D1',
      name: 'Bus Sekolah 4',
      plateNumber: 'B1111GHI',
      capacity: 48,
      occupancy: 0,
      currentLocation: 'Surabaya',
      status: 'available',
      driver: 'Pak Dedi',
      tourLeader: 'Bu Lina',
      route: 'Surabaya - Malang',
      fuelLevel: 75,
    },
  ];

  for (const busData of buses) {
    const bus = await prisma.bus.upsert({
      where: { id: busData.id },
      update: busData,
      create: busData,
    });
    console.log('Bus created/updated:', bus.id, '-', bus.name);
  }

  console.log('Seed data completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });