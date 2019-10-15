//Need to add this when bcrypt is installed. Allows us to use the hashed password in the seed table bellow
// const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {
      username:"admin",
      password: "password",
      //uncomment below line when bcrypt is setup
      //password: bcrypt.hashSync("password"),
      first_name: "admin",
      last_name: "admin"
    },
  ])
    
};
