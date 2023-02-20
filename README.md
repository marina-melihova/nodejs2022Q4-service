# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

See details of [the task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md).

## ⚙️ How to install

Clone repo, switch to branch `typeorm` and install packages

```
git clone git@github.com:marina-melihova/nodejs2022Q4-service.git
cd nodejs2022Q4-service
git checkout typeorm
npm ci
```

## 🚀 How to run

Run the application in production mode

```
npm start
```

Run the application in development mode

```
npm run start:dev
```

By default app use port 4000. You can change port in `.env` file (copy .env.example). After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

**Note:** Authorization will be added in the following tasks

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
![docker-desktop](https://user-images.githubusercontent.com/64692860/220187285-ee38d12c-e86c-4554-8c8a-ab11c2c28040.PNG)

Scan vulnerablities of images:

```
npm run docker:scan
```

Also you should provide environment variables to `.env` file (see temlate in file .env.example)

For example:

```
PORT=4000
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## Testing

After application running open new terminal and enter:

```
docker exec -it app npm test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
