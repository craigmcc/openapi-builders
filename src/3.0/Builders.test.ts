// Builders.test -------------------------------------------------------------

// Tests for the various Builder classes.

// External Modules ----------------------------------------------------------

const chai = require("chai");
const expect = chai.expect;

// Internal Modules ----------------------------------------------------------

import {
    ComponentsObjectBuilder,
    ContactObjectBuilder,
    ExternalDocsObjectBuilder,
    InfoObjectBuilder,
    LicenseObjectBuilder,
    OpenApiObjectBuilder,
    ReferenceObjectBuilder,
    SchemaObjectBuilder,
    TagObjectBuilder,
} from "./Builders";

// Test Suites ---------------------------------------------------------------

// TODO: CallbackObjectBuilder

describe("ComponentsObjectBuilder", () => {

    it("should create a maximal ComponentsObject", () => {
        const result = maximalComponentsObjectBuilder()
            .build();
        // TODO: callbacks
        // TODO: examples
        // TODO: headers
        // TODO: links
        // TODO: parameters
        // TODO: requestBodies
        // TODO: responses
        expect(result.schemas).to.exist;
        // @ts-ignore
        expect(result.schemas[SCHEMA_CUSTOMER_KEY]).to.exist;
        // @ts-ignore
        expect(result.schemas[SCHEMA_CUSTOMER_KEY]).to.deep.equal(maximalSchemaObjectBuilder2().build());
        // @ts-ignore
        expect(result.schemas[SCHEMA_USER_KEY]).to.exist;
        // @ts-ignore
        expect(result.schemas[SCHEMA_USER_KEY]).to.deep.equal(maximalSchemaObjectBuilder1().build());
        // TODO: securitySchemes
    })

    it("should create a minimal ComponentsObject", () => {
        const result = new ComponentsObjectBuilder()
            .build();
        expect(result).to.be.empty;
    })

})

describe("ContactObjectBuilder", () => {

    it("should create a maximal ContactObject", () => {
        const result = maximalContactObjectBuilder()
            .build();
        expect(result.email).equals(CONTACT_EMAIL);
        expect(result.name).equals(CONTACT_NAME);
        expect(result.url).equals(CONTACT_URL);
    })

    it("should create a minimal ContactObject", () => {
        const result = new ContactObjectBuilder()
            .build();
        expect(result).to.be.empty;
    })

})

describe("ExternalDocsObjectBuilder", () => {

    it("should create a maximal ExternalDocsObject", () => {
        const result = maximalExternalDocsObjectBuilder()
            .build();
        expect(result.description).equals(EXTERNAL_DOCS_DESCRIPTION);
        expect(result.url).equals(EXTERNAL_DOCS_URL);
    })

    it("should create a minimal ExternalDocsObject", () => {
        const result = new ExternalDocsObjectBuilder(EXTERNAL_DOCS_URL)
            .build();
        expect(result.description).to.be.undefined;
        expect(result.url).equals(EXTERNAL_DOCS_URL);
    })

})

describe("InfoObjectBuilder", () => {

    it("should create a maximal InfoObject", () => {
        const result = maximalInfoObjectBuilder()
            .build();
        expect(result.contact).to.deep.equal(maximalContactObjectBuilder().build());
        expect(result.description).equals(INFO_DESCRIPTION);
        expect(result.license).to.deep.equal(maximalLicenseObjectBuilder().build());
        // TODO - servers
        expect(result.termsOfService).equals(INFO_TERMS_OF_SERVICE);
        expect(result.title).equals(INFO_TITLE);
        expect(result.version).equals(INFO_VERSION);
    })

    it("should create a minimal InfoObject", () => {
        const result = new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
            .build();
        expect(result.contact).to.be.undefined;
        expect(result.description).to.be.undefined;
        expect(result.license).to.be.undefined;
        expect(result.servers).to.be.undefined;
        expect(result.termsOfService).to.be.undefined;
        expect(result.title).equals(INFO_TITLE);
        expect(result.version).equals(INFO_VERSION);
    })

})
describe("LicenseObjectBuilder", () => {

    it("should create a maximal LicenseObject", () => {
        const result = maximalLicenseObjectBuilder()
            .build();
        expect(result.name).equals(LICENSE_NAME);
        expect(result.url).equals(LICENSE_URL);
    })

    it("should create a minimal LicenseObject", () => {
        const result = new LicenseObjectBuilder(LICENSE_NAME)
            .build();
        expect(result.name).equals(LICENSE_NAME);
        expect(result.url).to.be.undefined;
    })

})

