# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

See details of [the task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md).

## ⚙️ How to install and run

Clone repo and switch to branch `typeorm`:

```
git clone git@github.com:marina-melihova/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout typeorm
```

Also you should provide environment variables to `.env` file (see temlate in file .env.example)

```
cp .env.example .env
```

Compose image for docker and run the application in development mode:

```
docker-compose up -d
```

By default app use port 4000. You can change port in `.env` file (copy .env.example). After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

**Note:** Authorization will be added in the following tasks

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

Final size of the Docker image with application is less than 500 MB:  
![image-size](https://user-images.githubusercontent.com/64692860/220200743-ce67a435-5f03-434d-9aa6-9f3b875d73a6.PNG)

Database files and logs to be stored in volumes:  
![pg-data](https://user-images.githubusercontent.com/64692860/220201434-6b5a75db-fe73-46b6-95cd-7af4de8e3be8.PNG)

Scan vulnerablities of images:

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

```
docker exec -it app npm test
```

Note: Sometimes when you run tests, they can run so fast that createTime equals updateTime (the creation and update of the record happened very quickly, because of which the timestamp was updated to the same value, as a result, the test fails). When this happens you need to clear the tables and run the tests again.

To run only one of all test suites

```
docker exec -it app npm test -- <path to suite>
```

For example:

```
docker exec -it app npm test -- test/favorites.e2e.spec.ts
```

### Find problems in code by ESLint

```
docker exec -it app npm run lint
```
