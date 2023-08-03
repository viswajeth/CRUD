# CRUD API with Serverless MongoDB and Google Sheets Integration
This is a simple Node.js CRUD (Create, Read, Update, Delete) API that leverages a serverless MongoDB instance to store user data and integrates with Google Sheets to fetch and update data.
## Introduction
Managing and persisting data is a fundamental aspect of most applications, and this project aims to demonstrate how to build a RESTful API in Node.js that performs CRUD operations using MongoDB as the database, while also integrating with Google Sheets for data input and retrieval.
### Why Serverless MongoDB?

A serverless MongoDB instance allows us to focus on building the API and managing the application logic without worrying about server maintenance. It offers a flexible and scalable solution without the need to manage database servers.

### Why Google Sheets Integration?

Google Sheets provides an accessible and user-friendly interface for data entry and visualization. By integrating Google Sheets with our API, we enable non-developers to interact with our application and easily update and manage user data.

### Features
- **Create User:** Allows you to create a new user by reading data from cells A3 to F3 in the specified Google Sheet and storing the user object in MongoDB.

- **Delete User:** Deletes a user from MongoDB based on the provided user ID in cell A7 of the Google Sheet.

- **Update User:** Updates an existing user in MongoDB based on the provided user ID in cell A13 of the Google Sheet, by reading data from cells A13 to F13.

- **Read All Users:** Fetches all user objects from MongoDB and populates them in the Google Sheet, starting from row 19.

### Prerequisites

Before getting started, ensure you have the following:

- Node.js (version >= 12)
- npm
- MongoDB Atlas account
- Google Sheet API credentials (Service Account key)

### Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB ORM)
- Google Sheets API
- MongoDB Atlas
  
### Bug Reports and Feedback

Please don't hesitate to report any issues or bugs you encounter while using the API. Your feedback is valuable in enhancing the project.

License This project is released under the MIT License. You are more than welcome to use, modify, and distribute the code according to the license terms.

### About Me

I am a passionate developer enthusiastic about exploring new technologies and building practical applications. I created this project to share my knowledge and contribute to the developer community.

Thank you for visiting my GitHub repository. I hope you find this project helpful and informative. If you have any questions or suggestions, please feel free to reach out to me.

Happy coding!

**VISWAJETH T S R**
