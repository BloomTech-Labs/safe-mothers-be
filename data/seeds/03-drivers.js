exports.seed = function(knex) {
  return knex("drivers").insert([
    
    //These are Safe Mothers actual drivers. Please do not erase!!!!!
    //***WARNING***: For Lambda Labs Teams testing the SMS system, please change and save the below phone numbers. These are actual working phone numbers in Uganda.
    {
      driver_name: "Nviiri Brian",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone: "+256782407942",
      availability: true,
      reliability: 4,
      online:false
    },
    {
      driver_name: "Kalende Yasin",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+256789563155",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Izimba Jowari",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+25678327095",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Muduuli Aminsi",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+25678965912",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Zijjakyiro Bakali",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+256783269299",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Zijjakyiro Bakali",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+256750684130",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Mugeere Erifazi",
      latitude: "0.8607573",
      longitude: "33.4388595",
      phone: "+256777634545",
      availability: true,
      reliability: 5,
      online:false
    },
    {
      driver_name: "Dembe Erifazi",
      latitude: "0.7954328",
      longitude: "33.4547664",
      phone: "+699699679699",
      availability: true,
      reliability: 5,
      online:false
    },

  ]);
};
