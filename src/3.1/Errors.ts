// Errors.ts

/**
 * Error objects thrown by the various builders, plus helpers.
 *
 * @packageDocumentation
 */

// Error Classes -------------------------------------------------------------

export class DuplicateError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ExclusiveError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ValueError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Error Helpers -------------------------------------------------------------

/**
 * Throw a DuplicateError if the specified value is already defined.
 *
 * @param object Name of the configuration object being checked
 * @param field Name of the field being checked
 * @param value Existing value of this field in the configuration object
 */
export function checkDuplicate(object: string, field: string, value: any): void {
    if (value) {
        const current = (typeof value === "string") ? value : JSON.stringify(value);
        throw new DuplicateError(`${object} already has ${field} '${current}'`);
    }
}

/**
 * Throw an ExclusiveError if a value is being proposed but there is an existing
 * value of a different field that is mutually exclusive.
 *
 * @param object Name of the configuration object being checked
 * @param field1 Name of the field with the proposed new value
 * @param value1 Proposed new value
 * @param field2 Name of the potentially conflicting field
 * @param value2 Existing value of the potentially conflicting field
 */
export function checkExclusive(object: string, field1: string, value1: any, field2: string, value2: any) : void {
    if (value1 && value2) {
        // field1 is the proposed new value1, field2 is the existing value2
        throw new ExclusiveError(`${object} cannot have both ${field2} and ${field1}`);
    }
}

/**
 * Throws a ValueError if the specified value is not a valud URL.
 *
 * @param object Name of the configuration object being checked
 * @param field Name of the field being checked
 * @param value Proposed new value
 */
export function checkURL(object: string, field: string, value: string): void {
    try {
        new URL(value);
    } catch (error) {
        throw new ValueError(`${object} ${field} must be a valid URL`);
    }
}

