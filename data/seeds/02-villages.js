
exports.seed = function(knex) {
  return knex('villages').insert([
    {
      name: "Kiwanyi",
      lat: "0.802500",
      long:"33.433889"
    },
    {
      name: "Buganza",
      lat: "-0.857099",
      long:"30.917860"
    },
    {
      name: "Ikumbya",
      lat: "0.974722",
      long:"33.316944"
    },
    {
      name: "Namusiisi",
      lat: "0.853462",
      long:"33.427212"
    },
    {
      name: "Bugono",
      lat: "0.816431",
      long:"33.453356"
    }
    
  ])
    
};
