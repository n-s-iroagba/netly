// scripts/check-table-structure.ts
import { sequelize } from '../config/database'; // Adjust path to your database config

export default async function checkTableStructure() {
  try {
    console.log('Checking ShippingStages table structure...');

    // Get all columns in the table
    const [columns] = await sequelize.query(`
      SHOW COLUMNS FROM \`ShippingStages\`
    `);

    console.log('Current columns in ShippingStages:');
    console.table(columns);

    // Check if paymentStatus exists
    const paymentStatusColumn = (columns as any[]).find(col => col.Field === 'paymentStatus');

    if (paymentStatusColumn) {
      console.log('\n✅ paymentStatus column exists:');
      console.log(paymentStatusColumn);
    } else {
      console.log('\n❌ paymentStatus column does NOT exist');

      // Check for similar columns
      const similarColumns = (columns as any[]).filter(col =>
        col.Field.toLowerCase().includes('payment') ||
        col.Field.toLowerCase().includes('status')
      );

      if (similarColumns.length > 0) {
        console.log('\nSimilar columns found:');
        console.table(similarColumns);
      }
    }

  } catch (error) {
    console.error('Failed to check table structure:', error);
    throw error;
  }
}
// Run the check
checkTableStructure()
  .then(() => {
    console.log('\nTable structure check completed');
  })
  .catch((error) => {
    console.error('Check failed:', error);
  });

