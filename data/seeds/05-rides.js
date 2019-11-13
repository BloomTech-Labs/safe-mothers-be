
exports.seed = function(knex) {
    return knex('rides').insert([
      {
        mother_id: 1,
        driver_id: 10,
        initiated: '2019-10-27T16:11:56-05:00',
        completed: false,
        assigned: false
      },
      {
        mother_id: 2,
        driver_id: 2,
        initiated: '2019-10-27T16:11:56-05:00',
        assigned: true,
        pending:false,
        completed: false
      }
    ]);
  };