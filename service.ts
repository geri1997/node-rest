
export function isPrime(number: number): boolean {
    // could add validation for internal calls
    if (number < 2) { return false }

    if (number === 2) {
        return true;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

export function isPalindrome(number: number): boolean {
    // could add validation for internal calls
    return Number(number.toString().split('').reverse().join('')) === number;
}
