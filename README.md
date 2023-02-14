# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

See details of [the task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/remote-control/assignment.md).

## ⚙️ How to install

Clone or download repo and install packages

```
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

By default app use port 4000. You can change port in `.env` file (create it similarly .env.example). After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

You can download image from docker hub

```
docker pull webshaman/nodejs2022q4-service
```

or compose image:

```
docker compose -f "docker-compose.yaml" up --build
```

Scan vulnerablities of images:

```
npm run docker:scan
```

Also you should provide environment variables to `.env` file (see temlate in file .env.example)

For example:

```
PORT=4000
POSTGRES_PORT=5434
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

**Note:** Authorization will be added in the following tasks

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
