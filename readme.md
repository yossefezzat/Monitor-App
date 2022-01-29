# Welcome to Monitor RESTFUl API

<br>

### Welcome to Monitor RESTFUl API! Here you'll find all the documentation you need to get up and running with it.

<br>

## Introduction
Monitor RESTFUL-API is an API for Uptime monitoring server which allows authorized users to enter URLs they want monitored, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.


The API provides the following features:
* Creating a new user
* Login with User credentials
* CRUD operations for user checks and reports
  - GET Check Name
  - GET User checks
  - GET Check report
  - GET User reports
  - POST Create a new check
  - PUT Update check activity (paused)
  - PUT Update check activity (activated)
  - PUT Update check url
  - PUT Update check name
  - DELETE Remove check and assigned report
  - DELETE Remove all user checks and assigned reports

<br>

## Used Tools

* #### Node.js: The whole server is developed using Node.js as a runtime environment.
* #### Express.js: Express is the most common framework for Node.js.
* #### MongoDB: Mongo is the database used for this project and I used MongoDB Atlas as a Cloud-hosted MongoDB service.
* #### Mongoose: A great ORM for MongoDB as it provides a straightforward, schema-based solution to model application data.
* #### JWT: I used JSONWebToken to control the authentication process of the API requests (api_key).
* #### ESLint: A tool for patterns reporting in ECMAScript/JavaScript code and making code more consistent.
* #### Heroku: Platform as a service (PaaS) and there is a live instance of my API master branch deployed and running on it.

<br>

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Fearures

### Sign-up with email verification.
### Stateless authentication using JWT.
### Users can create a check to monitor a given URL if it is up or down.
### Users can edit, pause, or delete their checks if needed.
### Users may receive a notification on a webhook URL by sending HTTP POST request whenever a check goes down or up.
### Users should receive email alerts whenever a check goes down or up.
### Users can get detailed uptime reports about their checks availability, average response time, and total uptime/downtime.

<br>

## Dependencies

* #### "axios": "^0.25.0",
* #### "bcrypt": "^5.0.1",
* #### "config": "^3.3.7",
* #### "crypto": "^1.0.1",
* #### "dotenv": "^14.2.0",
* #### "express": "^4.17.2",
* #### "helmet": "^5.0.2",
* #### "jsonwebtoken": "^8.5.1",
* #### "mongoose": "^6.1.7",
* #### "nodemailer": "^6.7.2",
* #### "validator": "^13.7.0"
