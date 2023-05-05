// Builders.ts

/**
 * Builder Pattern classes for OpenAPI Specification 3.1 configuration objects.
 *
 * @packageDocumentation
 */

import {
    CallbackObject,
    ComponentsObject,
    ContactObject,
    ExampleObject,
    ExternalDocsObject,
    HeaderObject,
    InfoObject,
    InType,
    LicenseObject,
    LinkObject,
    MediaTypeObject,
    OpenApiObject,
    OperationObject,
    ParameterObject,
    PathItemObject,
    PathsObject,
    ReferenceObject,
    RequestBodyObject,
    ResponseObject,
    ResponsesObject,
    SchemaObject,
    SecurityRequirementsObject,
    SecuritySchemeObject,
    ServerObject,
    ServerVariableObject,
    TagObject,
} from "./types";
import {
    checkDuplicate,
    checkEmpty,
    checkExclusive,
    checkField,
    checkMap,
    checkURL,
    ValueError,
} from "./Errors";

/**
 * Builder for `CallbackObject` objects.
 * TODO: Needs tests
 */
export class CallbackObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: CallbackObject;

    public callback(name: string, callback: PathItemObject | ReferenceObject): CallbackObjectBuilder {
        checkField("CallbackObject", this.target, name);
        this.target[name] = callback;
        return this;
    }

    public build(): CallbackObject {
        return this.target;
    }

}

/**
 * Builder for `Component` objects.
 * Note that, for each map, we offer only ways to add a new entry.
 * TODO: Needs tests
 */
export class ComponentsObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ComponentsObject;

    public callback(name: string, callback: CallbackObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.callbacks) {
            checkMap("ComponentsObject", "callbacks", this.target.callbacks, name);
        } else {
            this.target.callbacks = new Map();
        }
        this.target.callbacks.set(name, callback);
        return this;
    }

    public example(name: string, example: ExampleObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.examples) {
            checkMap("ComponentsObject", "examples", this.target.examples, name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.headers) {
            checkMap("ComponentsObject", "headers", this.target.headers, name);
        } else {
            this.target.headers = new Map();
        }
        this.target.headers.set(name, header);
        return this;
    }

    public link(name: string, link: LinkObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.links) {
            checkMap("ComponentsObject", "links", this.target.links, name);
        } else {
            this.target.links = new Map();
        }
        this.target.links.set(name, link);
        return this;
    }

    public parameter(name: string, parameter: ParameterObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.parameters) {
            checkMap("ComponentsObject", "parameters", this.target.parameters, name);
        } else {
            this.target.parameters = new Map();
        }
        this.target.parameters.set(name, parameter);
        return this;
    }

    public pathItem(name: string, pathItem: PathItemObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.pathItems) {
            checkMap("ComponentsObject", "pathItems", this.target.pathItems, name);
        } else {
            this.target.pathItems = new Map();
        }
        this.target.pathItems.set(name, pathItem);
        return this;
    }

    public requestBody(name: string, requestBody: RequestBodyObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.requestBodies) {
            checkMap("ComponentsObject", "requestBodies", this.target.requestBodies, name);
        } else {
            this.target.requestBodies = new Map();
        }
        this.target.requestBodies.set(name, requestBody);
        return this;
    }

    public response(name: string, response: ResponseObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.responses) {
            checkMap("ComponentsObject", "responses", this.target.responses, name);
        } else {
            this.target.responses = new Map();
        }
        this.target.responses.set(name, response);
        return this;
    }

    public schema(name: string, schema: SchemaObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.schemas) {
            checkMap("ComponentsObject", "schemas", this.target.schemas, name);
        } else {
            this.target.schemas = new Map();
        }
        this.target.schemas.set(name, schema);
        return this;
    }

    public securityScheme(name: string, securityScheme: SecuritySchemeObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.securitySchemes) {
            checkMap("ComponentsObject", "securitySchemes", this.target.securitySchemes, name);
        } else {
            this.target.securitySchemes = new Map();
        }
        this.target.securitySchemes.set(name, securityScheme);
        return this;
    }

    public build(): ComponentsObject {
        return this.target;
    }

}

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
 * Builder for `ExampleObject` objects.
 * TODO: needs tests
 */
export class ExampleObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ExampleObject;

    public description(description: string): ExampleObjectBuilder {
        checkDuplicate("ExampleObject", "description", this.target.description);
        this.target.description = description;
        return this;
    }

    public externalValue(externalValue: string) {
        checkExclusive("ExampleObject", "externalValue", externalValue, "value", this.target.value);
        this.target.externalValue = externalValue;
        return this;
    }

    public summary(summary: string): ExampleObjectBuilder {
        checkDuplicate("ExampleObject", "description", this.target.summary);
        this.target.summary = summary;
        return this;
    }

    public value(value: any): ExampleObjectBuilder {
        checkExclusive("ExampleObject", "value", value, "externalValue", this.target.externalValue);
        this.target.value = value;
        return this;
    }

    public build(): ExampleObject {
        return this.target;
    }

}

