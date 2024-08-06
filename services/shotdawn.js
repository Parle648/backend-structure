const knex = require("knex");
const knexfile = require("../knexfile");
const dbClient = knex(knexfile.development)

const gracefulShutdown = async () => {
  console.log('Received shutdown signal, shutting down gracefully...');
  server.close(async (err) => {
      if (err) {
          console.error('Error closing server:', err);
          process.exit(1);
      }

      console.log('Server closed.');

      try {
          await dbClient.end();
          console.log('Database connection closed.');
      } catch (dbErr) {
          console.error('Error closing database connection:', dbErr);
      }

      process.exit(0);
  });

  setTimeout(() => {
      console.error('Forcing shutdown due to timeout.');
      process.exit(1);
  }, 10000);
};

module.exports = gracefulShutdown;