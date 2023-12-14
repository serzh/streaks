import postgres from 'postgres';

const sql = postgres({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'password',
    database: 'streaks'
});

(async () => {
    await sql.file('schema.sql');

    process.exit(0);
})()