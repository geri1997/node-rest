import express, { NextFunction, Request, Response } from 'express';
import { RequestBody } from './types';
import { FeatureEnum } from './feature.enum';

const app = express();
app.use(express.json());
const PORT = 3003;

app.post('/', validationMiddleware, (req, res) => {
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

function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    // or use a library like class-validator
    const errors: string[] = [];

    const { minNumber, maxNumber, feature }: RequestBody = req.body;

    if (!Number.isInteger(minNumber) || minNumber < 1)
        errors.push('minNumber must be an integer greater than 0!');

    if (!Number.isInteger(maxNumber) || maxNumber <= minNumber)
        errors.push('maxNumber must be an integer greater than minNumber!');

    if (
        !Array.isArray(feature) ||
        feature.length === 0 ||
        !isValidArray(feature)
    )
        errors.push(
            'feature must be a non-empty array containing only the values "palindrome" and/or "prime".'
        );

    if (errors.length > 0) {
        res.send(errors);
        return;
    }
    next();
}

function isPrime(number: number): boolean {
    if (number === 1 || number === 2) return true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function isPalindrome(number: number): boolean {
    return Number(number.toString().split('').reverse().join('')) === number;
}

function isValidArray(array: Array<any>): boolean {
    if (
        array.length === 1 &&
        (array.includes(FeatureEnum.PALINDROME) ||
            array.includes(FeatureEnum.PRIME))
    )
        return true;

    if (
        array.length === 2 &&
        array.includes(FeatureEnum.PALINDROME) &&
        array.includes(FeatureEnum.PRIME)
    )
        return true;

    return false;
}

app.listen(PORT, () => {
    console.log(`Server successfully started at port ${PORT}!`);
});
