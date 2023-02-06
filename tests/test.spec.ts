import { validateId, validateRequest, validateUsernameAndPassworwd } from '../src/Utils/RequestValidation';
import { JwtChecker } from '../src/Utils/RequestValidation';
import { UserService } from '../src/Services/UserService';
import { ServiceResponse } from '../src/Utils/ServiceResponse';
import { RES_TYPE } from '../src/Utils/ServiceResponse';

describe('Validate Id', () => {
    test('should return true for valid id', () => {
        expect(validateId('123')).toBe(true);
    });

    test('should return false for invalid id', () => {
        expect(validateId('abc')).toBe(false);
    });
});

describe('Validate Request', () => {
    test('should return true when params are valid', () => {
        expect(validateRequest(['123', 'abc'])).toBe(true);
    });
});

describe('Validate Username And Password', () => {
    test('should return true when username and password are provided', () => {
        expect(validateUsernameAndPassworwd('username', 'password')).toBe(true);
    });

    test('should return false when username and password are not provided', () => {
        expect(validateUsernameAndPassworwd('', '')).toBe(false);
    });
});

describe('JwtChecker', () => {
    test('should return true when token is valid and userid is not equal', () => {
        expect(JwtChecker({ Role: 0, UserId: 1 }, 2)).toBe(true);
    });

    test('should return false when token is valid and userid is equal', () => {
        expect(JwtChecker({ Role: 0, UserId: 1 }, 1)).toBe(false);
    });
});