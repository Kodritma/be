const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Question")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Question").insert([
        {
          ID: "ce43c69e-e31e-406d-bcc1-176e162c00bc",
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          videoID: "bdb6e7e6-0463-4d0c-beb4-68bfdf56055b",
        },
        {
          ID: "53768009-49f7-4ad4-9ee4-2c2dbd501c05",
          title: faker.lorem.sentence(),
          difficulty: "1",
          content: faker.lorem.paragraphs(),
        },
      ]);
    });
};
