const router = require("express").Router();
const db = require("./odkHelper");
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const multer = require("multer");

const storage = {
  dest: "./uploads/",
  filename: function(req, file, cb) {
    console.log("FIELDNAME ", file.fieldname);
    cb(null, file.fieldname + "-" + Date.now());
  }
};

const upload = multer(storage);

router.post("/", (req, res) => {
  const user = req.body;
  console.log("body ", req.body);
  console.log("hello heroku ", req.body);
  if (user) {
    db.add(user)
      .then(([user]) => res.status(201).json(user))
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        })
      );
  }
});

//route is odk/upload
router.post("/upload/", upload.single("xml_submission_file"), (req, res) => {
  console.log("BODY ", req.body);
  console.log("FILE ", req.file);
  const path = req.file.path;
  fs.readFile(path, { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    console.log("Data XML ", data);
    parser.parseString(data, function(err, result) {
      console.log("FROM XML TO JSON ", result);
      const { data: data } = result;
      const { username, password } = data;
      const user = {
        username: username[0],
        password: password[0]
      };
      console.log("USER ", user);
      /* if (username.length && password.length) {
                db.add(user)
                    .then(([user]) => {
                        fs.unlinkSync(path);
                        res.status(201).json(user);
                    })
                    .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
            }*/
      fs.unlinkSync(path);
      res.status(201).json(user);
    });
  });
});
