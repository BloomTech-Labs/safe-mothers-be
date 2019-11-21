
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
#### Node JS & Express JS Server Framework

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
  id: UUID
  name: STRING
  lat: STRING
  long: STRING
}
```

#### Drivers

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  lat: STRING
  long: STRING 
  phone_number: STRING
  villiage_id: UUID foreign key in VILLIAGE table
  availability: BOOLEAN
  reliability: INTEGER
}
```

#### Mothers

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  age: INTEGER
  phone_number: STRING
  emergency_contact: STRING
  villiage_id: UUID foreign key in VILLIAGE  table
  health_center: STRING
  lat: STRING
  long: STRING
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

#### Rides

---

```
{
  id: UUID
  mother_id: UUID foreign key in MOTHERS  table
  driver_id: UUID foreign key in DRIVERS  table
  initiated: DATETIME
  ended: DATETIME
  initiated: DATETIME
}
```

## DB Helpers

### Mothers
|Helper         | description |
|---------------|-------------|
|`getMothers()` | Returns all mothers |

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


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
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

See [Frontend Documentation](https://github.com/Lambda-School-Labs/safe-mothers-fe/blob/master/README.md) for details on the fronend of our project.
