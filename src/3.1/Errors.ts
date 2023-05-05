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
 * Throw ValueError if the specified value is an empty array.
 *
 * @param object Name of the configuration object being checked
 * @param field Name of the field being checked
 * @param values Proposed array of values being checked
 */
export function checkEmpty(object: string, field: string, values: any[]): void {
    if (values.length === 0) {
        throw new ValueError(`${object} cannot accept an empty ${field} array`);
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
 * Throws DuplicateError if the specified (target) object already contains
 * a property with the specified name.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field to be checked
 */
export function checkField(name: string, object: any, field: string): void {
    if (object.has(field)) {
        throw new DuplicateError(`${name} already has a '${field} value`);
    }
}

/**
 * Throws DuplicateError if the specified Map already contains the specified key.
 *
 * @param object Name of the configuration object being checked
 * @param field Name of the field being checked
 * @param map Map being checked
 * @param key Key value to be checked
 */
export function checkMap(object: string, field: string, map: Map<any, any>, key: any): void {
    if (map.has(key)) {
        throw new DuplicateError(`${object} ${field} already has key ${key}`)
    }
}

/**
 * Throws a ValueError if the specified value is not a valid URL.
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

