# Requirements

- NodeJs version >= 18
- Docker (optional, for containerized startup)
- SSL Certificate (a test certificate has been provided inside the `cert` folder. In production, replace it with your own certificate)

# Build & Run locally

    npm install
    npm run tsc
    npm start

# Build & Run using Docker

## Dockerfile

In the root directory run:

    docker build -t node-rest .
    docker run -it -p 3000:3000 -p 80:80 node-rest 

## Docker compose

In the root directory run:

    docker compose build
    docker compose up

# Security features

- HTTPS
- HTTP Security Headers with `Helmet`
- Rate limiting
- Input validation

# How to use

When running locally or with Docker, the server starts at port `3000`. To send requests you can use a tool like Postman.

The application has only one `POST` endpoint at path `/`. The request body must have 3 parameters

- `minNumber` - minimum number
- `maxNumber` - maximum number
- `feature` -  array of `"prime"` and/or `"palindrome"`

Requests can be sent to `http://localhost` or `https://localhost:3000`. The requests to the
 http endpoint will be redirected to the https endpoint.



## Example API requests

### Example 1 - Primes

Sending a `POST` request to `https://localhost:3000` with request body:

    {
        "minNumber":1,
        "maxNumber":13,
        "feature":["prime"]
    }


You should receive a response with status code `200` and body as below: 

    {
        "data": [
            2,
            3,
            5,
            7,
            11
        ],
        "timeOfExecution": 0.03970000147819519
    }

The numbers in `data` are all the primes between `minNumber` and `maxNumber`(exclusive). 
`1` is not included in the response because it is not considered a prime.

### Example 2 - Palindrome and Prime

Sending a `POST` request to `https://localhost:3000` with request body:

    {
        "minNumber":1,
        "maxNumber":15,
        "feature":["palindrome", "prime"]
    }


You should receive a response with status code `200` and body as below: 

    {
        "data": [
            2,
            3,
            5,
            7,
            11
        ],
        "timeOfExecution": 0.0276999999769032
    }

`1` is not included in the response because it is not considered a prime, and `13` is not included because it is not a palindrome.

### Example 3 - Invalid Request

Sending a `POST` request to `https://localhost:3000` with request body:

    {
        "minNumber":-1,
        "maxNumber":15,
        "feature":["test", "prime"]
    }


You should receive a response with status code `400` and body as below: 

    
    {
        "errors": [
            "minNumber must be an integer greater than 0!",
            "feature must be a non-empty array containing only the values \"palindrome\" and/or \"prime\"."
        ]
    }

On an invalid request, descriptive errors are returned.
