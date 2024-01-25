import { NextFunction, Request, Response } from 'express';
import { isValidFeatureArray } from './service';
import { RequestBody } from './types';

export function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
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
        !isValidFeatureArray(feature)
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
