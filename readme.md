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
  - GET User checks by tag
  - POST Create a new check
  - PUT Update check activity (paused)
  - PUT Update check activity (activated)
  - PUT Update check url
  - PUT Update check name
  - PUT Update tag name
  - DELETE Remove check and assigned report
  - DELETE Remove all user checks and assigned reports
  - DELETE Remove tag from check
  - DELETE Remove all tags from check

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

<br>

## Challenges
* #### Difference between `streaming` and `polling`
  * #####  `Polling` : It is defined as the process when a client requests a particular piece of data at regular intervals (maybe every x seconds) and the server reverts with a usual response with the required data.
  * #####  `streaming` : Streaming is done through sockets, In Layman terms, sockets are a file that your computer can write/read from in a long width connection with another computer, an open connection till one machine turns it off.
<img src="/polling.png" text-align="center" title="polling vs streaming">

* #### `Stateless Authentication`
  * #### Token-based authentication enables users to obtain a token that allows them to access a service and/or fetch a specific resource without using their username and password to authenticate every request. Because the token can be a self-contained entity that conveys all the required information for authenticating the request, it is often referred to as stateless authentication. In this case, the server side does not need to maintain the state of a user.

<br>

## Fearures

* #### Sign-up with email verification.
* #### Stateless authentication using JWT.
* #### Users can create a check to monitor a given URL if it is up or down.
* #### Users can edit, pause, or delete their checks if needed.
* #### Users may receive a notification on a webhook URL by sending HTTP POST request whenever a check goes down or up.
* #### Users should receive email alerts whenever a check goes down or up.
* #### Users can get detailed uptime reports about their checks availability, average response time, and total uptime/downtime.

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

## Configuration

#### You have add your .env file that contain:
* #### `PORT=`          -> Port to run your dev  
* #### `JWT_SECRET=`    -> Jwt secret to generate jwt tokens api_key
* #### `MONGODB_URL=`   -> Import your database url

* #### `EMAIL_HOST=`    -> Host of your email service (smtp...)
* #### `EMAIL_SERVICE=` -> Service of you email (eg. yahoo, gmail ..)
* #### `EMAIL_USERNAME=`-> Your email username
* #### `EMAIL_PASSWORD=`-> Your token/password to access your mail service

## Polling Process Report
  * #### Google
    * #### Check data
        <pre>
          <code>[{
            "_id":{"$oid":"61f564af4a9969f4ceec10a2"},
            "name":"google",
            "email":"ye.fci2020@gmail.com",
            "URL":"http://www.google.com",
            "status":true,"timeInterval":5,
            "timeOut":1,"threshold":2,
            "tags":["face"],
            "webhook":"https://webhook.site/8f427736-4b7f-489f-8613-444f2a433945"
            "__v":0,
        }]</code>