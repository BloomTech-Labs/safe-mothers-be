exports.seed = function(knex) {
  return knex("drivers").insert([
    {
      name: "Nviiri Brian",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone_number: "699123456",
      village_id: 29,
      availability: true,
      reliability: 4,
      online:false
    },
    {
      name: "Brian Chong",
      latitude: "0.8254328",
      longitude: "40.4547664",
      phone_number: "19093794021",
      village_id: 1,
      availability: true,
      reliability: 4,
      online:false
    },
    {
      name: "Cheetos Cheetah",
      latitude: "0.8254328",
      longitude: "40.4547664",
      phone_number: "699699681",
      village_id: 1,
      availability: false,
      reliability: 4,
      online:true
    },

    {
      name: "Deer Belieff",
      latitude: "1.8254328",
      longitude: "50.4547664",
      phone_number: "699699695",
      village_id: 1,
      availability: true,
      reliability: 3,
      online:false
    },

    {
      name: "Mugeere Erifazi",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone_number: "699699697",
      village_id: 2,
      availability: true,
      reliability: 5,
      online:true
    },

    {
      name: "Dembe Erifazi",
      latitude: "-0.847919",
      longitude: "30.905961",
      phone_number: "699699679",
      village_id: 1,
      availability: false,
      reliability: 5,
      online:true
    }
  ]);
};
