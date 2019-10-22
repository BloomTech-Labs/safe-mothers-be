exports.seed = function(knex) {
  return knex("drivers").insert([
    {
      name: "Nviiri Brian",
      lat: "0.7954328",
      long: "33.4547664",
      phone_number: "256782407942",
      village_id: 1,
      availability: true,
      reliability: 4
    },
    {
      name: "Brian Chong",
      lat: "0.8254328",
      long: "40.4547664",
      phone_number: "699699699",
      village_id: 1,
      availability: true,
      reliability: 4
    },

    {
      name: "Mugeere Erifazi",
      lat: "0.7954328",
      long: "33.4547664",
      phone_number: "256777634545",
      village_id: 2,
      availability: true,
      reliability: 5
    },

    {
      name: "Dembe Erifazi",
      lat: "-0.847919",
      long: "30.905961",
      phone_number: "+256777634545",
      village_id: 1,
      availability: false,
      reliability: 5
    }
  ]);
};
