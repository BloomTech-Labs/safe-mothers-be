const db = require("../data/dbConfig");
module.exports = {
    getLabels,
    getAllLabels,
    addLabel,
    findBy,
    deleteLabel
};


function getAllLabels() {
    return db("labels");
}


function getLabels(filter) {
    return db("labels").where(filter);
}

async function addLabel(label) {
    return db('labels')
        .insert(label, 'id')
        .then(([id]) => {
            return findBy({id})
        });
}


function findBy(filter) {
    return db("labels").where(filter);
}


function deleteLabel(id) {
    return db("labels")
        .del()
        .where(id);
}