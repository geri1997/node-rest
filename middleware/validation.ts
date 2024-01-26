import { NextFunction, Request, Response } from 'express';
import { RequestBody } from '../types';
import { FeatureEnum } from "../feature.enum";

export function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // or use a library like class-validator
    const errors: string[] = [];

    const { minNumber, maxNumber, feature }: RequestBody = req.body;

    if (!isValidMinNumber(minNumber)) {
        errors.push('minNumber must be an integer greater than 0!');
    }

    if (!isValidMaxNumber(maxNumber, minNumber)) {
        errors.push('maxNumber must be an integer greater than minNumber!');
    }

    if (!isValidFeatureArray(feature)) {
        errors.push(
            'feature must be a non-empty array containing only the values "palindrome" and/or "prime".'
        );
    }

    if (errors.length > 0) {
        res.status(400).send({ errors });
        return;
    }
    next();
}

export function isValidMinNumber(number: number) {
    return Number.isInteger(number) && number > 0
}

export function isValidMaxNumber(maxNumber: number, minNumber: number) {
    return Number.isInteger(maxNumber) && maxNumber > minNumber
}

export function isValidFeatureArray(array: Array<any>): boolean {
    if (
        !Array.isArray(array) ||
        array.length === 0
    ) {
        return false
    }

    if (
        array.length === 1 &&
        (array.includes(FeatureEnum.PALINDROME) ||
            array.includes(FeatureEnum.PRIME))
    ) {
        return true;
    }

    if (
        array.length === 2 &&
        array.includes(FeatureEnum.PALINDROME) &&
        array.includes(FeatureEnum.PRIME)
    ) {
        return true;
    }

    return false;
}

