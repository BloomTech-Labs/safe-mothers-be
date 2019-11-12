const router = require("express").Router();

const Labels = require("./labelsHelper");



router.get("/", (req, res) => {
    Labels.getAllLabels()
        .then(labels => {
            res.status(200).json(labels);
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting labels" });
        })
});

router.get("/:mother_id/", (req, res) => {
    const mother_id = req.params.mother_id;
    Labels.getLabels({ mother_id })
        .then(labels => {
            res.status(200).json(labels);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error getting labels" });
        })
});

router.delete("/:label_id", (req, res) => {
    const label_id = req.params.label_id;
    console.log("label id", label_id);
    Labels.deleteLabel({ id: label_id })
        .then(labels => {
            console.log("SUCCESS ", labels);
            res.status(200).json(labels);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Server could not remove the label" })
        })
});

router.post('/', (req, res) => {
    const label = req.body;
    Labels.addLabel(label)
        .then(label => res.status(201).json(label))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Server could not add the label" })
        })
});

module.exports = router;