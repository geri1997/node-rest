import { isPalindrome, isPrime, isValidFeatureArray } from './service';

test('Sanity check', () => {
    expect(true).toBe(true);
});

describe('isPrime', () => {
    test('should return true if number is prime', () => {
        expect(isPrime(1)).toBe(true);
    });

    test('should return true if number is prime', () => {
        expect(isPrime(3)).toBe(true);
    });

    test('should return false if number is not prime', () => {
        expect(isPrime(8)).toBe(false);
    });
});

describe('isPalindrome', () => {
    test('should return true if number is palindrome', () => {
        expect(isPalindrome(6556)).toBe(true);
    });

    test('should return false if number is not palindrome', () => {
        expect(isPalindrome(657856)).toBe(false);
    });
});

describe('isValidFeatureArray', () => { 
    test('should return true if array is valid feature array', () => { 
        expect(isValidFeatureArray([]))
     })
 })
