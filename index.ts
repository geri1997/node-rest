import express, { Request, Response } from 'express';
import { RequestBody } from './types';
import { FeatureEnum } from './feature.enum';
import { isPalindrome, isPrime } from './service';
import { validationMiddleware } from './middleware/validation';
import helmet from "helmet";
import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import { rateLimitMiddleware } from "./middleware/rate-limiter";

const HTTPS_PORT = 3000;
const HTTP_PORT = 80;

const options = {
    key: fs.readFileSync('./cert/localhost.key'),
    cert: fs.readFileSync('./cert/localhost.crt')
};

const app = express();

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect(307, `https://${req.hostname}:${HTTPS_PORT}${req.url}`);
    }
});

http.createServer(app).listen(HTTP_PORT);
const server = https.createServer(options, app);

app.use(express.json());
app.use(helmet());
app.use(rateLimitMiddleware)

app.post('/', validationMiddleware, (req: Request, res: Response) => {
    const { minNumber, maxNumber, feature }: RequestBody = req.body;

    const data: number[] = [];
    const start = performance.now();
    if (
        feature.includes(FeatureEnum.PALINDROME) &&
        feature.includes(FeatureEnum.PRIME)
    ) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPalindrome(i) && isPrime(i)) {
                data.push(i);
            }
        }
    } else if (feature.includes(FeatureEnum.PALINDROME)) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPalindrome(i)) {
                data.push(i);
            }
        }
    } else if (feature.includes(FeatureEnum.PRIME)) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPrime(i)) {
                data.push(i);
            }
        }
    }

    const end = performance.now();
    res.send({ data, timeOfExecution: end - start });
});



server.listen(HTTPS_PORT, () => {
    console.log(`Server successfully started at port ${HTTPS_PORT}!`);
});
