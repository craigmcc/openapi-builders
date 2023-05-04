// Builders.ts

/**
 * Builder Pattern classes for OpenAPI Specification configuration objects.
 */

import {
    ComponentsObject,
    ContactObject,
    ExternalDocsObject,
    InfoObject,
    LicenseObject,
    OpenApiObject,
    PathItemObject,
    PathsObject,
    SecurityRequirementsObject,
    ServerObject,
    TagObject,
} from "./types";
import {checkDuplicate, checkExclusive, checkURL} from "./Errors";

/**
 * Builder for `ContactObject` objects.
 */
export class ContactObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ContactObject;

    public email(email: string): ContactObjectBuilder {
        checkDuplicate("ContactObject", "email", this.target.email);
        this.target.email = email;
        return this;
    }

    public name(name: string): ContactObjectBuilder {
        checkDuplicate("ContactObject", "name", this.target.name);
        this.target.name = name;
        return this;
    }

    public url(url: string): ContactObjectBuilder {
        checkDuplicate("ContactObject", "url", this.target.url);
        checkURL("ContactObject", "url", url);
        this.target.url = url;
        return this;
    }

    public build(): ContactObject {
        return this.target;
    }

}

/**
 * Builder for `InfoObject` objects.
 */
export class InfoObjectBuilder {

    constructor(title: string, version: string) {
        this.target = {
            title: title,
            version: version,
        }
    }

    private target: InfoObject;

    public contact(contact: ContactObject): InfoObjectBuilder {
        checkDuplicate("InfoObject", "contact", this.target.contact);
        this.target.contact = contact;
        return this;
    }

    public description(description: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", "description", this.target.description);
        this.target.description = description;
        return this;
    }

    public license(license: LicenseObject): InfoObjectBuilder {
        checkDuplicate("InfoObject", "license", this.target.license);
        this.target.license = license;
        return this;
    }

    public summary(summary: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", "summary", this.target.summary);
        this.target.summary = summary;
        return this;
    }

    public termsOfService(termsOfService: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", "termsOfService", this.target.termsOfService);
        checkURL("InfoObject", "termsOfService", termsOfService);
        this.target.termsOfService = termsOfService;
        return this;
    }

    public build(): InfoObject {
        return this.target;
    }

}

/**
 * Builder for `LicenseObject` objects.
 */
export class LicenseObjectBuilder {

    constructor(name: string) {
        this.target = {
            name: name,
        };
    }

    private target: LicenseObject;

    public identifier(identifier: string): LicenseObjectBuilder {
        checkDuplicate("LicenseObject", "identifier", this.target.identifier);
        checkExclusive("LicenseObject", "identifier", identifier,
            "url", this.target.url);
        this.target.identifier = identifier;
        return this;
    }

    public url(url: string): LicenseObjectBuilder {
        checkDuplicate("LicenseObject", "url", this.target.url);
        checkExclusive("LicenseObject", "url", url,
            "identifier", this.target.identifier);
        checkURL("LicenseObject", "url", url);
        this.target.url = url;
        return this;
    }

    public build(): LicenseObject {
        return this.target;
    }

}

/**
 * Builder for `OpenApiObject` objects.
 * TODO: needs tests
 */
export class OpenApiObjectBuilder {

    constructor(info: InfoObject) {
        this.target = {
            info: info,
            openapi: "3.1.0",
        }
    }

    private target: OpenApiObject;

    public components(components: ComponentsObject): OpenApiObjectBuilder {
        this.target.components = components;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): OpenApiObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public jsonSchemaDialect(jsonSchemaDialect: string): OpenApiObjectBuilder {
        this.target.jsonSchemaDialect = jsonSchemaDialect;
        return this;
    }

    // Convenience
    public pathItem(path: string, pathItem: PathItemObject): OpenApiObjectBuilder {
        if (!this.target.paths) {
            this.target.paths = {};
        }
        this.target.paths[path] = pathItem;
        return this;
    }

    public pathItems(paths: PathsObject): OpenApiObjectBuilder {
        this.target.paths = paths;
        return this;
    }

    public security(security: SecurityRequirementsObject[]): OpenApiObjectBuilder {
        this.target.security = security;
        return this;
    }

    // Convenience
    public server(server: ServerObject): OpenApiObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    public servers(servers: ServerObject[]): OpenApiObjectBuilder {
        this.target.servers = servers;
        return this;
    }

    // Convenience
    public tag(tag: TagObject): OpenApiObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    public tags(tags: TagObject[]): OpenApiObjectBuilder {
        this.target.tags = tags;
        return this;
    }

    // TODO - webhooks

    public build(): OpenApiObject {
        return this.target;
    }

}

