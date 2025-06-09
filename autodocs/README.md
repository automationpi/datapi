# DataPI - Manage Test Data for Automation

## Project Overview

**DataPI** is a lightweight, flexible service designed to manage synthetic test data for automation testing environments. It exposes RESTful APIs over HTTP, enabling automation engineers to generate and retrieve various test data dynamically without embedding data generation logic within test scripts. This approach promotes data independence, reusability, and easier maintenance, especially in complex or large-scale testing ecosystems.

### Key Features
- Generate random emails and user names
- Create unique identifiers (UUIDs)
- Generate random numbers within specified ranges
- Support for extension to include database-driven data
- Simple REST API interface for seamless integration with automation frameworks

---

## Architecture Description

**DataPI** is built with a modular structure using Node.js and Fastify, a fast and low-overhead web framework. 

### Core Components:
- **index.js**: Entry point for the server, sets up routes and server startup logic.
- **helper.js**: Contains utility data such as name lists and domain lists used for data generation.
- **API Routes**:
  - `/` : Basic health check returning a greeting.
  - `/email` : Generates random email addresses.
  - `/user` : Generates random full names with formatted capitalization.
  - Additional routes (e.g., `/random`, `/uuid`) are implemented in the test code examples.

### Dependencies:
- **fastify**: Web framework for creating REST APIs.
- **crypto** (built-in): For generating UUIDs.
- **mysql** (optional): For database-driven data in extended implementations.

---

## Installation and Setup

### Prerequisites
- Node.js version 10.0.0 or higher
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/automationpi/datapi.git
cd datapi
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables** (optional)
- For database integration, configure database connection details in your environment or within your code.

4. **Start the server**

```bash
npm start
```

The server will listen on **http://localhost:3000** by default.

---

## Usage Examples

### Basic API Endpoints

#### 1. Health Check
```bash
curl http://localhost:3000/
# Response:
# { "hello": "world" }
```

#### 2. Generate a Random Email
```bash
curl http://localhost:3000/email
# Example Response:
# { "email": "john.doe12345@yahoo.com" }
```

#### 3. Generate a Random User Name
```bash
curl http://localhost:3000/user
# Example Response:
# { "user": { "fullName": "Abandoned Able", "firstName": "Abandoned", "lastName": "Able" } }
```

#### 4. Generate a Custom Random Number (via `/random` route)
```javascript
// Example in test code:
datapi.dataHandler.get('/random', async (request, reply) => {
  var randomNumber = Math.floor(Math.random() * ((request.query.length == undefined) ? 1000 : parseInt(request.query.length))) + 1; 
  return  (JSON.stringify({random: randomNumber}));
});
```

#### 5. Generate a UUID
```javascript
// Example in test code:
const crypto = require("crypto");
const uuid = crypto.randomBytes(16).toString("hex");
console.log(uuid);
```

---

## API Documentation

| Endpoint     | Method | Description                             | Response Example                                  |
|--------------|--------|-----------------------------------------|--------------------------------------------------|
| `/`          | GET    | Basic health check                     | `{ "hello": "world" }`                            |
| `/email`     | GET    | Generate a random email address        | `{ "email": "john.doe12345@yahoo.com" }`        |
| `/user`      | GET    | Generate a random full name            | `{ "user": { "fullName": "...", "firstName": "...", "lastName": "..." } }` |

**Note:** Additional endpoints like `/random`, `/uuid`, etc., are implemented in custom test scripts and can be added to the main server as needed.

---

## Configuration Details

### `package.json`
Defines project metadata, dependencies, and scripts:
```json
{
  "name": "pidata",
  "version": "1.0.8",
  "description": "Manage test data for automation",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Naveen Alok",
  "license": "ISC",
  "dependencies": {
    "fastify": "^3.14.2"
  }
}
```

### `helper.js`
Contains static data arrays used for random name and domain generation:
```javascript
var domains = ["gmail.com","yahoo.com","outlook.com", ...];
var firstName = ["abandoned","able","absolute", ...];
var lastName = ["Smith","Johnson","Williams", ...]; // (Examples, add actual last names)
```

### Server Settings
- Default port: **3000**
- Can be modified by changing the port in `index.js`.

---

## Build and Deployment Instructions

### Building
- No build step required for Node.js runtime environment.
- For production, you may want to:
  - Use a process manager like **PM2** for uptime.
  - Set environment variables for configuration (e.g., port, database credentials).

### Deployment
- Deploy on any server with Node.js installed.
- Use Docker for containerized deployment:
  
```bash
# Example Dockerfile
FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

- Run container:
```bash
docker build -t datapi .
docker run -d -p 3000:3000 datapi
```

---

## Contributing Guidelines

- Fork the repository and clone your fork.
- Create feature branches:
  ```bash
  git checkout -b feature/your-feature
  ```
- Implement your changes, ensure code quality.
- Write tests for new functionality (if applicable).
- Submit a pull request with descriptive commit messages.

**Note:** For larger changes, discuss via issues or PR discussions before implementation.

---

## Troubleshooting

| Issue                                    | Solution                                                   |
|------------------------------------------|--------------------------------------------------------------|
| Server not starting or crashes          | Check for port conflicts; ensure Node.js version >=10       |
| Missing dependencies                     | Run `npm install` in project directory                       |
| API responses are empty or incorrect     | Verify helper data arrays are populated correctly           |
| Connection errors (e.g., database)       | Ensure database credentials are correct and database is running |

---

## Additional Notes

- The current implementation provides core endpoints for generating random names, emails, and UUIDs.
- You can extend the API by adding new routes in `index.js`.
- For database-driven data, incorporate database connection logic as shown in the test code snippets.
- Security considerations:
  - For production, implement authentication if exposing sensitive data.
  - Validate and sanitize input parameters.

---

## Summary

**DataPI** offers an efficient way to generate and manage synthetic test data via RESTful APIs, promoting data independence and simplifying test automation workflows. Its modular design allows easy extension and integration into various test environments.

---

**For more information, visit the [GitHub Repository](https://github.com/automationpi/datapi).**