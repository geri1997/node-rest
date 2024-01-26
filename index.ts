import express, { Request, Response } from 'express';
import { RequestBody } from './types';
import { FeatureEnum } from './feature.enum';
import { isPalindrome, isPrime } from './service';
import { validationMiddleware } from './middleware';
import helmet from "helmet";
import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'

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
        res.redirect(307, `https://${req.hostname}:3000${req.url}`);
    }
});

http.createServer(app).listen(80);
const server = https.createServer(options, app);

app.use(express.json());
app.use(helmet());

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


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server successfully started at port ${PORT}!`);
});
