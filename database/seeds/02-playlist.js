const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Playlist")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Playlist").insert([
        {
          ID: "4f9d18f9-204a-40a3-95c8-d163482a2771",
          name: faker.name.firstName(),
          slug: faker.lorem.slug(),
        },
      ]);
    });
};