/**
 * Builder for `ExternalDocsObject` objects.
 * TODO: needs tests
 */
export class ExternalDocsObjectBuilder {

    constructor(url: string) {
        checkURL("ExternalDocsObject", "url", url);
        this.target = {
            url: url,
        }
    }

    private target: ExternalDocsObject;

    public description(description: string): ExternalDocsObjectBuilder {
        checkDuplicate("ExternalDocsObject", "description", this.target.description);
        this.target.description = description;
        return this;
    }

    public build(): ExternalDocsObject {
        return this.target;
    }

}

/**
 * Builder for `HeaderObject` objects.  Same as ParameterObject except no "in" or "name".
 * TODO: Needs tests
 */
export class HeaderObjectBuilder {

    constructor() {
        this.target = {
            in: "path",
            name: "-----",
        }
    }

    private target: HeaderObject;

    allowEmptyValue(allowEmptyValue: boolean): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "allowEmptyValue");
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    allowReserved(allowReserved: boolean): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "allowReserved");
        this.target.allowReserved = allowReserved;
        return this;
    }

    deprecated(deprecated: boolean): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    description(description: string): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    example(example: ExampleObject | ReferenceObject): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "example");
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): HeaderObjectBuilder {
        if (this.target.examples) {
            checkMap("HeaderObject", "examples", this.target.examples, name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    explode(explode: boolean): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "explode");
        this.target.explode = explode;
        return this;
    }

    required(required: boolean): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "required");
        this.target.required = required;
        return this;
    }

    schema(schema: SchemaObject): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "schema");
        this.target.schema = schema;
        return this;
    }

    style(style: string): HeaderObjectBuilder {
        checkField("HeaderObject", this.target, "style");
        this.target.style = style;
        return this;
    }

    public build(): HeaderObject {
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
 * Builder for `LinkObject` objects.
 * TODO: needs tests
 */
export class LinkObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: LinkObject;

    public description(description: string): LinkObjectBuilder {
        checkField("LinkObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public operationId(operationId: string): LinkObjectBuilder {
        checkExclusive("LinkObject", "operationId", operationId, "operationRef", this.target.operationRef);
        this.target.operationId = operationId;
        return this;
    }

    public operationRef(operationRef: string): LinkObjectBuilder {
        checkExclusive("LinkObject", "operationRef", operationRef, "operationId", this.target.operationId);
        this.target.operationRef = operationRef;
        return this;
    }

    public parameter(name: string, parameter: any): LinkObjectBuilder {
        if (this.target.parameters) {
            checkMap("LinkObject", "parameters", this.target.parameters, name);
        } else {
            this.target.parameters = new Map();
        }
        this.target.parameters.set(name, parameter);
        return this;
    }

    public requestBody(requestBody: any): LinkObjectBuilder {
        checkDuplicate("LinkObject", "requestBody", this.target.requestBody);
        this.target.requestBody = requestBody;
        return this;
    }

    public server(server: ServerObject): LinkObjectBuilder {
        checkDuplicate("LinkObject", "server", this.target.server);
        this.target.server = server;
        return this;
    }

    public build(): LinkObject {
        return this.target;
    }

}

/**
 * Builder for `MediaTypeObject` objects.
 * TODO: needs tests
 */
export class MediaTypeObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: MediaTypeObject;

    example(example: ExampleObject | ReferenceObject): MediaTypeObjectBuilder {
        checkExclusive("MediaTypeObject","example", example, "examples", this.target.examples);
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): MediaTypeObjectBuilder {
        checkExclusive("MediaTypeObject", "examples", example, "example", this.target.example);
        if (this.target.examples) {
            checkMap("ParameterObject", "examples", this.target.examples, name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    public build(): MediaTypeObject {
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

/**
 * Builder for `OperationObject` objects.
 * TODO: Needs tests
 */
export class OperationObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: OperationObject;

    public callback(name: string, callback: CallbackObject | ReferenceObject): OperationObjectBuilder {
        if (this.target.callbacks) {
            checkMap("OperationObject", "callbacks", this.target.callbacks, name);
        } else {
            this.target.callbacks = new Map();
        }
        this.target.callbacks.set(name, callback);
        return this;
    }

    public deprecated(deprecated: boolean): OperationObjectBuilder {
        checkField("OperationObject", this.target,"deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): OperationObjectBuilder {
        checkField("OperationObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): OperationObjectBuilder {
        checkField("OperationObject", this.target, "externalDocs");
        this.target.externalDocs = externalDocs;
        return this;
    }

    public operationId(operationId: string): OperationObjectBuilder {
        checkField("OperationObject", this.target, "operationId");
        this.target.operationId = operationId;
        return this;
    }

    public parameter(parameter: ParameterObject | ReferenceObject): OperationObjectBuilder {
        // Cannot really dedupe in the presence of reference objects
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        this.target.parameters.push(parameter);
        return this;
    }

    public requestBody(requestBody: RequestBodyObject | ReferenceObject): OperationObjectBuilder {
        checkField("OperationObject", this.target, "requestBody");
        this.target.requestBody = requestBody;
        return this;
    }

    // TODO: This is a little clumsy, but hard to articulate how to add default and
    // TODO: other responses individually
    public responses(responses: ResponsesObject): OperationObjectBuilder {
        checkField("OperationObject", this.target, "resonses");
        this.target.responses = responses;
        return this;
    }

    public security(security: SecurityRequirementsObject): OperationObjectBuilder {
        checkField("OperationObject", this.target, "security");
        this.target.security = security;
        return this;
    }

    public server(server: ServerObject): OperationObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        // No good way to dedupe
        this.target.servers.push(server);
        return this;
    }

    public tag(tag: TagObject): OperationObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        // No good way to dedupe
        this.target.tags.push(tag);
        return this;
    }

    public build(): OperationObject {
        return this.target;
    }

}

/**
 * Builder for `ParameterObject` objects.
 * TODO: Needs tests
 */
export class ParameterObjectBuilder {

    constructor(name: string, inValue: InType) {
        this.target = {
            in: inValue,
            name: name,
        }
    }

    private target: ParameterObject;

    allowEmptyValue(allowEmptyValue: boolean): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "allowEmptyValue");
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    allowReserved(allowReserved: boolean): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "allowReserved");
        this.target.allowReserved = allowReserved;
        return this;
    }

    deprecated(deprecated: boolean): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    description(description: string): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    example(example: ExampleObject | ReferenceObject): ParameterObjectBuilder {
        checkExclusive("ParameterObject", "example", example, "examples", this.target.examples);
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): ParameterObjectBuilder {
        checkExclusive("ParameterObject", "examples", example, "example", this.target.example);
        if (this.target.examples) {
            checkMap("ParameterObject", "examples", this.target.examples, name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    explode(explode: boolean): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "explode");
        this.target.explode = explode;
        return this;
    }

    required(required: boolean): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "required");
        this.target.required = required;
        return this;
    }

    schema(schema: SchemaObject): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "schema");
        this.target.schema = schema;
        return this;
    }

    style(style: string): ParameterObjectBuilder {
        checkField("ParameterObject", this.target, "style");
        this.target.style = style;
        return this;
    }

    public build(): HeaderObject {
        return this.target;
    }
}

