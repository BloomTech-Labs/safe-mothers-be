
exports.seed = function(knex) {
  return knex("mothers").insert([
    {
      first_name: "Namukose",
      last_name: "Proscovia",
      age: 25,
      phone_number: "+256771817358",
      emergency_contact: "+256751270414",
      lat: "-0.857099",
      long:"30.917860",
      village_id: 2
    },
    {
      first_name: "Nakisuyi ",
      last_name: "Amina",
      age: 36,
      phone_number: "+256771809988",
      emergency_contact: "+256774897846",
      lat: "0.974722",
      long:"33.316944",
      village_id: 3
    },
    {
      first_name: "Kasubo ",
      last_name: "Sharifa",
      age: 36,
      phone_number: "+256705059172",
      emergency_contact: "+256774897846",
      lat: "0.974722",
      long:"33.316944",
      village_id: 4
    },
    {
      first_name: "Mikayla ",
      last_name: "O'Bryan",
      age: 19,
      phone_number: "+256702250027",
      emergency_contact: "+256774897846",
      lat: "0.974722",
      long:"33.316944",
      village_id: 5
    },
    
  ])
    
};
