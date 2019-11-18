exports.up = function (knex) {
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

      //villages --> provided by stake holder. DO NOT CHANGE or ERASE the Village seed data!!
      .createTable("village", village => {
        //pk
        village
          .integer("id")
          .primary()
          .unique();
        //name
        village.string("name", 255);

        //latitude
        village.string("latitude", 255).notNullable();
        //longitude
        village.string("longitude", 255).notNullable();
      })

      //drivers --> based off of odk survey form
      .createTable("drivers", drivers => {
        //primary key
        drivers.increments();
        //name
        drivers.string("driver_name", 255);
        //phone_number
        drivers.string("phone", 255);
        //carrier
        drivers.integer("carrier");
        //another phone question
        drivers.integer("another_phone");
        //second phone number
        drivers.string("phone_2", 255);
        //second carrier
        drivers.integer("carrier_2");
        //latitude
        drivers.string("latitude", 255).notNullable();
        //longitude
        drivers.string("longitude", 255).notNullable();
        //district
        drivers.integer("district");
        //district-other input field
        drivers.string("district_other", 255);
        //subcounty
        drivers.integer("subcounty");
        //subcounty-other input field
        drivers.string("subcounty_other", 255);
        //stage(Parish)
        drivers.integer("stage");
        //(stage)parish-other input field
        drivers.string("parish_other", 255);
        //availability
        drivers.boolean("availability");
        //reliability
        drivers.integer("reliability");
        //online ---> driver is clocked in for a shift
        drivers.boolean("online").defaultTo(false);
        //timestamp
        drivers.timestamps(true, true)
        //own a motorcycle?
        drivers.integer("own_boda");
        //keep boda-boda with you how many nights?
        drivers.integer("boda_night");
        //# of transfers mothers to health facility
        drivers.integer("transfers");
        //Story of transfer of pregnant mother
        drivers.string("story");
        //motivation
        drivers.string("motivation");
        //background - question 8
        drivers.string("background");
        //married
        drivers.integer("married");
        //children
        drivers.integer("children");
        //how many children
        drivers.integer("number_kids");
        //Children info
        drivers.string("kid_info");
        //future dream
        drivers.string("dream");
        //Picture - how do we handle this. In the form you can take a picture 
        drivers.string("picture");
        
      })

      //mothers-->based off of odk survey form
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
        mothers.string("edd");
        mothers.integer("age");
        //FK
        mothers
          .integer("village")
          .unsigned()
          // .notNullable()
          .references("id")
          .inTable("village")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        mothers.string("village_other");//
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
        mothers.string("name_supplies");
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
        mothers.string("insurance_type");
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
        //intiated ----> when ride is created (mother request for help)
        rides.datetime("initiated");
        //assigned -----> Assigned to driver to mother
        rides.boolean("assigned").defaultTo(false);
        //pending ----> Failed rides logic
        rides.boolean("pending").defaultTo(false);
        //completed -----> Boda ride was completed (transportation of the mother)
        rides.boolean("completed").defaultTo(false);
        //ended -----> when the ride is completed record the date and time 
        rides.datetime("ended");
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

      //Labels for the front end mothers table
      .createTable("labels", labels => {
        labels.increments();
        labels.string("label_name", 15);
        labels.string("color", 15);
        labels.string("dark_color", 15);
        labels.string("text_color", 15);
        labels

          .integer("mother_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("mothers")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })

  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("labels")
    .dropTableIfExists("scores")
    .dropTableIfExists("rides")
    .dropTableIfExists("mothers")
    .dropTableIfExists("drivers")
    .dropTableIfExists("village")
    .dropTableIfExists("users");
};
