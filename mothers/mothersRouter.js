const router = require("express").Router();
const Mothers = require("./mothersHelper");

// register mother
router.post("/auth/register", (req, res) => {
  let data = req.body;

  Mothers.addMother(data)
    .then(mother => {
      res.status(201).json({ message: "Added a mother" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all mothers
router.get("/", (req, res) => {
  Mothers.getMothers()
    .then(mothers => {
      res.status(200).json(mothers);
    })
    .catch(err => res.status(500).json(err));
});

// get mothers by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  Mothers.getMotherById(id)
    .then(mothers => {
      if (mothers) {
        res.status(200).json(mothers);
      } else {
        res.status(404).json({ message: 'Could not find mother with associated id.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// edit a mother based on ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Mothers.updateMother(id, data)
    .then(mothers => {
      res.status(200).json({message: 'mother edited'});
    })
    .catch(err => res.status(500).json(err));
});

// delete a mother based on ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Mothers.deleteMother(id)
    .then(mothers => {
      res.status(200).json({ message: "mother deleted!" });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
