const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("UserQuestion")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("UserQuestion").insert([
        {
          ID: "6ac31b5f-efc0-4a33-973c-14e3d0ea8f87",
          questionID: "ce43c69e-e31e-406d-bcc1-176e162c00bc",
          userID: "27683018-dc6c-489c-8410-125eb2fa67a5",
          user_input: faker.lorem.sentence(),
          solved: faker.random.boolean(),
        },
      ]);
    });
};