/**
 * Builder for `PathItemObject` objects.
 * TODO: needs tests
 */
export class PathItemObjectBuilder {

    constructor() {
        this.target = {};
    }

    public $ref($ref: string): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "$ref");
        this.target.$ref = $ref;
        return this;
    }

    public delete(deleteValue: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "delete");
        this.target.delete = deleteValue;
        return this;
    }

    public description(description: string): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public get(get: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "get");
        this.target.get = get;
        return this;
    }

    public head(head: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "head");
        this.target.head = head;
        return this;
    }

    public options(options: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "options");
        this.target.options = options;
        return this;
    }

    public parameter(parameter: ParameterObject | ReferenceObject): PathItemObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        // No good way to dedupe
        this.target.parameters.push(parameter);
        return this;
    }

    public patch(patch: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "patch");
        this.target.patch = patch;
        return this;
    }

    public post(post: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "post");
        this.target.post = post;
        return this;
    }

    public put(put: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "put");
        this.target.put = put;
        return this;
    }

    public server(server: ServerObject): PathItemObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        // No good way to dedupe
        this.target.servers.push(server);
        return this;
    }

    public summary(summary: string): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "summary");
        this.target.summary = summary;
        return this;
    }

    public trace(trace: OperationObject): PathItemObjectBuilder {
        checkField("PathItemObject", this.target, "trace");
        this.target.trace = trace;
        return this;
    }

    private target: PathItemObject;

    public build(): PathItemObject {
        return this.target;
    }

}

/**
 * Builder for `PathsObject` objects.
 * TODO: needs tests
 */
export class PathsObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: PathsObject;

    public pathItem(path: string, pathItem: PathItemObject): PathsObjectBuilder {
        checkField("PathsObject", this.target, path);
        if (!path.startsWith("/")) {
            throw new ValueError(`Path '${path}' does not start with a slash`);
        }
        this.target[path] = pathItem;
        return this;
    }

    public build(): PathsObject {
        return this.target;
    }

}

/**
 * Builder for `ReferenceObject` objects.
 * TODO: needs tests
 */
