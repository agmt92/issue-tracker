# Issue Tracker

This project is the first exam of the freeCodeCamp Quality Assurance curriculum. It is an issue tracker application built using Node.js, Express, and MongoDB. The application allows users to create, read, update, and delete issues for different projects.

You can view the live demo of the project [here](https://tranquil-bayou-97588-ed0d7e6ffb37.herokuapp.com/).

## Table of Contents

- Introduction
- Features
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- Usage
- [Project Structure](#project-structure)
- Troubleshooting
- Contributing
- License

## Introduction

The Issue Tracker is a web application that provides a simple interface for managing issues in different projects. It is built using Node.js for the backend, Express for the web framework, and MongoDB for the database. This project is part of the freeCodeCamp Quality Assurance curriculum.

## Features

- **Create Issues**: Add new issues to a project.
- **Read Issues**: View issues for a specific project.
- **Update Issues**: Modify existing issues.
- **Delete Issues**: Remove issues from a project.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling tool.
- **Chai**: Assertion library for Node.js.
- **Chai-HTTP**: HTTP integration testing with Chai assertions.
- **Mocha**: Test framework for Node.js.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.
- **dotenv**: Module to load environment variables from a `.env` file.

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/freeCodeCamp/boilerplate-project-issuetracker.git
    cd boilerplate-project-issuetracker
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Copy the `sample.env` file to `.env`:
        ```bash
        cp sample.env .env
        ```
    - Set the variables in the `.env` file appropriately including database variables appropriatly.

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Run the tests**:
    - To run the tests automatically, add `NODE_ENV=test` in your `.env` file.
    - To run the tests in the console, use the command:
        ```bash
        npm run test
        ```

## Usage

- **Create Issues**: Use the `/api/issues/:project` endpoint to create new issues.
- **Read Issues**: Use the `/api/issues/:project` endpoint to view issues for a specific project.
- **Update Issues**: Use the `/api/issues/:project` endpoint to modify existing issues.
- **Delete Issues**: Use the `/api/issues/:project` endpoint to remove issues from a project.

## Project Structure

```
issue-tracker/
│
├── routes/                 # API routes
│   ├── api.js              # API route handlers
│   └── ...
│
├── tests/                  # Test files
│   ├── 2_functional-tests.js # Functional tests
│   └── ...
│
├── server.js               # Entry point of the application
├── mongoose-connect.js     # MongoDB connection setup
├── models.js               # Mongoose schemas and models
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Troubleshooting

If you encounter any issues while running the project, here are some steps you can take:

1. **Check the logs**: Review the logs in the console for any error messages.
2. **Verify environment variables**: Ensure that all required environment variables are set correctly in the `.env` file.
3. **Restart the server**: Sometimes, restarting the server can resolve issues:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
Exam code at this [link]9https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker)

---

Thank you for checking out my Issue Tracker project! If you have any questions or feedback, feel free to reach out.


