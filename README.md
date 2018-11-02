# api-nodejs-hs

A Api Node.js app using [Express](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/), [heroku](http://heroku.com/) and [Mongodb](http://mongodb.com/) installed.

```sh
git clone git@github.com:herysepty/api-nodejs-hs.git # or clone your own fork
cd api-nodejs-hs
npm install
export hs_jwtPrivateKey=your_secret_key
nodemon
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying to heroku

```
heroku create
git push heroku master
heroku open
```

## Documentation

# Users

## Create user

### Endpoint /api/users

```http
POST /api/users HTTP/1.1
Content-Type: application/json
```

You can use this endpoint to create a account
### Request

```java
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "3000",
  "path": "/api/users",
  "headers": {
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ name: 'herysepty',
  email: 'herysepty6@gmail.com',
  password: '123456' }));
req.end();
```

```shell
curl --request POST \
  --url http://localhost:3000/api/users \
  --data '{\n	"name": "herysepty",\n	"email": "herysepty6@gmail.com",\n	"password": "123456"\n}'
```

Paramter | Description
----------|-------------
name | **`string (required)`** <br> The name of account users
email | **`string (required)`** <br> The email of user
password | **`string (required)`** <br> The pasword of user

### Response

```json
Status 200
Content-Type: application/json

{
    "_id": "5b9dea3bd3158900b0a53fbf",
    "name": "herysepty",
    "email": "herysepty6@gmail.com"
}
```

Attribute | Description
----------|-------------
_id | user id
email | your email in system
password | your password

## Authtentication

### Endpoint /api/auth

```http
POST /balance/top-up HTTP/1.1
Content-Type: application/json
x-auth-token: basic [your token]
```

You can use this endpoint to authentication your account
### Request

```java
var http = require("http");

var options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "3000",
  "path": "/api/auth",
  "headers": {
    "content-type": "application/json",
    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlkM2E1MTViODliYzBkYjdkY2IxNmIiLCJpYXQiOjE1MzcwMzI3Mzl9.EmYbqDHaVl5LzIRHLSnj6JLZuqpybzw3z7newDAFB2Q"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ email: 'herysepty6@gmail.com', password: '123456' }));
req.end();
```

```shell
curl --request POST \
  --url http://localhost:3000/api/auth \
  --header 'content-type: application/json' \
  --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlkM2E1MTViODliYzBkYjdkY2IxNmIiLCJpYXQiOjE1MzcwMzI3Mzl9.EmYbqDHaVl5LzIRHLSnj6JLZuqpybzw3z7newDAFB2Q' \
  --data '{\n	"email": "herysepty6@gmail.com",\n	"password": "123456"\n}'
```

Paramter | Description
----------|-------------
email | **`string (required)`** <br> The email of user
password | **`string (required)`** <br> The pasword of user

### Response

```json
Status 200
Content-Type: application/json

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlkZWEzYmQzMTU4OTAwYjBhNTNmYmYiLCJpYXQiOjE1MzcwNzY3MTZ9.EAdGNk-eth0AHs-qlPwXrNk8Iqo_T5mSDqR450u9lWw
```

Attribute | Description
----------|-------------
token | your token


