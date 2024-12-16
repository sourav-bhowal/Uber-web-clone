# User Registration API Documentation

## Endpoint: `/api/users/register`

### Description

This endpoint is used to register a new user.

### Method

`POST`

### URL

`/api/users/register`

### Request Body

The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `fullName` (object, required): An object containing the user's full name.
  - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastName` (string, optional): The last name of the user.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

Example:

````json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}

### Responses

#### Success
- **Status Code: 201**
- **Description:** User created successfully.
- **Response Body:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "user@example.com"
    },
    "token": "auth_token"
  }

{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}

{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
````
