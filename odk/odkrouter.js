const router = require("express").Router();
const odk = require("./odkHelper");
const fs = require('fs');
const xml2js = require("xml2js");
const parser = new xml2js.Parser({explicitArray : false});
const multer = require("multer")


//Used to store the xml form from odk
const storage = {
    //This is where the uploaded xml file will go temporarily
    dest: "./uploads/",
    
    filename: function(req, file, cb) {
        console.log("FIELDNAME", file.fieldname);
        cb(null,file.fieldname + '-' + Date.now() )
    }
};
const upload = multer(storage);


//Uploading ODK forms and converting them to json so they can be stored to the database. We can successfully upload multiple mother surveys as long as the file name stays as "R4L_Mother_EnglishOnly". This is what the form provided by Safe Mothers is named. For future build: need to be able to grab drivers form and do the same in one route so that they can load up and form regardless and save it to the database.

router.post('/upload', upload.single('xml_submission_file'), (req, res) => {
    console.log('BODY ', req.body);
    console.log('FILE ', req.file);

    const path = req.file.path;
    console.log("path",path)
    
    //reading the xml file to be parsed to json
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        console.log('Data XML ', data);
        console.log(err)
        //parsing to json
        parser.parseString(data, function (err, result) {
            console.log('FROM XML TO JSON ', result);
            //look for file name in data id.
            const {"data": data} = result;
            
            /*
              Destructuring:
              The data from odk survey when turned to a json will be in the form of multiple objects nested into an object, with another object. We needed to grab the upper most object key which is the name of the file of the Mother Survey form. 
              
              We may be able to add the Drivers Form, ("_SAFE_MBConnect_Driver":driverFrom) to the result variable below. Then use result in an conditional statement to determine which survey form it is and how to handle it. Ran out of time to test it though. All the parts are there for the driver just commented out. Just need to put everything into a conditional statement and test it using ODK Collect. More info on PVD.
            */
            const {
                "_R4L_Mother_EnglishOnly":motherForm,
                // "_SAFE_MBConnect_Driver":driverFrom
            } = result;

            /*
             Destructuring the object nested within the above so we have access to the key:values inside of them
             */

            //Mother
            const {identification, introduction, "$":first, Registration, Complications, Birth_Preparedness, Pregnancy_History,  Demographics } = motherForm
            console.log("MotherForm", introduction, "First Object", first)
            
            //Driver --> simpler form with only one nested object
            // const {identification} = driverForm
           
            const form = {}

            //identification --> grabbing single key:value out of identification{}
            const {interviewer} = identification
            form['interviewer'] = interviewer

            /**
             The values that come back from the survey are in the form of numbers from 0-100 and strings. We use a for loop to filter through them, and put each into the form object above
             */
            function filterObjects(obj) {
                for (let property in obj) {
                    if (typeof obj[property] === 'string' && obj[property].length > 0)
                    form[property] = obj[property]
                    if( typeof obj[property] === 'number')
                    form[property] = obj[property]
                }
            }

            //mother
            filterObjects(interviewer)
            filterObjects(introduction)
            filterObjects(Registration)
            filterObjects(Complications)
            filterObjects(Birth_Preparedness)
            filterObjects(Pregnancy_History)
            filterObjects(Demographics)

            //Driver
            // filterObjects(introduction)

            /*
             Here we need to equate the keys in the form to the keys in our "mothers" table so they can be combined into a single object. We loop through them using map and then put them in this last and finale filteredForm{} that can then be saved into the database correctly. **NOTE because we have a single filteredForm{} already, may not need a separate one for drivers.
             */

            //Store new object once they go through .map(). 
            const filteredForm = {}

            //all the keys from our 'mothers' table from our database
            const motherTable = [
                "interviewer",
                "interviewer_other",
                "current_pg",
                "due_now",
                "deliver_elsewhere",
                "hx_cesarean",
                "hx_complication",
                "current_multip",
                "name",
                "edd",
                "age",
                "village",
                "village_other",
                "own_phone",
                "other_phone",
                "phone_number",
                "carrier",
                "owner_phone",
                "owner_phone_other",
                "carrier_other",
                "want_education",
                "complications_note",
                "anemia",
                "malaria",
                "obstructed_labor",
                "malpresent",
                "aph",
                "pph",
                "ret_placenta",
                "placenta_previa",
                "hx_stillbirth",
                "no_stillbirths",
                "other_complication",
                "complication_specify",
                "BP_note",
                "no_anc",
                "deliver_place",
                "deliver_place_other",
                "deliver_specific",
                "plan_transport",
                "plan_transport_other",
                "purchase_supplies",
                "name_supplies",
                "supplies_other",
                "mama_kit",
                "mackintosh",
                "razor",
                "pad",
                "cotton",
                "soap",
                "gloves",
                "medication",
                "baby_clothes",
                "blanket",
                "sheets",
                "other_supply",
                "saving_money",
                "amt_saved",
                "amt_saved_range",
                "PH_note",
                "no_pg",
                "no_birth",
                "no_children",
                "no_under5",
                "hx_childdeath",
                "no_childdeath",
                "attend_school",
                "education",
                "money_control",
                "total_house",
                "marital_status",
                "marital_status_other",
                "spouse_school",
                "spouse_education",
                "polygamy",
                "no_wives",
                "no_wives_other",
                "wife_order",
                "wife_order_other",
                "insurance",
                "insurance_type",
                "insurance_type_other",
                "insurance_CBO",
                "insurance_private",
                "insurance_other",
                "sell_asset",
                "notes"
            ]


            for(let property in form) {
                motherTable.map(item => {
                    if(property === item){
                        filteredForm[property] = form[property]
                    }
                })
            }

            //all the keys from our 'drivers' table from our database
            // const driverTable =[
            //   "driver_name",
            //   "phone",
            //   "carrier",
            //   "another_phone",
            //   "phone_2",
            //   "carrier_2",
            //   "latitude",
            //   "longitude",
            //   "district",
            //   "district_other",
            //   "subcounty",
            //   "subcounty_other",
            //   "stage",
            //   "parish_other",
            //   "own_boda",
            //   "boda_night",
            //   "transfers",
            //   "story",
            //   "motivation",
            //   "background",
            //   "married",
            //   "children",
            //   "number_kids",
            //   "kid_info",
            //   "dream",
            //   "picture"
            // ]

          //   for(let property in form) {
          //     driverTable.map(item => {
          //         if(property === item){
          //             filteredForm[property] = form[property]
          //         }
          //     })
          // }
            
            console.log("Intro object" , form)
            console.log("Filtered Form", filteredForm)

            //Add Mothers Form
            odk.addMother(filteredForm)
                .then((form) => {
                    res.status(201).json(form);
                })
                .catch(err => console.log("Error posting", err))

            //Add Drivers Form
            // odk.addDrivers(filteredForm)
            //     .then((form) => {
            //         res.status(201).json(form);
            //     })
            //     .catch(err => console.log("Error posting", err))

            fs.unlinkSync(path);
        });
    })
});

module.exports = router