export class ReferenceObjectBuilder {

    constructor($ref: string) {
        this.target = {
            $ref: $ref,
        }
    }

    private target: ReferenceObject;

    public description(description: string): ReferenceObjectBuilder {
        checkField("ReferenceObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public summary(summary: string): ReferenceObjectBuilder {
        checkField("ReferenceObject", this.target, "summary");
        this.target.summary = summary;
        return this;
    }

    public build(): ReferenceObject {
        return this.target;
    }

}

/**
 * Builder for `RequestBodyObject` objects.
 * TODO: needs tests
 */
export class RequestBodyObjectBuilder {

    constructor() {
        this.target = {
            content: new Map(),
        }
    }

    private target: RequestBodyObject;

    // The content Map is required, but let's add entries one at a time.
    public content(type: string, mediaType: MediaTypeObject): RequestBodyObjectBuilder {
        checkMap("RequestBodyObject", "content", this.target.content, type);
        this.target.content.set(type, mediaType);
        return this;
    }

    public description(description: string): RequestBodyObjectBuilder {
        checkField("RequestBodyObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public required(required: boolean): RequestBodyObjectBuilder {
        checkField("RequestBodyObject", this.target, "required");
        this.target.required = required;
        return this;
    }

    public build(): RequestBodyObject {
        return this.target;
    }

}

/**
 * Builder for `ResponseObject` objects.
 * TODO: needs tests
 */
export class ResponseObjectBuilder {

    constructor(description: string) {
        this.target = {
            description: description,
        }
    }

    private target: ResponseObject;

    public content(type: string, mediaType: MediaTypeObject): ResponseObjectBuilder {
        if (!this.target.content) {
            this.target.content = new Map();
        }
        checkMap("ResponseObject", "content", this.target.content, type);
        this.target.content.set(type, mediaType);
        return this;
    }

    public description(description: string): ResponseObjectBuilder {
        checkField("ResponseObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = new Map();
        }
        checkMap("ResponseObject", "headers", this.target.headers, name);
        this.target.headers.set(name, header);
        return this;
    }

    public link(key: string, link: LinkObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.links) {
            this.target.links = new Map();
        }
        checkMap("ResponseObject", "links", this.target.links, key);
        this.target.links.set(key, link);
        return this;
    }

    public build(): ResponseObject {
        return this.target;
    }

}

/**
 * Builder for `Responses` objects.
 * TODO: needs tests
 */
export class ResponsesObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ResponsesObject;

    public default(defaultValue: ResponseObject | ReferenceObject): ResponsesObjectBuilder {
        checkField("ResponsesObject", this.target, "default");
        this.target.default = defaultValue;
        return this;
    }

    public statusCode(statusCode: string, response: ResponseObject | ReferenceObject): ResponsesObjectBuilder {
        checkField("ResponsesObject", this.target, "statusCode");
        // TODO - check for three digit code in the right range?
        this.target[statusCode] = response;
        return this;
    }

    public build(): ResponsesObject {
        return this.target;
    }

}

// TODO: SchemaObjectBuilder

/**
 * Builder for `ServerObject` objects.
 * TODO: needs tests
 */
export class ServerObjectBuilder {

    constructor(url: string) {
        checkURL("ServerObject", "url", url);
        this.target = {
            url: url,
        }
    }

    private target: ServerObject;

    public description(description: string): ServerObjectBuilder {
        checkDuplicate("ServerObject", "description", this.target.description);
        this.target.description = description;
        return this;
    }

    // Convenience
    public variable(name: string, variable: ServerVariableObject): ServerObjectBuilder {
        if (!this.target.variables) {
            this.target.variables = new Map<string, ServerVariableObject>();
        }
        checkMap("ServerObject", "variables", this.target.variables, name);
        this.target.variables.set(name, variable);
        return this;
    }

    public variables(variables: Map<string, ServerVariableObject>): ServerObjectBuilder {
        checkDuplicate("ServerObject", "variables", this.target.variables);
        return this;
    }

    public build(): ServerObject {
        return this.target;
    }

}

/**
 * Builder for `ServerVariableObject` objects.
 * TODO: needs tests
 */
export class ServerVariableObjectBuilder {

    constructor(defaultValue: string) {
        this.target = {
            default: defaultValue,
        }
    }

    private target: ServerVariableObject;

    public description(description: string): ServerVariableObjectBuilder {
        checkDuplicate("ServerVariableObject", "description", this.target.description);
        this.target.description = description;
        return this;
    }

    public enum(enumValues: string[]): ServerVariableObjectBuilder {
        checkDuplicate("ServerVariableObject", "enum", this.target.enum);
        checkEmpty("ServerVariableObject", "enum", enumValues);
        this.target.enum = enumValues;
        return this;
    }

}
