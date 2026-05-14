// migrations/20260513190930-update-shipping-stage-payment-status.ts
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Use camelCase paymentStatus as in the database and model
  await queryInterface.changeColumn('ShippingStages', 'paymentStatus', {
    type: DataTypes.ENUM('PENDING', 'PAID', 'NO_PAYMENT_REQUIRED', 'UNPAID', 'INCOMPLETE_PAYMENT', 'REJECTED'),
    allowNull: false,
    defaultValue: 'PENDING',
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn('ShippingStages', 'paymentStatus', {
    type: DataTypes.ENUM('PENDING', 'PAID', 'NO_PAYMENT_REQUIRED', 'UNPAID', 'INCOMPLETE_PAYMENT'),
    allowNull: false,
    defaultValue: 'PENDING',
  });
}