describe("OpenApiObjectBuilder", () => {

    it("should create a maximal OpenApiObject", () => {

        const result = maximalOpenApiObjectBuilder()
            .build();
//        console.log(JSON.stringify(result, null, 2));

        expect(result.openapi).equals(OPEN_API_VERSION);
        expect(result.components).to.deep.equal(maximalComponentsObjectBuilder().build());
        expect(result.externalDocs).to.deep.equal(maximalExternalDocsObjectBuilder().build());
        expect(result.info).to.deep.equal(maximalInfoObjectBuilder().build());
        // TODO: paths
        // TODO: security
        // TODO: servers
        expect(result.tags).to.exist;
        // @ts-ignore
        expect(result.tags.length).to.equal(2);
        // @ts-ignore
        expect(result.tags[0]).to.deep.equal(maximalTagObjectBuilder1().build());
        // @ts-ignore
        expect(result.tags[1]).to.deep.equal(maximalTagObjectBuilder2().build());

    })

    it("should create a minimal OpenApiObject", () => {

        const builder = new OpenApiObjectBuilder(
            minimalInfoObjectBuilder().build(),
        );
//        console.log(builder.asJson());
        const result = builder.build();

        expect(result.openapi).equals(OPEN_API_VERSION);
        expect(result.components).to.be.undefined;
        expect(result.externalDocs).to.be.undefined;
        expect(result.info).to.exist;
        expect(result.info.title).equals(INFO_TITLE);
        expect(result.info.version).equals(INFO_VERSION);
        expect(result.paths).to.be.empty;
        expect(result.security).to.be.undefined;
        expect(result.servers).to.be.undefined;
        expect(result.tags).to.be.undefined;

    })

});

describe("SchemaObjectBuilder", () => {

    it("should create a minimal SchemaObject", () => {
        const result = new SchemaObjectBuilder()
            .build();
        expect(result.deprecated).to.be.undefined;
        expect(result.description).to.be.undefined;
        expect(result.externalDocs).to.be.undefined;
        expect(result.format).to.be.undefined;
        expect(result.nullable).to.be.undefined;
        expect(result.properties).to.be.undefined;
        expect(result.type).to.be.undefined;
    })

})

describe("TagObjectBuilder", () => {

    it("should create a maximal TagObject", () => {
        const result = new TagObjectBuilder(TAG2_NAME)
            .addDescription(TAG2_DESCRIPTION)
            .addExternalDocs(maximalExternalDocsObjectBuilder().build())
            .build();
        expect(result.description).to.equal(TAG2_DESCRIPTION);
        expect(result.externalDocs).to.deep.equal(maximalExternalDocsObjectBuilder().build());
        expect(result.name).to.equal(TAG2_NAME);
    })

    it("should create a minimal TagObject", () => {
        const result = new TagObjectBuilder(TAG1_NAME)
            .build();
        expect(result.description).to.be.undefined;
        expect(result.externalDocs).to.be.undefined;
        expect(result.name).to.equal(TAG1_NAME);
    })

})

// Support Functions ---------------------------------------------------------

const maximalComponentsObjectBuilder = (): ComponentsObjectBuilder => {
    // TODO - addCallback, addExample, addHeader, addLink, addParameter
    // TODO - addRequestBody, addResponse
    return new ComponentsObjectBuilder()
        .addSchema(SCHEMA_USER_KEY, maximalSchemaObjectBuilder1().build())
        .addSchema(SCHEMA_CUSTOMER_KEY, maximalSchemaObjectBuilder2().build());
}

const CONTACT_EMAIL = "fred@bedrock.com";
const CONTACT_NAME = "Fred Flintstone";
const CONTACT_URL = "https://bedrock.com/fred";

