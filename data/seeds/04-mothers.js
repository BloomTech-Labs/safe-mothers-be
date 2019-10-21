
exports.seed = function (knex) {
  return knex("mothers").insert([
    {
      //introduction
      current_pg: 1,
      due_now: 0,
      deliver_elsewhere: "0",
      hx_cesarean: "1",
      hx_complication: "1",
      current_multip: "0",
      //registration
      name: "Jalen Dow",
      edd: "2019-12-19",
      age: "30",
      home_village: "1",
      own_phone: "0",
      other_phone: "1",
      phone_number: "+2567032880888",
      carrier: "2",
      owner_phone: "3",
      want_education: "1",
      complications_note: "",
      anemia: "2",
      malaria: "2",
      obstructed_labor: "0",
      malpresent: "1",
      aph: "1",
      pph: "1",
      ret_placenta: "1",
      placenta_previa: "1",
      hx_stillbirth: "1",
      no_stillbirths: "3",

    }

  ])

};
