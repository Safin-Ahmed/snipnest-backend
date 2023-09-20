## Backend

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

| Method | Path          | Function Name           | Description                      |
| ------ | ------------- | ----------------------- | -------------------------------- |
| GET    | /?params      | getAll                  | Get all items                    |
| GET    | /:id          | getById                 | Get by ID                        |
| POST   | /             | create                  | Create a new resource            |
| PATCH  | /:id          | updateProps             | Update few properties            |
| DELETE | /:id          | remove                  | Delete a resource                |
| ANY    | /:id/resource | methodName+resourceName | Child resources                  |
| GET    | /:id/comments | getComment              | Get comments for a given snippet |
