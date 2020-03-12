# SRBN Live Quiz

<p align="center">
  ![alt text](https://raw.githubusercontent.com/nirajkarki12/live-quiz/master/backend/uploads/angular+nestjs.png)
</p>

## Installation

<p>Create a database, config on <i>backend/ormconfig.json</i></p>
<p>Rename <i>.env.sample</i> to <i>.env</i>, config essential parameters</p>

```bash
$ cd backend
$ npm install
$ npm run migration:generate <MIGRATION_NAME>
$ npm run migration:run <MIGRATION_NAME>
```
## Running Backend

```bash
$ cd backend

# development
$ npm run start

# watch mode
$ npm run start:dev

# build and start with forever
$ npm run build
$ forever start dist/main.js
```

## Running Frontend

<p>Rename <i>_environment.ts</i> to <i>environment.ts</i>, config essential parameters</p>
<p>Rename <i>_environment.prod.ts</i> to <i>environment.prod.ts</i>, config essential parameters</p>

```bash
$ cd frontend
$ npm install

# development
$ ng serve

# build
$ npm run build
```
