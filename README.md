# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

See details of [the task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md).

## ⚙️ How to install and run

Clone repo and switch to branch `auth-logger`:

```
git clone git@github.com:marina-melihova/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout auth-logger
npm ci
```

Also you should provide environment variables to `.env` file (see template in file .env.example)

```
cp .env.example .env
```

Run the application in production mode:

```
npm run start:prod
```

Run the application in development mode:

```
npm run start:dev
```

Compose image for docker and run the application in development mode:

```
npm run docker
```

By default app use port 4000. You can change port in `.env` file (copy .env.example). After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

During `docker-compose up` the migration is executed to update database schema.

## Docker

You can compose images:

```
docker compose -f "docker-compose.yaml" up --build
```

or download images from docker hub:

```
docker pull webshaman/nodejs2022q4-service:app
docker pull webshaman/nodejs2022q4-service:db
```

Scan vulnerablities of images:

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests with authorization:

```
npm run test:auth
```

To run only one of all test suites

```
npm run test:auth -- <path to suite>
```

For example:

```
npm run test:auth -- test/favorites.e2e.spec.ts
```

To run tests inside the container after `npm run docker` in another terminal:

```
docker exec -it app npm run test:auth
```

Note: Sometimes when you run tests, they can run so fast that createTime equals updateTime (the creation and update of the record happened very quickly, because of which the timestamp was updated to the same value, as a result, the test fails). When this happens you need to clear the tables and run the tests again.

### Find problems in code by ESLint

```
npm run lint
```

or inside the docker-container:

```
docker exec -it app npm run lint
```
