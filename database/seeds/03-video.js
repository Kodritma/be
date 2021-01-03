const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Video")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Video").insert([
        {
          ID: "bdb6e7e6-0463-4d0c-beb4-68bfdf56055b",
          url: faker.image.imageUrl(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(),
          playlistID: "4f9d18f9-204a-40a3-95c8-d163482a2771",
          playlist_order: faker.random.number(),
        },
      ]);
    });
};
