

# API Documentation

#### Backend delpoyed at [Heroku](https://production-fe-labs17-safe.herokuapp.com/) <br>

## Getting started

To get the server running locally:

localhost:5000

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Our backend was built using:
Node JS
For the following reasons:
-    Familiarity across team.
-    Scalibility.
-    Works with SMS messaging technology.
-    A number of JS libraries to aid in our vision. 

## Endpoints

[Non-SMS related endpoint documentation](https://documenter.getpostman.com/view/6290768/SW7UcWoB?version=latest)

[SMS Router Endpoints](https://documenter.getpostman.com/view/8744942/SW7Z4UeK?version=latest#d2e52725-8481-4f6c-97df-4ac21804e987)

# Data Model

#### Users

---

```
{
  id: UUID
  username: STRING
  first_name: STRING
  last_name: STRING
  password: STRING
}
```

#### Villages

---

```
{
  id: UID
  name: STRING
  latitude: STRING
  longitude: STRING
}
```

#### Drivers - Based off of Safe Mothers Survey

---

```
{
  id: UUID
  driver_name: STRING
  phone: STRING
  carrier: INTEGER
  another_phone: INTEGER
  phone_2: STRING
  carrier_2: INTEGER
  latitude: STRING
  longitude: STRING 
  district: INTEGER
  district_other: STRING
  subcounty: INTEGER
  subcounty_other: STRING
  stage: INTEGER
  parish_other: STRING
  availability: BOOLEAN
  reliability: INTEGER
  online: BOOLEAN
  timestamp: TIMESTAMPS
  own_boda: INTERGER
  boda_night: INTEGER
  transfers: INTEGER
  story: STRING
  motivation: STRING
  background: STRING
  married: INTEGER
  childrean: INTEGER
  number_kids: INTEGER
  kid_info: STRING
  dream: STRING
  picture: STRING
}
```

#### Mothers - Based off of Safe Mothers Survey

---

```
{
  id: UUID
  interviewer: INTEGER
  interviewer_other: STRING
  due_now: INTEGER
  deliver_elsewhere: INTEGER
  hx_cesarean: INTEGER
  hx_complication: INTEGER
  current_multip: INTEGER
  name: STRING
  edd: STRING
  age: INTEGER
  villiage_id: UUID foreign key in VILLIAGE  table
  village_other: STRING
  own_phone: INTEGER
  other_phone: STRING
  phone_number: STRING
  carrier: INTEGER
  owner_phone: INTEGER
  owner_phone_other: STRING
  carrier_other: STRING
  want_education: INTEGER
  complications_note: STRING
  anemia: INTEGER
  malaria: INTEGER
  obstructed_labor: INTEGER
  malpresent: INTEGER
  aph: INTEGER
  pph: INTEGER
  ret_placenta: INTEGER
  placenta_previa: INTEGER
  hx_stillbirth: INTEGER
  no_stillbirths: INTEGER
  other_complication: INTEGER
  complication_specify: STRING
  BP_note: STRING
  no_anc: INTEGER
  deliver_place: INTEGER
  deliver_place_other: STRING
  deliver_specific: STRING
  plan_transport: INTEGER
  plan_transport_other: STRING
  purchase_supplies: INTEGER
  name_supplies: STRING
  supplies_other: STRING
  mama_kit: INTEGER
  mackintosh: INTEGER
  razor: INTEGER
  pad: INTEGER
  cotton: INTEGER
  soap: INTEGER
  gloves: INTEGER
  medication: INTEGER
  baby_clothes: INTEGER
  blanket: INTEGER
  sheets: INTEGER
  other_supply: INTEGER
  saving_money: INTEGER
  amt_saved: INTEGER
  amt_saved_range: INTEGER
  PH_note: STRING
  no_pg: INTEGER
  no_birth: INTEGER
  no_children: INTEGER
  no_under5: INTEGER
  hx_childdeath: INTEGER
  no_childdeath: INTEGER
  attend_school: INTEGER
  education: INTEGER
  money_control: INTEGER
  total_house: INTEGER
  marital_status: INTEGER
  marital_status_other: STRING
  spouse_school: INTEGER
  spouse_education: INTEGER
  polygamy: INTEGER
  no_wives: INTEGER
  no_wives_other: STRING
  wife_order: INTEGER
  wife_order_other: STING
  insurance: INTEGER
  insurance_type: STING
  insurance_type_other: STRING
  insurance_CBO: INTEGER
  insurance_private: INTEGER
  insurance_other: INTEGER
  sell_asset: INTEGER
  notes:STRING
 
}
```

#### Rides

---

```
{
  id: UUID
  mother_id: UUID foreign key in MOTHERS  table
  driver_id: UUID foreign key in DRIVERS  table
  initiated: DATETIME
  assigned: BOOLEAN
  pending: BOOLEAN
  completed: BOOLEAN
  ended: DATETIME
}
```

#### Scores

---

```
{
  id: UUID
  rating: STRING
  driver_id: UUID foreign key in DRIVERS  table
  mother_id: UUID foreign key in MOTHERS  table
}
```

## DB Helpers

### Mothers

`getMothers()` -> Returns all mothers

`getMotherById(id)` -> Returns a single mother by ID

`addMother(data)` -> Creates a single mother.

`updateMother(id, data)` -> Updates mother by provided id. 

`deleteMother(id)` -> Delete an organization by ID

<br>

### Drivers

`getDrivers()` -> Returns all Drivers

`getDriverById(id)` -> Returns a single driver by ID

`addDriver(data)` -> Creates a single driver.

`updateDriver(id, data)` -> Updates driver by provided id. 

`deleteDriver(id)` -> Delete an organization by ID

<br>

### SMS

`checkMotherRegistration` -> Returns mother by phone #

`findDriverPhone` -> Returns a driver by phone #

`statusOnline` -> Updates driver by phone # to online: true

`statusOffline` -> Updates driver by phone # to offline: false

`getVillages` -> Returns and array of villages

`getVillageById` -> Returns a village by id

`getRidesRequest` -> Returns an array of rides

`addMothersRideRequest` -> Creates a ride request

`addDriverRideRequest` -> Updates ride to assigned: true

`checkRideRequest` -> Return ride by ride Id

`updatePendingRequest` -> Updates the drivers pending status by driver Id

`getRideByDriverId` -> Returns driver by Id and if assigned: false

`updatedDriverAvailability` -> Updates driver availability by Id

`reassignFailedRides` -> Querys the database to find rides that have not been completed and have not been assigned. Then checks if those rides have expired 5 minutes past time of ride initiation.The drivers that failed to respone, their availability is set to false.Then it reassigns those rides with new drivers and messages those drivers to accept the ride request.Next those failed rides, pending is set to true so the system knows the ride is waiting for the new driver to respone.If a new driver responses then pending is set back to false.


<br>

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
  *  DATABASE_URL - switching between localhost and server URL
  *  DB_ENV - set to "development" until ready for "production"
  *  JWT_SECRET - This is a secret from the JWT library.
  *  FRONTLINE_KEY - this is generated in your Frontline SMS account
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
