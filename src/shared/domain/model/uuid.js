import { v7 as uuidv7, validate as uuidValidate } from 'uuid';

/**
 * Generates a new UUID (version 7).
 * @returns {string} A newly generated UUID string.
 */
export function generateUuid() {
    return uuidv7();
}

/**
 * Validates whether a given value is a valid UUID.
 * @param value - The value to validate as a UUID.
 * @returns {boolean} True if the value is a valid UUID, false otherwise.
 */
export function validateUuid(value) {
    return uuidValidate(value);
}