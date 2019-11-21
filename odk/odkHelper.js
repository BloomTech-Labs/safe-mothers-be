const db = require("../data/dbConfig");

module.exports = {
    getMothers,
    addMother,
    addDriver,
};

//Used to check if the form was loaded to the backend
function getMothers(){
    return db("mothers").select("*")
}

//add mother form to database
function addMother(mother){
    return db('mothers')
        .insert(mother)
        .returning(['id',"name"])
}

//add Driver form to database. Not used yet
function addDriver(driver){
    return db('drivers')
        .insert(driver)
        .returning(['id',"driver_name"])
}

