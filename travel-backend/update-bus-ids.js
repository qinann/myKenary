const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateBusIds() {
  try {
    console.log('🚌 Starting bus ID migration...');
    
    // Get all buses ordered by creation date
    const buses = await prisma.bus.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log(`Found ${buses.length} buses to update`);

    // Define new simple IDs
    const newIds = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'];

    // Update each bus with new ID
    for (let i = 0; i < buses.length; i++) {
      const bus = buses[i];
      const newId = newIds[i] || `BUS${i + 1}`;
      
      console.log(`Updating bus: ${bus.name} (${bus.id}) -> ${newId}`);
      
      // First, update any references in other tables if they exist
      // Update students assigned to this bus
      await prisma.student.updateMany({
        where: { assignedBus: bus.id },
        data: { assignedBus: newId }
      });

      // Update tour leaders assigned to this bus
      await prisma.tourLeader.updateMany({
        where: { bus: bus.id },
        data: { bus: newId }
      });

      // Update drivers assigned to this bus
      await prisma.driver.updateMany({
        where: { bus: bus.id },
        data: { bus: newId }
      });

      // Delete the old bus record
      await prisma.bus.delete({
        where: { id: bus.id }
      });

      // Create new bus record with simple ID
      await prisma.bus.create({
        data: {
          id: newId,
          name: bus.name,
          plateNumber: bus.plateNumber,
          capacity: bus.capacity,
          occupancy: bus.occupancy,
          currentLocation: bus.currentLocation,
          status: bus.status,
          driver: bus.driver,
          tourLeader: bus.tourLeader,
          route: bus.route,
          fuelLevel: bus.fuelLevel,
          lastMaintenance: bus.lastMaintenance,
          nextMaintenance: bus.nextMaintenance,
          createdAt: bus.createdAt,
          updatedAt: new Date()
        }
      });

      console.log(`✅ Successfully updated ${bus.name} to ID: ${newId}`);
    }

    console.log('🎉 Bus ID migration completed successfully!');
    
    // Display updated buses
    const updatedBuses = await prisma.bus.findMany({
      orderBy: { id: 'asc' }
    });
    
    console.log('\n📋 Updated bus list:');
    updatedBuses.forEach(bus => {
      console.log(`  ${bus.id}: ${bus.name} (${bus.plateNumber})`);
    });

  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
updateBusIds()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });