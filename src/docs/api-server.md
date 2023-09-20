** Warning **

Do not add any third party dependencies without the permission of the repository owner. If you feel that any third party dependency are required then feel free to create a new feature branch and work on that until test and approval.<br><br>

# SnipNest Api Server Documentation

This is an Express TypeScript backend application that provides a REST API for managing SnipNest application. The application is designed to be scalable and flexible, with modular code that can be easily customized to fit specific business needs.
<br> <br>

## Installation

To install api-server, run:

```bash
yarn
```

### Usage

To start the project in development environment, run:

```bash
yarn run dev
```

To start the docker services for this project, please run docker daemon on your computer then run the following command

```bash
docker-compose up -d
```

By default, the project will start on `http://localhost:4000`. <br><br>

### Configuration Settings

The project uses [config](https://www.npmjs.com/package/config) for configuration settings of our application. The config files are located in the directory 'config' under the root project folder. There are 3 files inside config directory as follows:

- test.ts [File for adding config settings or properties only for test environment]
- default.ts [File for adding settings or properties that will only be used in development environment]
- production.ts [File for adding settings or properties that will only be used in production environment]

Here is an example of how to consume the settings from config files:

```typescript
import config from "config";
const port = config.get("port");
```

### Project Structure

```
src
 ┣ api
 ┃ ┗ v1
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┣ controllers
 ┃ ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┃ ┣ login.ts
 ┃ ┃ ┃ ┃ ┣ refresh.ts
 ┃ ┃ ┃ ┃ ┣ register.ts
 ┃ ┃ ┃ ┃ ┣ revoke.ts
 ┃ ┃ ┃ ┃ ┗ validate.ts
 ┃ ┃ ┃ ┣ validation
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┣ comments
 ┃ ┃ ┃ ┣ controllers
 ┃ ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┃ ┗ removeItem.ts
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┣ snippets
 ┃ ┃ ┃ ┣ controllers
 ┃ ┃ ┃ ┃ ┣ create.ts
 ┃ ┃ ┃ ┃ ┣ findAll.ts
 ┃ ┃ ┃ ┃ ┣ findAllComments.ts
 ┃ ┃ ┃ ┃ ┣ findAllStars.ts
 ┃ ┃ ┃ ┃ ┣ findOne.ts
 ┃ ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┃ ┣ postComment.ts
 ┃ ┃ ┃ ┃ ┣ reactStar.ts
 ┃ ┃ ┃ ┃ ┣ removeItem.ts
 ┃ ┃ ┃ ┃ ┗ updateOne.ts
 ┃ ┃ ┃ ┣ validation
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ stars
 ┃ ┃ ┃ ┣ controllers
 ┃ ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┃ ┗ removeItem.ts
 ┃ ┃ ┃ ┗ index.ts
 ┣ config
 ┃ ┣ default.ts
 ┃ ┣ production.ts
 ┃ ┗ test.ts
 ┣ db
 ┃ ┣ connectDB.ts
 ┃ ┗ index.ts
 ┣ docs
 ┃ ┣ api-endpoint.md
 ┃ ┗ api-server.md
 ┣ interfaces
 ┃ ┣ db.ts
 ┃ ┗ index.ts
 ┣ lib
 ┃ ┣ auth
 ┃ ┃ ┣ checkTokenValidity.ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ login.ts
 ┃ ┃ ┣ refresh.ts
 ┃ ┃ ┣ register.ts
 ┃ ┃ ┗ revoke.ts
 ┃ ┣ comments
 ┃ ┃ ┣ checkOwnership.ts
 ┃ ┃ ┣ create.ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ removeItem.ts
 ┃ ┣ snippets
 ┃ ┃ ┣ checkOwnership.ts
 ┃ ┃ ┣ count.ts
 ┃ ┃ ┣ countSnippetComments.ts
 ┃ ┃ ┣ countSnippetStars.ts
 ┃ ┃ ┣ create.ts
 ┃ ┃ ┣ findAll.ts
 ┃ ┃ ┣ findAllComments.ts
 ┃ ┃ ┣ findAllStars.ts
 ┃ ┃ ┣ findOne.ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ removeItem.ts
 ┃ ┃ ┗ update.ts
 ┃ ┗ stars
 ┃ ┃ ┣ checkOwnership.ts
 ┃ ┃ ┣ create.ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ removeItem.ts
 ┣ middleware
 ┃ ┣ authenticate.ts
 ┃ ┣ authorize.ts
 ┃ ┣ error.ts
 ┃ ┣ index.ts
 ┃ ┣ ownership.ts
 ┃ ┗ validate.ts
 ┣ model
 ┃ ┣ Comment.ts
 ┃ ┣ index.ts
 ┃ ┣ Profile.ts
 ┃ ┣ Snippet.ts
 ┃ ┣ SnippetFile.ts
 ┃ ┣ StarReact.ts
 ┃ ┣ Token.ts
 ┃ ┗ User.ts
 ┣ routes
 ┃ ┣ admin.ts
 ┃ ┣ client.ts
 ┃ ┣ index.ts
 ┃ ┗ public.ts
 ┣ types
 ┃ ┗ express
 ┃ ┃ ┗ index.d.ts
 ┣ utils
 ┃ ┣ auth.ts
 ┃ ┣ combineRoutes.ts
 ┃ ┣ error.ts
 ┃ ┣ index.ts
 ┃ ┣ qs.ts
 ┃ ┣ query.ts
 ┃ ┗ validation.ts
 ┣ validation
 ┃ ┗ index.ts
 ┣ app.ts
 ┗ index.ts
```

The package root directory contains a package.json file, a src directory for source code, a tests directory for unit tests, and other files and directories that are not relevant to the project structure.

The src directory contains several subdirectories, including api, db, model, routes, lib and utils which represent different components of the backend application. Each of these subdirectories contains several files that correspond to specific functionality within that component.

The tests directory contains several test files that correspond to the functionality implemented in the src directory.

Using this structure makes it easy for developers to navigate and understand the project's organization, which can help them contribute to the project more effectively.
<br> <br>

### Creating a new route

1. In the `src/routes` directory, you will see 4 files created:
   - admin.ts [Admin Routes]
   - client.ts [Private Routes]
   - public.ts [Public Routes]
   - index.ts [Exports all the routes]

Open the file that suits your needs. For example, if you want to create a publicly accessible routes then open public.ts file.

2. Inside the file, you will see the route is already created for you and exported.

```typescript
import { Router } from "express";

const router = Router();

import { controllers as AuthController } from "../api/v1/auth";
import { controllers as SnippetController } from "../api/v1/snippets";
import { validate } from "../middleware";
import { userLoginSchema, userRegisterSchema } from "../api/v1/auth/validation";
import { refreshTokenSchema } from "../api/v1/auth/validation";
import {
  findAllSnippetSchema,
  findOneSnippetQuerySchema,
} from "../api/v1/snippets/validation";
import { paramIdSchema } from "../validation";

// Auth routes
router.post(
  "/auth/register",
  validate(userRegisterSchema),
  AuthController.register
);
```

3. Create your new route as you do normally in express.

```typescript
router.post("/test", (req, res) => console.log("Hello World"));
```

4. Your new route is ready. It is accessible in "http://localhost:4000/api/v1/public/test"

### Creating a new controller

1. In the `src/api/v1` directory, create a new directory for your controller with the name of your desired router that you want to build your controller for. If the directory already exists just go inside the directory. If you want different version, for example v2 then create a new directory v2 under `src/api` folder.

2. For our previous example with test route, Inside the `/src/api/v1` directory. we will create a directory matching our route name which is `test`.

3. Inside `src/api/v1/test` directory. we will create another directory called controllers to keep all our controllers inside that folder.

   - controllers [This folder will contain all the controller functions]

   - index.ts [This root file will export the controllers as an object]

4. Inside the controllers folder we can create controller for a specific use case. For example, I want to add a controller that sends a response of hello world. I am going to add a file name hello.ts.

```typescript
// src/api/v1/test/controllers/hello.ts
const hello = (req, res, next) => {
  res.status(200).json({
    message: "Hello world!",
  });

  export default hello;
};

// src/api/v1/test/controllers/index.ts
import hello from "./hello.ts";

export default { hello };

// src /api/v1/test/index.ts
import controllers from "./controllers.ts";

export { controllers };
```

5. Your new controller is ready.

<br>

### Create a new service

1. As we discussed above, inside `src/lib/[your router name]` directory we will also find services directory.

2. In that directory, create a new file for your service. For example,
   `hello.ts`

3. Define the service function

```typescript
// src/lib/test/hello.ts
const hello = () => console.log("hello world!");

export default hello;
```

4. Define the service from index file

```typescript
// src/lib/index.ts

import hello from "./hello";

export default { hello };
```

<br>

### Create a new test

1. In the root directory of our project, there is a directory called test which will contain all the tests for our application.

2. Inside that directory create a test with the suffix of .test.ts, for example we can create a file called hello.test.ts

3. Inside that file write a simple test:

```typescript
describe("test", () => {
  it("should check the value", () => {
    expect("safin").toBe("safin");
  });
});
```

<br>

## Conclusion

That's it! You should now have a better understanding of how this backend setup works. If you have any questions. please feel free to reach out to me.
