const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Test")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Test").insert([
        {
          ID: "7b5f7e71-cc1b-409e-8687-64ebfd12643e",
          questionID: "ce43c69e-e31e-406d-bcc1-176e162c00bc",
          input: faker.lorem.sentence(),
          expected_output: faker.lorem.sentence(),
        },
      ]);
    });
};
