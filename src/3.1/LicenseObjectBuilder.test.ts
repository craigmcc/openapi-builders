// LicenseObjectBuilder.test.ts

// External Modules ----------------------------------------------------------

import {INFO_TITLE, INFO_VERSION} from "./InfoObjectBuilder.test";

const chai = require("chai");
const expect = chai.expect;

// Internal Modules ----------------------------------------------------------

import {LicenseObject} from "./types";
import {LicenseObjectBuilder} from "./Builders";
import {DuplicateError, ExclusiveError, ValueError} from "./Errors";

// Test Data -----------------------------------------------------------------

export const LICENSE_IDENTIFIER = "Apache-2.0";
export const LICENSE_NAME = "Apache Software License 2.0";
export const LICENSE_URL = "https://www.apache.org/LICENSE";

export function makeLicenseObject(): LicenseObject {
    return new LicenseObjectBuilder(LICENSE_NAME)
        .identifier(LICENSE_IDENTIFIER)
        // .url(LICENSE_URL) // Cannot have both on the same LicenseObject
        .build();
}

// Test Suites ---------------------------------------------------------------

describe("LicenseObjectBuilder (3.1.0)", () => {

    it("should create a maximal LicenseObject", () => {
        const license = makeLicenseObject();
        expect(license.identifier).to.equal(LICENSE_IDENTIFIER);
        expect(license.name).to.equal(LICENSE_NAME);
        expect(license.url).to.undefined;
    });

    it("should create a minimal LicenseObject", () => {
        const license = new LicenseObjectBuilder(LICENSE_NAME).build();
        expect(license.email).to.be.undefined;
        expect(license.name).to.equal(LICENSE_NAME);
        expect(license.url).to.be.undefined;
    });

    it("should fail on duplicate identifier", () => {
        try {
            const license = new LicenseObjectBuilder(LICENSE_NAME)
                .identifier(LICENSE_IDENTIFIER)
                .identifier("Second Identifier")
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`LicenseObject already has identifier '${LICENSE_IDENTIFIER}'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on duplicate url", () => {
        try {
            const license = new LicenseObjectBuilder(LICENSE_NAME)
                .url(LICENSE_URL)
                .url("Second URL")
                .build();
            expect.fail("Should have thrown DuplicateError");
        } catch (error) {
            if (error instanceof DuplicateError) {
                expect(error.message).to.equal(`LicenseObject already has url '${LICENSE_URL}'`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on both identifier and url", () => {
        const licenseBuilder = new LicenseObjectBuilder(LICENSE_NAME)
            .identifier(LICENSE_IDENTIFIER);
        try {
            licenseBuilder.url(LICENSE_URL);
            expect.fail("Should have thrown ExclusiveError");
        } catch (error) {
            if (error instanceof ExclusiveError) {
                expect(error.message).to.include("LicenseObject cannot have both identifier and url");
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

    it("should fail on both url and identifier", () => {
        const licenseBuilder = new LicenseObjectBuilder(LICENSE_NAME)
            .url(LICENSE_URL);
        try {
            licenseBuilder.identifier(LICENSE_IDENTIFIER);
            expect.fail("Should have thrown ExclusiveError");
        } catch (error) {
            if (error instanceof ExclusiveError) {
                expect(error.message).to.include("LicenseObject cannot have both url and identifier");
            }
        }
    });

    it("should fail on invalid url", () => {
        try {
            const info = new LicenseObjectBuilder(LICENSE_NAME)
                .url("not a URL")
                .build();
            expect.fail("Should have thrown ValueError");
        } catch (error) {
            if (error instanceof ValueError) {
                expect(error.message).to.equal(`LicenseObject url must be a valid URL`);
            } else {
                expect.fail(`Should not have thrown '${error}'`);
            }
        }
    });

});
