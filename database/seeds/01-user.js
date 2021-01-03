const faker = require("faker");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("User")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("User").insert([
        {
          ID: "27683018-dc6c-489c-8410-125eb2fa67a5",
          display_name: faker.internet.userName(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          slug: faker.lorem.slug(),
        },
      ]);
    });
};
