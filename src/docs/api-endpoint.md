# All Public API Endpoints

Base: /api/v1/
Public: Base/public
Private: Base/private
Admin: Base/admin

#### No Restriction APIs

** Authentication **
`GET` `Public/auth/register?query=params` `(register new user with credentials)`
`GET` `Public/auth/login` `(logs in existing user by sending accessToken and Refresh Token)`
`GET` `Public/auth/token/refresh` `(Refresh access tokens by providing a refresh token)`
`GET` `Public/auth/token/validate` `(check the validity of a refresh token)`

** Profiles **
`GET` `Public/profiles` `(load all important properties of profiles)`
`GET` `Public/profiles/{id}` `(Load details of a profile)`

** Snippets **

`GET` `Public/snippets` `(load all snippets)`
`GET` `Public/snippets/{id}` `(load a specific snippet)`
`GET` `Public/snippets/{id}/comments` `(load all comments for a specific snippet)`
`GET` `Public/snippets/{id}/stars` `(load all stars for a specific snippet)`

** Snippet Files **
`GET` `Public/snippets/files` `(load all snippet files)`
`GET` `Public/snippets/files/{id}` `(load specific snippet file)`

#### Restricted APIs

** Authentication **
`GET` `Private/auth/token/revoke` `(Revoke a refresh token)`

** Users **
`POST` `Private/users` `(Create an user)`
`PATCH` `Private/users/{id}` `(Update an user)`
`DELETE` `Private/users/{id}` `(Delete an user)`

** Profiles **
`POST` `Private/profiles` `(Create a profile)`
`PATCH` `Private/profiles/{id}` `(Update a profile)`
`DELETE` `Private/profiles/{id}` `(Delete a profile)`

** Snippets **

`POST` `Private/snippets` `(Create a snippet)`
`PATCH` `Private/snippets/{id}` `(Update a snippet)`
`DELETE` `Private/snippets/{id}` `(Delete a snippet)`
`POST` `Private/snippets/{id}/comments` `(Add a comment for a snippet)`
`POST` `Private/snippets/{id}/stars` `(Add a star for a snippet)`

** Snippet Files **
`POST` `Private/snippets/files` `(Create a snippet file)`
`PATCH` `Private/snippets/files/{id}` `(Update a snippet file)`
`DELETE` `Private/snippets/files/{id}` `(Delete a snippet file)`

** Comments **
`POST` `Private/comments/{id}` `(Create a comment)`
`PATCH` `Private/comments/{id}` `(Update a comment)`
`DELETE` `Private/comments/{id}` `(Delete a comment)`

** Stars **
`POST` `Private/stars/{id}` `(Create a star)`
`PATCH` `Private/stars/{id}` `(Update a star)`
`DELETE` `Private/stars/{id}` `(Delete a star)`

#### Admin APIs

** Users **
`GET` `Admin/users` `(Create an user)`
`POST` `Admin/users` `(GET an user)`
`GET` `Admin/users/{id}` `(Get a specific user)`

** Comments **
`GET` `Admin/comments` `(Gets all comments)`
`POST` `Admin/comments` `(Create a comment)`

** Stars **
`GET` `Admin/stars` `(Gets all stars)`
`POST` `Admin/stars` `(Create a star)`
