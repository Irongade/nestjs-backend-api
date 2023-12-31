## Description

The app uses [Nest](https://github.com/nestjs/nest) , a popular framework for NodeJs, Express, TypeScript.

Run the below commands to start the app.

## Installation

```bash
$ yarn install
```

## Generate and Populate the Env file.

This step is crucial, as the app won't run properly without it.

For Mac

```bash
$ cp .env.example .env
```

For Windows

```bash
$ copy .env.example .env
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

```

## Swagger

Swagger Link: http://localhost:3000/api/v1/swagger-docs#/

## Register User

You can specify the role as either "ADMIN" or "USER" in the register request to make an admin or regular user. This is not ideal, but did it like this intentionally to make it easy to test the application's features.
if no role value is specified, we just create a regular user.

Payload example for Registeration.
```bash
{
    "name": "Test User",
    "email": "usertester@gmail.com",
    "password": "Text123",
    "role": "ADMIN"
    "confirm_password": "Text123"
}

```

Other request payload can be found in the Swagger.


