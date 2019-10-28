exports.up = function(knex) {
  return (
    knex.schema
      //rides
      .createTable("rides", rides => {
        //PK
        rides.increments();
        //mothers
        rides
          .integer("mother_id")
          .unsigned()
          .references("id")
          .inTable("mothers")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        //drivers
        rides
          .integer("driver_id")
          .unsigned()
          .references("id")
          .inTable("drivers")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        //intiated
        rides.datetime("initiated");
        //ended
        rides.datetime("ended");
        //completed
        rides.boolean("completed").defaultTo(false);
        //assigned
        rides.boolean("assigned").defaultTo(false);
      })
  );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("rides");
};
