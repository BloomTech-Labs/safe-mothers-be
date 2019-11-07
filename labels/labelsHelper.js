const db = require("../data/dbConfig");
module.exports = {
    getLabels,
    addLabel,
    findBy,
    deleteLabel
};
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