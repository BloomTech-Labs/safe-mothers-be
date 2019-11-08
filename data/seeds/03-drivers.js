exports.seed = function(knex) {
  return knex("drivers").insert([
    //please correct the phone numbers of the actual drivers
    {
      name: "Jade Lopez",
      latitude: "0.8254328",
      longitude: "40.4547664",
      phone_number: "+19093794021",
      availability: true,
      reliability: 4,
      online:false
    },
    {
      name: "Johnathan Dorety",
      latitude: "0.8254328",
      longitude: "34.524547664",
      phone_number: "+13366959254",
      availability: false,
      reliability: 4,
      online:true
    },

    {
      name: "Deer Belieff",
      latitude: "1.8254328",
      longitude: "50.4547664",
      phone_number: "+699699695",
      availability: true,
      reliability: 3,
      online:false
    },
    // These are actual drivers
    {
      name: "Nviiri Brian",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone_number: "+256782407942699",
      availability: true,
      reliability: 4,
      online:false
    },

    {
      name: "Mugeere Erifazi",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone_number: "+256774897846699",
      availability: true,
      reliability: 5,
      online:true
    },
    {
      name: "Zijjakyiro Bakali",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone_number: "+256750684130699",
      availability: true,
      reliability: 5,
      online:true
    },

    {
      name: "Dembe Erifazi",
      latitude: "-0.847919",
      longitude: "30.905961",
      phone_number: "+699699679699",
      availability: false,
      reliability: 5,
      online:true
    },

    {
      name: "Kalende Yasin",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone_number: "+256789563155699",
      availability: true,
      reliability: 5,
      online:true
    },
    
    {
      name: "Izimba Jowari",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone_number: "+25678327095699",
      availability: true,
      reliability: 5,
      online:true
    },
    {
      name: "Muduuli Aminsi",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone_number: "+25678965912699",
      availability: true,
      reliability: 5,
      online:true
    },


  ]);
};
