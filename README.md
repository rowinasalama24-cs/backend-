# Book API

A RESTful API for managing books using Node.js, Express.js, and MongoDB.

## Features

- Create a new book
- Get all books
- Get a book by ID
- Update a book
- Delete a book
- Upload book images using Multer
- Store uploaded image paths with book data in MongoDB
- Test API endpoints using Postman

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Postman

## How to Run

1. Install the project dependencies:

   npm install

2. Create a `.env` file and add the required environment variables.

3. Start the server:

   node index.js

4. The API will run on:

   http://localhost:3000

## API Usage Examples

### Create Book
Send a POST request to create a new book.  
Use `form-data` and provide the book information along with an image file.

### Get All Books
Send a GET request to retrieve all books.

### Get Book By ID
Send a GET request with the book ID to retrieve a specific book.

### Update Book
Send a PATCH request with the book ID.  
Use `form-data` to update book information and optionally upload a new image.

### Delete Book
Send a DELETE request with the book ID to remove a book.

## File Upload

Book images are uploaded using Multer and stored in the `uploads` folder.

The image path is saved with the book data in MongoDB.


## Authentication

The API uses JWT authentication.

### Signup
Create a new user using:
POST /api/v1/auth/signup

### Login
Login using:
POST /api/v1/auth/login

The login response returns a JWT token.

Protected book routes require the token in the Authorization header:

Authorization: Bearer <token>