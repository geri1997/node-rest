import request from 'supertest';
import { FeatureEnum } from "./feature.enum";
import { isValidFeatureArray, isValidMaxNumber, isValidMinNumber, validationMiddleware } from "./middleware";
import { isPalindrome, isPrime } from './service';

describe('check if number is prime', () => {
    test('should return false for 1', () => {
        expect(isPrime(1)).toBe(false);
    });

    test('should return true for 2', () => {
        expect(isPrime(2)).toBe(true);
    });

    test('should return true for 3', () => {
        expect(isPrime(3)).toBe(true);
    });

    test('should return false for 8', () => {
        expect(isPrime(8)).toBe(false);
    });

    test('should return false if square root is prime factor', () => {
        expect(isPrime(9)).toBe(false);
    });

});

describe('check if number is palindrome', () => {
    test('should return true if number is single digit', () => {
        expect(isPalindrome(1)).toBe(true);
    });

    test('should return true if number is palindrome', () => {
        expect(isPalindrome(6556)).toBe(true);
    });

    test('should return false if number is not palindrome', () => {
        expect(isPalindrome(657856)).toBe(false);
    });
});




describe('Validate min number', () => {
    test('should return true for positive integer', () => {
        expect(isValidMinNumber(1)).toBe(true)
    })

    test('should return false for 0', () => {
        expect(isValidMinNumber(0)).toBe(false)
    })

    test('should return false for negative integer', () => {
        expect(isValidMinNumber(-3)).toBe(false)
    })

    test('should return false for floats', () => {
        expect(isValidMinNumber(10.5)).toBe(false)
    })

})

describe('Validate max number', () => {
    test('should return true for maxNumber greater than minNumber', () => {
        expect(isValidMaxNumber(10, 1)).toBe(true)
    })

    test('should return false for maxNumber lesser than minNumber', () => {
        expect(isValidMaxNumber(10, 20)).toBe(false)
    })

    test('should return false for maxNumber same as minNumber', () => {
        expect(isValidMaxNumber(10, 10)).toBe(false)
    })

    test('should return false for float maxNumber', () => {
        expect(isValidMaxNumber(10.5, 2)).toBe(false)
    })
})

describe('isValidFeatureArray', () => {
    test('should return true if array contains only "palindrome"', () => {
        expect(isValidFeatureArray([FeatureEnum.PALINDROME])).toBe(true)
    })

    test('should return true if array contains only "prime"', () => {
        expect(isValidFeatureArray([FeatureEnum.PRIME])).toBe(true)
    })

    test('should return true if array contains "prime" and "palindrome"', () => {
        expect(isValidFeatureArray([FeatureEnum.PRIME, FeatureEnum.PALINDROME])).toBe(true)
    })

    test('should return false for empty array', () => {
        expect(isValidFeatureArray([])).toBe(false)
    })

    test('should return false for array with invalid values', () => {
        expect(isValidFeatureArray([123, "34"])).toBe(false)
    })

    test('should return false for array with too many values', () => {
        expect(isValidFeatureArray([FeatureEnum.PRIME, FeatureEnum.PALINDROME, FeatureEnum.PALINDROME])).toBe(false)
    })

})