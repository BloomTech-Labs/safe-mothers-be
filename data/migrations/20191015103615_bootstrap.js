exports.up = function(knex) {
  return (
    knex.schema
      .createTable("users", users => {
        // primary key
        users.increments();
        //username
        users
          .string("username", 255)

          .notNullable()
          .unique();
        //first name
        users.string("first_name", 255);
        //last name
        users.string("last_name", 255);
        //password
        users.string("password", 255).notNullable();
      })

      //villages
      .createTable("village", village => {
        //pk
        village
          .integer("id")
          .primary()
          .unique();
        //name
        village.string("name", 255);
        //lat
        village.string("lat", 255).notNullable();
        //long
        village.string("long", 255).notNullable();
      })

      //drivers--> village_id may need to be put as obsolete. The drivers that I have plotted (only two) seem to be at crossroads that are not connected to a village
      .createTable("drivers", drivers => {
        //primary key
        drivers.increments();
        //name
        drivers.string("name", 255);
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
          .references("id")
          .inTable("village")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        //availability
        drivers.boolean("availability");
        //reliability
        drivers.integer("reliability");
        //online ---> driver is clocked in for a shift
        drivers.boolean("online").defaultTo(false);
      })

      //mothers
      .createTable("mothers", mothers => {
        // primary key
        mothers.increments();
        mothers.string("survey_day");
        //**identification
        mothers.integer("interviewer");
        mothers.string("interviewer_other");
        //introduction
        mothers.integer("current_pg");
        mothers.integer("due_now");
        mothers.integer("deliver_elsewhere");
        mothers.integer("hx_cesarean");
        mothers.integer("hx_complication");
        mothers.integer("current_multip");
        //registration
        mothers.string("name");
        //data type Date-time?
        mothers.string("edd");
        mothers.integer("age");
        //FK---> cannot make the name village_id. Will not match data sent from odk
        mothers
          .integer("village")
          .unsigned()
          // .notNullable()
          .references("id")
          .inTable("village")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        //Does this need to be changed to home_village_other. In excel it is: village_other
        mothers.string("village_other");
        mothers.integer("own_phone");
        mothers.string("other_phone");
        mothers.string("phone_number");
        mothers.integer("carrier");
        mothers.integer("owner_phone");
        mothers.string("owner_phone_other");
        mothers.string("carrier_other");
        mothers.integer("want_education");
        //complications
        mothers.string("complications_note");
        mothers.integer("anemia");
        mothers.integer("malaria");
        mothers.integer("obstructed_labor");
        mothers.integer("malpresent");
        mothers.integer("aph");
        mothers.integer("pph");
        mothers.integer("ret_placenta");
        mothers.integer("placenta_previa");
        mothers.integer("hx_stillbirth");
        mothers.integer("no_stillbirths");
        mothers.integer("other_complication");
        mothers.string("complication_specify");
        //Birth_Preparedness
        mothers.string("BP_note");
        mothers.integer("no_anc");
        mothers.integer("deliver_place");
        mothers.string("deliver_place_other");
        mothers.string("deliver_specific");
        mothers.integer("plan_transport");
        mothers.string("plan_transport_other");
        mothers.integer("purchase_supplies");
        mothers.integer("name_supplies");
        mothers.string("supplies_other");
        mothers.integer("mama_kit");
        mothers.integer("mackintosh");
        mothers.integer("razor");
        mothers.integer("pad");
        mothers.integer("cotton");
        mothers.integer("soap");
        mothers.integer("gloves");
        mothers.integer("medication");
        mothers.integer("baby_clothes");
        mothers.integer("blanket");
        mothers.integer("sheets");
        mothers.integer("other_supply");
        mothers.integer("saving_money");
        mothers.integer("amt_saved");
        mothers.integer("amt_saved_range");
        //Pregnancy_History
        mothers.string("PH_note");
        mothers.integer("no_pg");
        mothers.integer("no_birth");
        mothers.integer("no_children");
        mothers.integer("no_under5");
        mothers.integer("hx_childdeath");
        mothers.integer("no_childdeath");
        //Demographics
        mothers.integer("attend_school");
        mothers.integer("education");
        mothers.integer("money_control");
        mothers.integer("total_house");
        mothers.integer("marital_status");
        mothers.string("marital_status_other");
        mothers.integer("spouse_school");
        mothers.integer("spouse_education");
        mothers.integer("polygamy");
        mothers.integer("no_wives");
        mothers.string("no_wives_other");
        mothers.integer("wife_order");
        mothers.string("wife_order_other");
        mothers.integer("insurance");
        mothers.integer("insurance_type");
        mothers.string("insurance_type_other");
        mothers.integer("insurance_CBO");
        mothers.integer("insurance_private");
        mothers.integer("insurance_other");
        mothers.integer("sell_asset");
        //**Conclusions
        mothers.string("notes");
      })

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

      //scores (Many to many relationship)
      .createTable("scores", scores => {
        // primary id
        scores.increments();
        scores.integer("rating");
        scores
          .integer("driver_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("drivers")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        scores
          .integer("mother_id")
          .references("id")
          .inTable("mothers")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("scores")
    .dropTableIfExists("rides")
    .dropTableIfExists("mothers")
    .dropTableIfExists("drivers")
    .dropTableIfExists("village")
    .dropTableIfExists("users");
};
