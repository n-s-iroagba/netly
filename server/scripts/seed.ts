import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { Shipment } from '../models/Shipment';

export default async function seedDatabase() {
  try {
    console.log('Running database seed...');

    // 1. Seed Admin
    const adminEmail = 'admin@netlylogistics.com';
    let admin = await Admin.findOne({ where: { email: adminEmail } });

    if (!admin) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      admin = await Admin.create({
        username: 'Netly System Admin',
        email: adminEmail,
        password: hashedPassword,
        isEmailVerified: true,
      });
      console.log('✅ Default verified admin created (admin@netlylogistics.com).');
    } else {
      console.log('ℹ️ Default admin already exists, skipping seed.');
    }

    // 2. Seed Shipment
    const sampleShipmentID = 'TRK-NETLY-001';
    let shipment = await Shipment.findOne({ where: { shipmentID: sampleShipmentID } });

    if (!shipment) {
      shipment = await Shipment.create({
        shipmentID: sampleShipmentID,
        senderName: 'Netly Concierge',
        recipientName: 'Distinguished Client',
        shipmentDescription: 'Confidential Secure Transport Asset',
        origin: 'Geneva, Switzerland',
        destination: 'London, United Kingdom',
        pickupPoint: 'Netly Secure Vault GVA',
        dimensionInInches: '20x15x10',
        expectedTimeOfArrival: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        receipientEmail: 'client@netlylogistics.com',
        weight: 15.5,
        freightType: 'AIR',
        status: 'RECEIVED (WAREHOUSE)',
        adminId: admin.id,
      } as any);
      console.log(`✅ Default sample shipment created (${sampleShipmentID}).`);
    } else {
      console.log('ℹ️ Sample shipment already exists, skipping seed.');
    }

    // 3. Seed Second Shipment for specific user
    const secondShipmentID = 'TRK-NETLY-002';
    let secondShipment = await Shipment.findOne({ where: { shipmentID: secondShipmentID } });

    if (!secondShipment) {
      await Shipment.create({
        shipmentID: secondShipmentID,
        senderName: 'Netly logistics Logistics',
        recipientName: 'Nnamdi Solomon',
        shipmentDescription: 'Priority Executive Consignment',
        origin: 'Dubai, UAE',
        destination: 'Lagos, Nigeria',
        pickupPoint: 'Netly Private Terminal DXB',
        dimensionInInches: '12x12x12',
        expectedTimeOfArrival: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        receipientEmail: 'nnamdisolomon1@gmail.com',
        weight: 5.0,
        freightType: 'AIR',
        status: 'IN TRANSIT',
        adminId: admin.id,
      } as any);
      console.log(`✅ Second sample shipment created (${secondShipmentID}) for nnamdisolomon1@gmail.com.`);
    } else {
      console.log('ℹ️ Second sample shipment already exists, skipping seed.');
    }

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}
