// ContactObjectBuilder.test.ts

// External Modules ----------------------------------------------------------

import {LICENSE_NAME} from "./LicenseObjectBuilder.test";

const chai = require("chai");
const expect = chai.expect;

// Internal Modules ----------------------------------------------------------

import {ContactObject} from "./types";
import {ContactObjectBuilder} from "./Builders";
import {DuplicateError, ValueError} from "./Errors";

// Test Data -----------------------------------------------------------------

export const CONTACT_EMAIL = "fred@example.com";
export const CONTACT_NAME = "Fred Flintstone";
export const CONTACT_URL = "https://example.com/fred";

export function makeContactObject(): ContactObject {
    return new ContactObjectBuilder()
        .email(CONTACT_EMAIL)
        .name(CONTACT_NAME)
        .url(CONTACT_URL)
        .build();
}

// Test Suites ---------------------------------------------------------------

describe("ContactObjectBuilder (3.1.0)", () => {

    it("should create a maximal ContactObject", () => {
        const contact = makeContactObject();
        expect(contact.email).to.equal(CONTACT_EMAIL);
        expect(contact.name).to.equal(CONTACT_NAME);
        expect(contact.url).to.equal(CONTACT_URL);
    });

    it("should create a minimal ContactObject", () => {
        const contact = new ContactObjectBuilder().build();
        expect(contact.email).to.be.undefined;
        expect(contact.name).to.be.undefined;
        expect(contact.url).to.be.undefined;
    });

    it("should fail on duplicate email", () => {
        try {
            const contact = new ContactObjectBuilder()
                .email(CONTACT_EMAIL)
                .email("Second Email")
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`ContactObject already has email '${CONTACT_EMAIL}'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate name", () => {
        try {
            const contact = new ContactObjectBuilder()
                .name(CONTACT_NAME)
                .name("Second Name")
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`ContactObject already has name '${CONTACT_NAME}'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate url", () => {
        try {
            const contact = new ContactObjectBuilder()
                .url(CONTACT_URL)
                .url("Second URL")
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`ContactObject already has url '${CONTACT_URL}'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on invalid url", () => {
        try {
            const info = new ContactObjectBuilder()
                .url("not a URL")
                .build();
            expect.fail("Should have thrown ValueError");
        } catch (error) {
            if (error instanceof ValueError) {
                expect(error.message).to.equal(`ContactObject url must be a valid URL`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

});