const maximalContactObjectBuilder = (): ContactObjectBuilder => {
    return new ContactObjectBuilder()
        .addEmail(CONTACT_EMAIL)
        .addName(CONTACT_NAME)
        .addUrl(CONTACT_URL);
}

const EXTERNAL_DOCS_DESCRIPTION = "Biography of Fred Flintstone";
const EXTERNAL_DOCS_URL = "https://bedrock.com/fred.md";

const maximalExternalDocsObjectBuilder = (): ExternalDocsObjectBuilder => {
    return new ExternalDocsObjectBuilder(EXTERNAL_DOCS_URL)
        .addDescription(EXTERNAL_DOCS_DESCRIPTION);
}

const INFO_DESCRIPTION = "Information Description";
const INFO_TERMS_OF_SERVICE = "https://www.apache.org/licenses/LICENSE-2.0";
const INFO_TITLE = "Information Title";
const INFO_VERSION = "1.0.0";

const maximalInfoObjectBuilder = (): InfoObjectBuilder => {
    return new InfoObjectBuilder(INFO_TITLE, INFO_VERSION)
        .addContact(maximalContactObjectBuilder().build())
        .addDescription(INFO_DESCRIPTION)
        .addLicense(maximalLicenseObjectBuilder().build())
        // .addServer stuff
        .addTermsOfService(INFO_TERMS_OF_SERVICE);
}

const minimalInfoObjectBuilder = (): InfoObjectBuilder => {
    return new InfoObjectBuilder(INFO_TITLE, INFO_VERSION);
}

const LICENSE_NAME = "Apache 2.0";
const LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0";

const maximalLicenseObjectBuilder = (): LicenseObjectBuilder => {
    return new LicenseObjectBuilder(LICENSE_NAME)
        .addUrl(LICENSE_URL);
}

const OPEN_API_VERSION = "3.0";

const maximalOpenApiObjectBuilder = (): OpenApiObjectBuilder => {
    return new OpenApiObjectBuilder(maximalInfoObjectBuilder().build())
        .addComponents(maximalComponentsObjectBuilder().build())
        .addExternalDocs(maximalExternalDocsObjectBuilder().build())
        // paths
        // security
        // servers
        // tags
        .addTag(maximalTagObjectBuilder1().build())
        .addTag(maximalTagObjectBuilder2().build());
}

// Constructs a schema with a "User" model with "name" and "email" fields
const SCHEMA_CUSTOMER_KEY = "Customer";
const SCHEMA_EMAIL_KEY = "email";
const SCHEMA_NAME_KEY = "name";
const SCHEMA_USER_KEY = "User";

const maximalSchemaObjectBuilder1 = (): SchemaObjectBuilder => {
    return new SchemaObjectBuilder("object", `${SCHEMA_USER_KEY} Model`)
        .addExternalDocs(maximalExternalDocsObjectBuilder().build())
        .addProperty(SCHEMA_NAME_KEY, new SchemaObjectBuilder("string", `${SCHEMA_NAME_KEY} Field`)
            .addNullable(false)
            .build())
        .addProperty(SCHEMA_EMAIL_KEY, new SchemaObjectBuilder("string", `${SCHEMA_EMAIL_KEY} Field`)
            .addNullable(true)
            .build());
}

const maximalSchemaObjectBuilder2 = (): ReferenceObjectBuilder => {
    return new ReferenceObjectBuilder(`#/components/schemas/${SCHEMA_USER_KEY}`);
}

const TAG1_DESCRIPTION = "First Tag Description";
const TAG1_NAME = "First Tag";
const TAG2_DESCRIPTION = "Second Tag Description";
const TAG2_NAME = "Second Tag";

const maximalTagObjectBuilder1 = (): TagObjectBuilder => {
    return new TagObjectBuilder(TAG1_NAME)
        .addDescription(TAG1_DESCRIPTION)
        .addExternalDocs(maximalExternalDocsObjectBuilder().build());
}

const maximalTagObjectBuilder2 = (): TagObjectBuilder => {
    return new TagObjectBuilder(TAG2_NAME)
        .addDescription(TAG2_DESCRIPTION)
        .addExternalDocs(maximalExternalDocsObjectBuilder().build());
}

