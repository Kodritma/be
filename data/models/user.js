const db = require("../dbConfig.js");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  findById,
  findByEmail,
  findBySlug,
  add,
  update,
  remove,
};

function findById(ID) {
  return db("User").where({ ID }).first();
}

function findByEmail(email) {
  return db("User").where({ email }).first();
}

function findBySlug(slug) {
  return db("User").where({ slug }).first();
}

function add(user) {
  user.ID = uuidv4();
  user.slug = user.ID;

  return db("User")
    .insert(user, "ID")
    .then(([ID]) => {
      return db("User").where({ ID }).first();
    });
}

function update(user, ID) {
  return db("User")
    .update(user)
    .where({ ID })
    .then((updated) => {
      if (updated === 1) return db("User").where({ ID }).first();
      else throw new Error();
    });
}

function remove(ID) {
  return db("User").del().where({ ID });
}
