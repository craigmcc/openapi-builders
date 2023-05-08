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
 * Throw a DuplicateError if the specified field is already defined.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field being checked
 */
export function checkDuplicate(name: string, object: object, field: string): void {
    if (object.hasOwnProperty(field)) {
        throw new DuplicateError(`${name} already has field '${field}'`);
    }
}

/**
 * Throw ValueError if the specified value is an empty array.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field being checked
 * @param values Proposed array of values being checked
 */
export function checkEmpty(name: string, object: object, field: string, values: any[]): void {
    if (values.length === 0) {
        throw new ValueError(`${name} cannot accept an empty '${field}' array`);
    }
}

/**
 * Throw an ExclusiveError if a value is being proposed but there is an existing
 * value of a different field that is mutually exclusive.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param fieldNew Name of the new field being configured
 * @param fieldOld Name of the old field that cannot already be configurea
 */
export function checkExclusive(name: string, object: any, fieldNew: string, fieldOld: string) : void {
    if (object.hasOwnProperty(fieldOld)) {
        throw new ExclusiveError(`${name} already has field '${fieldOld}' so cannot add field '${fieldNew}'`)
    }
}

/**
 * Throws DuplicateError if the specified Array already contains the specified value.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field being checked (an Array)
 * @param value Value to be checked
 */
export function checkArray(name: string, object: any, field: string, value: any): void {
    const array = object.get(field) as Array<any>;
    array.forEach(item => {
        if (item.deepEqual(value)) {
            throw new DuplicateError(`${name} '${field}' array already has value '${value}'`);
        }
    })
}

/**
 * Throws DuplicateError if the specified Map already contains the specified key.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field being checked (a Map)
 * @param key Key value to be checked
 */
export function checkMap(name: string, object: any, field: string, key: any): void {
    const map = object.get(field) as Map<any, any>;
    if (map.has(key)) {
        throw new DuplicateError(`${name} '${field}' map already has key '${key}'`);
    }
}

/**
 * Throws a ValueError if the specified value is not a valid URL.
 *
 * @param name Name of the configuration object being checked
 * @param object Configuration object being checked
 * @param field Name of the field being checked
 * @param value Proposed new value
 */
export function checkURL(name: string, object: any, field: string, value: string): void {
    try {
        new URL(value);
    } catch (error) {
        throw new ValueError(`${name} '${field}' must be a valid URL`);
    }
}

