module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/swytch'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
};