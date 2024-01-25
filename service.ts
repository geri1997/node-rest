import { FeatureEnum } from './feature.enum';

export function isPrime(number: number): boolean {
    if (number === 1 || number === 2) return true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

export function isPalindrome(number: number): boolean {
    return Number(number.toString().split('').reverse().join('')) === number;
}

export function isValidFeatureArray(array: Array<any>): boolean {
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
