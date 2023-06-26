# AgProPool Server

AgProPool app backend

## Functionalities

The project includes the following functionalities:

- Admin, Farmer, farmer agent, and mediator registration.
- Kebele and crop registration.
- Saving transaction data.

## Environment Variables

To run this project, you will need to add the following environment variables in server directory to your .env file

```bash
    PORT = "Server Running PORT"
    MONGO_URI = "MongoDB URL (local or from mongo atlas)"
    JWT_SECRET = "Secret for JWT token"
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Yared29/AgProPool-server.git
```

Go to the project directory

```bash
  cd AgProPool-server
```

Install dependencies

```bash
  npm install
```

Or

```bash
  yarn
```

To start the server

```bash
  npm run server
```

Or

```bash
  yarn run dev
```

## Tech Stack

**Runtime Env:** NodeJS

**Database:** MongoDB

**Encryption:** Bcryptjs

**RESTful APIs Build:** Express
