
exports.seed = function(knex) {
  return knex('villages').insert([
    {
      name: "Bugambo",
      lat: "0.8970166000000022",
      long:"33.39893489999997"
    },
    {
      name: "Buganza",
      lat: "0.8453280000000231",
      long:"33.433343899999954"
    },
    {
      name: "Bugole A",
      lat: "0.8683849999999976",
      long:"33.382454999999936"
    },
    {
      name: "Bugole B",
      lat: "0.8527656000000022",
      long:"33.373872000000006"
    },
    {
      name: "Bugongo A",
      lat: "0.8630280000000112",
      long:"33.39781700000003"
    },
    {
      name: "Bugongo A",
      lat: "0.8630280000000112",
      long:"33.39781700000003"
    },
    
  ])
    
};
