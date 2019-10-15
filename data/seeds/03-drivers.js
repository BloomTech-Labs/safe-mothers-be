
exports.seed = function(knex) {
  return knex("drivers").insert([
    {
      first_name: "Nviiri",
      last_name: "Brian",
      lat: "0.7954328",
      long:"33.4547664",
      phone_number: "+256782407942",
      village_id: 1,
      availability: true,
      reliability: 4
    },

    {
      first_name: "Mugeere",
      last_name: "Erifazi",
      lat: "0.7954328",
      long:"33.4547664",
      phone_number: "+256777634545",
      village_id: 2,
      availability: true,
      reliability: 5
    },

    {
      first_name: "Dembe",
      last_name: "Erifazi",
      lat: "-0.847919",
      long:"30.905961",
      phone_number: "+256777634545",
      village_id: 1,
      availability: false,
      reliability: 5
    },
    
  ])
    
};
