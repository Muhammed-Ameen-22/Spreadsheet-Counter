
# SPREADSHEET COUNTER




## Prerequisites

Install all the node modules required using package.json

```bash
  npm install
```

Start the MongoDB server

Create a .env file and add the below details in server directory

```bash
SERVER_PORT = < PORT WHERE THIS API SHOULD BE RUNNING>
MONGO_DB_URL =  <URL OF YOUR MONGO DB SERVER>
JWT_SECRET = <SECRET CODE FOR GENERATING JWT>
GOOGLE_CLIENT_ID=<CLIENT ID OF YOUR OAUTH 2.0 CLIENT>
```

Create a .env file and add the below details in client directory

```bash
REACT_APP_SERVER_URL = < URL WHERE THE CLIENT RUNS>
GOOGLE_CLIENT_ID=<CLIENT ID OF YOUR OAUTH 2.0 CLIENT>
```

## Deployment

To start the client ans server

```bash
  npm start
```



