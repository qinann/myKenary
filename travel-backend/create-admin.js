const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function createAdmin() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'mykenary',
    user: 'postgres',
    password: '12345678',
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Insert admin user
    const query = `
      INSERT INTO users (email, password, name, role, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET
        password = EXCLUDED.password,
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        "updatedAt" = NOW()
      RETURNING *;
    `;

    const values = ['admin@travel.com', hashedPassword, 'Admin Travel', 'admin'];
    const result = await client.query(query, values);

    console.log('Admin user created/updated successfully:');
    console.log(result.rows[0]);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.end();
  }
}

createAdmin();