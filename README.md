# Node Postgres App

### This is my first app with node, express, postgres and docker. Here i create two tables, `users` and `appointments`, where appointments are relationeted to users.

## Routes

- **`GET /appointments:`** Return All appointments for this day for an authenticated user. This Route uses a JWT token in request Header.

- **`POST /appointments:`** Create a new appointment using the `provider_id` and `date ISO`. It check if already has an appointment in this day and returns a error, rr if the user is not authenticated using a JWT token in request Header.

- **`POST /users:`** Create a new user with `name`, `email` and `password`. The password is cryptgraphad with a hash. It returns the created user.

- **`PATCH /users/avatar:`** Allow to an authenticated user to change or insert an avatar image file.

- **`POST /sessions:`** Authenticate an user wather `email` and `password` is given. Returning user and its JWT token.

## Docker config

- Create a docker container with the cli below.

~~~powershell
docker run --name postgres -e POSTGRES_PASSWORD=935115 - p 5432:5432 -d postgres
~~~

- Create a database with name `barber`. All config settings are in `ormconfig.json`.
