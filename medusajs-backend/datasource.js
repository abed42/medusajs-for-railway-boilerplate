const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "zjnFghnGzFGMTHcdbBNubNgqXoHHDfVz",
  database: "railway",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})


// module.exports = {
//   datasource: AppDataSource,
//   type: "postgres",
//   host: "roundhouse.proxy.rlwy.net",
//   port: "55558",
//   username: "postgres",
//   password: "zjnFghnGzFGMTHcdbBNubNgqXoHHDfVz",
//   database: "railway",
//   synchronize: false,
//   logging: true,
//   entities: ["src/entity/**/*.ts"],
//   migrations: ["src/migration/**/*.ts"],
//   cli: {
//     "entitiesDir": "src/entity",
//     "migrationsDir": "src/migration"
//   }
// };
// Example TypeORM configuration using a connection URL
module.exports = {
  datasource: AppDataSource,
  type: "postgres",
  url: "postgresql://postgres:zjnFghnGzFGMTHcdbBNubNgqXoHHDfVz@roundhouse.proxy.rlwy.net:55558/railway",
  synchronize: true,
  logging: true,
};
