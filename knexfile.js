module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "kodritma",
      user: "admin",
      password: "admin",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
