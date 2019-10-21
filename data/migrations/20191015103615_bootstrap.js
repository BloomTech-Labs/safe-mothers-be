
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
    .createTable("home_village", villages => {
        //pk
        home_village.increments();
        //name
        home_village.string("name", 255);
        //lat 
        home_village.string("lat", 255).notNullable();
        //long
        home_village.string("long", 255).notNullable();

    })

    //drivers--> village_id may need to be put as obsolete. The drivers that I have plotted (only two) seem to be at crossroads that are not connected to a village
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
            .integer("home_village_id")
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('home_village')
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
        //**identification
        //introduction
        mothers.integer("current_pg");
        mothers.integer("due_now");
        mothers.integer("deliver_elsewhere");
        mothers.integer("hx_cesarean");
        mothers.integer("hx_complication");
        mothers.integer("current_multip");
        //registration
        mothers.string("name");
        mothers.string("edd");
        mothers.integer("age");
        mothers.integer("home_village_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('home_village')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        mothers.integer("own_phone");
        mothers.string("other_phone");
        

        //complications
        //Birth_Preparedness
        //Pregnancy_History
        //Demographics
        //**Conclusions


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
