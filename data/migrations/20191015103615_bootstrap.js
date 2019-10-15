
exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
        // primary key
        users.increments();
        //username
        users
        .string("username", 255)
        .notNullable()
        .unique();
        //firstname
        users.string("first_name", 255);
        //lastname
        users.string("last_name", 255);
         //password
        users.string("password", 255).notNullable();
    })
    
    //villages
    .createTable("villages", villages => {
        //pk
        villages.increments();
        //name
        villages.string("name", 255);
        //lat 
        villages.string("lat", 255).notNullable();
        //long
        villages.string("long", 255).notNullable();

    })

    //drivers
    .createTable("drivers", drivers => {
        //primary key
        drivers.increments();
        //first_name 
        drivers.string("first_name", 255);
        //last_name 
        drivers.string("last_name", 255);
        //lat 
        drivers.string("lat", 255).notNullable();
        //long
        drivers.string("long", 255).notNullable();
        //phone_number
        drivers.string("phone_number", 255);
        //village -->FK
        drivers
            .integer("village_id")
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('villages')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        //availability
        drivers.boolean("availability"); 
        //reliability
        drivers.integer("reliability"); 
    })

    //mothers
    .createTable("mothers", mothers => {
        // primary key
        mothers.increments();
        // firstname
        mothers.string("first_name", 255);
        // lastname
        mothers.string("last_name", 255);
        // age
        mothers.integer("age");
        // phone number
        mothers.string("phone_number", 255);
        // emergency contact
        mothers.string("emergency_contact", 255);
        // village
        mothers
        .integer("village_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('villages')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        // health center
        mothers.string("health_center", 255);
        // lat
        mothers.string("lat", 255);
        // long
        mothers.string("long", 255);


    })
    //scores (Many to many relationship)
    .createTable("scores", scores => {
        // primary id
        scores.increments();
        scores.integer("rating");
        scores
            .integer("driver_id")
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('drivers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        scores
            .integer("mother_id")
            .references("id")
            .inTable("mothers")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
    })

    //rides
    .createTable("rides", rides => {
        //PK
        rides.increments();
        //mothers --> FK
        rides
        .integer("mother_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mothers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        //drivers --> FK
        rides
        .integer("driver_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('drivers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        //intiated
        rides.datetime("initiated")
        //ended
        rides.datetime("ended")
        //completed
        rides.binary("completed")
    })
    
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("rides")
    .dropTableIfExists("scores")
    .dropTableIfExists("mothers")
    .dropTableIfExists("drivers")
    .dropTableIfExists("villages")
    .dropTableIfExists("users")
};
