// InfoObjectBuilder.test.ts

// External Modules ----------------------------------------------------------

import {InfoObject} from "./types";

const chai = require("chai");
const expect = chai.expect;

// Internal Modules ----------------------------------------------------------

import {InfoObjectBuilder} from "./Builders";
import {makeContactObject} from "./ContactObjectBuilder.test";
import {DuplicateError, ValueError} from "./Errors";
import {makeLicenseObject} from "./LicenseObjectBuilder.test";

// Test Data -----------------------------------------------------------------

export const INFO_CONTACT = makeContactObject();
export const INFO_DESCRIPTION = "This is an interesting application";
export const INFO_LICENSE = makeLicenseObject();
export const INFO_SUMMARY = "Application summary";
export const INFO_TERMS_OF_SERVICE = "https://example.com/terms";
export const INFO_TITLE = "Test API";
export const INFO_VERSION = "1.2.3";

export function makeInfoObject(): InfoObject {
    return new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
        .contact(INFO_CONTACT)
        .description(INFO_DESCRIPTION)
        .license(INFO_LICENSE)
        .summary(INFO_SUMMARY)
        .termsOfService(INFO_TERMS_OF_SERVICE)
        .build();
}

// Test Suites ---------------------------------------------------------------

describe("InfoObjectBuilder (3.1.0)", () => {

    it("should create a maximal InfoObject", () => {
        const info = makeInfoObject();
        expect(info.contact).to.deep.equal(INFO_CONTACT);
        expect(info.description).to.equal(INFO_DESCRIPTION);
        expect(info.summary).to.equal(INFO_SUMMARY);
        expect(info.termsOfService).to.equal(INFO_TERMS_OF_SERVICE);
        expect(info.title).to.equal(INFO_TITLE);
        expect(info.version).to.equal(INFO_VERSION);
    });

    it("should create a minimal InfoObject", () => {
        const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
            .build();
        expect(info.contact).to.be.undefined;
        expect(info.description).to.be.undefined;
        expect(info.license).to.be.undefined;
        expect(info.summary).to.be.undefined;
        expect(info.termsOfService).to.be.undefined;
        expect(info.title).to.equal(INFO_TITLE);
        expect(info.version).to.equal(INFO_VERSION);
    });

    it("should fail on duplicate contact", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .contact(INFO_CONTACT)
                .contact(INFO_CONTACT)
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`InfoObject already has field 'contact'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate description", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .description(INFO_DESCRIPTION)
                .description(INFO_DESCRIPTION)
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`InfoObject already has field 'description'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate license", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .license(INFO_LICENSE)
                .license(INFO_LICENSE)
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`InfoObject already has field 'license'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate summary", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .summary(INFO_SUMMARY)
                .summary(INFO_SUMMARY)
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`InfoObject already has field 'summary'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate termsOfService", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .termsOfService(INFO_TERMS_OF_SERVICE)
                .termsOfService(INFO_TERMS_OF_SERVICE)
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`InfoObject already has field 'termsOfService'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on invalid termsOfService", () => {
        try {
            const info = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
                .termsOfService("not a URL")
                .build();
            expect.fail("Should have thrown ValueError");
        } catch (error) {
            if (error instanceof ValueError) {
                expect(error.message).to.equal(`InfoObject 'termsOfService' must be a valid URL`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

});

