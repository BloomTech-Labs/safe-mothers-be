exports.seed = function(knex) {
  return knex("drivers").insert([
    //please correct the phone numbers of the actual drivers
    {
      driver_name: "Jade Lopez",
      latitude: "0.8683849999999976",
      longitude: "33.382454999999936",
      phone: "+19093794021",
      availability: true,
      reliability: 4,
      online:false
    },
    {
      driver_name: "Johnathan Dorety",
      latitude: "0.8254328",
      longitude: "34.524547664",
      phone: "+13366959254",
      availability: false,
      reliability: 4,
      online:true
    },

    {
      driver_name: "Deer Belieff",
      latitude: "1.8254328",
      longitude: "50.4547664",
      phone: "+699699695",
      availability: true,
      reliability: 3,
      online:true
    },
    // These are actual drivers
    {
      driver_name: "Nviiri Brian",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone: "+256782407942699",
      availability: true,
      reliability: 4,
      online:false
    },

    {
      driver_name: "Mugeere Erifazi",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+256774897846699",
      availability: true,
      reliability: 5,
      online:true
    },
    {
      driver_name: "Zijjakyiro Bakali",
      latitude: "0.8407573",
      longitude: "32.4388595",
      phone: "+256750684130699",
      availability: true,
      reliability: 5,
      online:true
    },

    {
      driver_name: "Dembe Erifazi",
      latitude: "-0.847919",
      longitude: "30.905961",
      phone: "+699699679699",
      availability: false,
      reliability: 5,
      online:true
    },

    {
      driver_name: "Kalende Yasin",
      latitude: "0.8307573",
      longitude: "32.4388595",
      phone: "+256789563155699",
      availability: true,
      reliability: 5,
      online:true
    },
    
    {
      driver_name: "Izimba Jowari",
      latitude: "-1.847919",
      longitude: "30.905961",
      phone: "+25678327095699",
      availability: true,
      reliability: 5,
      online:true
    },
    {
      driver_name: "Muduuli Aminsi",
      latitude: "0.9607573",
      longitude: "35.4388595",
      phone: "+25678965912699",
      availability: true,
      reliability: 5,
      online:true
    },


  ]);
};
