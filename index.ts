import express, { Request, Response } from 'express';
import { RequestBody } from './types';
import { FeatureEnum } from './feature.enum';
import { isPalindrome, isPrime } from './service';
import { validationMiddleware } from './middleware';

const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/', validationMiddleware, (req: Request, res: Response) => {
    const { minNumber, maxNumber, feature }: RequestBody = req.body;

    const data: number[] = [];
    const start = performance.now();
    if (
        feature.includes(FeatureEnum.PALINDROME) &&
        feature.includes(FeatureEnum.PRIME)
    ) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPalindrome(i) && isPrime(i)) data.push(i);
        }
    } else if (feature.includes(FeatureEnum.PALINDROME)) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPalindrome(i)) data.push(i);
        }
    } else if (feature.includes(FeatureEnum.PRIME)) {
        for (let i = minNumber; i < maxNumber; i++) {
            if (isPrime(i)) data.push(i);
        }
    }

    const end = performance.now();

    res.send({ data, timeOfExecution: end - start });
});

app.listen(PORT, () => {
    console.log(`Server successfully started at port ${PORT}!`);
});
