exports.up = function (knex) {
  return knex.schema
    .createTable("User", (table) => {
      table.uuid("ID").unique();
      table.string("display_name");
      table.string("last_name");
      table.string("first_name");
      table.string("email").unique().index();
      table.string("slug").unique().notNullable();
      table.boolean("is_admin").defaultTo(false);
    })
    .createTable("Playlist", (table) => {
      table.uuid("ID").unique();
      table.string("name").unique();
      table.string("slug").unique().notNullable();
      table.string("image").defaultTo("default.jpg");
      table.boolean("is_archived").defaultTo(false);
    })
    .createTable("Video", (table) => {
      table.uuid("ID").unique();
      table.string("url").unique().notNullable();
      table.string("title").notNullable().index();
      table.text("description").index();
      table.integer("playlist_order").notNullable();
      table.uuid("playlistID").notNullable();
      table.string("slug").unique().notNullable();
      table
        .foreign("playlistID")
        .references("Playlist.ID")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Question", (table) => {
      table.uuid("ID").unique();
      table.string("title").unique().notNullable();
      table.string("slug").unique().notNullable();
      table
        .enu("difficulty", ["0", "1", "2", "3"])
        .notNullable()
        .defaultTo("0");
      table.text("content").notNullable();
      table.uuid("videoID");
      table
        .foreign("videoID")
        .references("Video.ID")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Test", (table) => {
      table.uuid("ID").unique();
      table.text("input").notNullable();
      table.text("expected_output").notNullable();
      table.uuid("questionID");
      table
        .foreign("questionID")
        .references("Question.ID")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("UserQuestion", (table) => {
      table.uuid("ID").unique();
      table.text("user_input").notNullable();
      table.boolean("solved").defaultTo(false);
      table.uuid("userID");
      table.uuid("questionID");
      table
        .foreign("userID")
        .references("User.ID")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("questionID")
        .references("Question.ID")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("UserQuestion")
    .dropTableIfExists("Test")
    .dropTableIfExists("Question")
    .dropTableIfExists("Video")
    .dropTableIfExists("Playlist")
    .dropTableIfExists("User");
};
