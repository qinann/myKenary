const { Client } = require('pg');

async function verifyAdmin() {
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

    // Query admin user
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(query, ['admin@travel']);

    if (result.rows.length > 0) {
      console.log('✅ Admin user found in database:');
      console.log('ID:', result.rows[0].id);
      console.log('Email:', result.rows[0].email);
      console.log('Name:', result.rows[0].name);
      console.log('Role:', result.rows[0].role);
      console.log('Created At:', result.rows[0].createdAt);
      console.log('Updated At:', result.rows[0].updatedAt);
      console.log('Password Hash:', result.rows[0].password.substring(0, 20) + '...');
    } else {
      console.log('❌ Admin user not found in database');
    }

    // Query all users
    const allUsersQuery = 'SELECT id, email, name, role FROM users';
    const allUsersResult = await client.query(allUsersQuery);
    
    console.log('\n📊 Total users in database:', allUsersResult.rows.length);
    console.log('All users:');
    allUsersResult.rows.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}, Role: ${user.role}`);
    });

  } catch (error) {
    console.error('Error verifying admin user:', error);
  } finally {
    await client.end();
  }
}

verifyAdmin();