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
    ParametersObject,
    PathItemObject,
    PathsObject,
    ReferenceObject,
    RequestBodyObject,
    ResponseObject,
    ResponsesObject,
    SchemaFormatType,
    SchemaObject,
    SchemaObjectType,
    SchemaPropertyObject,
    SecurityRequirementsObject,
    SecuritySchemeObject,
    ServerObject,
    ServerVariableObject,
    TagObject,
} from "./types";
import {
    checkArray,
    checkDuplicate,
    checkEmpty,
    checkExclusive,
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
        checkDuplicate("CallbackObject", this.target, name);
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
            checkMap("ComponentsObject", this.target, "callbacks", name);
        } else {
            this.target.callbacks = new Map();
        }
        this.target.callbacks.set(name, callback);
        return this;
    }

    // Convenience - add them individually
    public callbacks(callbacks: Map<string, CallbackObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, callback] of callbacks.entries()) {
            this.callback(name, callback);
        }
        return this;
    }

    public example(name: string, example: ExampleObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.examples) {
            checkMap("ComponentsObject", this.target, "examples", name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    // Convenience - add them individually
    public examples(examples: Map<string, ExampleObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, example] of examples.entries()) {
            this.example(name, example);
        }
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.headers) {
            checkMap("ComponentsObject", this.target, "headers", name);
        } else {
            this.target.headers = new Map();
        }
        this.target.headers.set(name, header);
        return this;
    }

    // Convenience - add them individually
    public headers(headers: Map<string, HeaderObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, header] of headers.entries()) {
            this.header(name, header);
        }
        return this;
    }

    public link(name: string, link: LinkObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.links) {
            checkMap("ComponentsObject", this.target, "links", name);
        } else {
            this.target.links = new Map();
        }
        this.target.links.set(name, link);
        return this;
    }

    // Convenience - add them individually
    public links(links: Map<string, LinkObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, link] of links.entries()) {
            this.link(name, link);
        }
        return this;
    }

    public parameter(name: string, parameter: ParameterObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.parameters) {
            checkMap("ComponentsObject", this.target, "parameters", name);
        } else {
            this.target.parameters = new Map();
        }
        this.target.parameters.set(name, parameter);
        return this;
    }

    // Convenience - add them individually
    public parameters(parameters: ParametersObject): ComponentsObjectBuilder {
        for (const name in parameters) {
            this.parameter(name, parameters[name]);
        }
        return this;
    }

    public pathItem(name: string, pathItem: PathItemObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.pathItems) {
            checkMap("ComponentsObject", this.target, "pathItems", name);
        } else {
            this.target.pathItems = new Map();
        }
        this.target.pathItems.set(name, pathItem);
        return this;
    }

    // Convenience - add them individually
    public pathItems(pathItems: Map<string, PathItemObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, pathItem] of pathItems.entries()) {
            this.pathItem(name, pathItem);
        }
        return this;
    }

    public requestBody(name: string, requestBody: RequestBodyObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.requestBodies) {
            checkMap("ComponentsObject", this.target, "requestBodies", name);
        } else {
            this.target.requestBodies = new Map();
        }
        this.target.requestBodies.set(name, requestBody);
        return this;
    }

    // Convenience - add them individually
    public requestBodies(requestBodies: Map<string, RequestBodyObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, requestBody] of requestBodies.entries()) {
            this.requestBody(name, requestBody);
        }
        return this;
    }

    public response(name: string, response: ResponseObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.responses) {
            checkMap("ComponentsObject", this.target, "responses", name);
        } else {
            this.target.responses = new Map();
        }
        this.target.responses.set(name, response);
        return this;
    }

    // Convenience - add them individually
    public responses(responses: Map<string, ResponseObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, response] of responses.entries()) {
            this.response(name, response);
        }
        return this;
    }

    public schema(name: string, schema: SchemaObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.schemas) {
            checkMap("ComponentsObject", this.target, "schemas", name);
        } else {
            this.target.schemas = new Map();
        }
        this.target.schemas.set(name, schema);
        return this;
    }

    // Convenience - add them individually
    public schemas(schemas: Map<string, SchemaObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, schema] of schemas.entries()) {
            this.schema(name, schema);
        }
        return this;
    }

    public securityScheme(name: string, securityScheme: SecuritySchemeObject | ReferenceObject): ComponentsObjectBuilder {
        if (this.target.securitySchemes) {
            checkMap("ComponentsObject", this.target,"securitySchemes", name);
        } else {
            this.target.securitySchemes = new Map();
        }
        this.target.securitySchemes.set(name, securityScheme);
        return this;
    }

    // Convenience - add them individually
    public securitySchemes(securitySchemes: Map<string, SecuritySchemeObject | ReferenceObject>): ComponentsObjectBuilder {
        for (const [name, securityScheme] of securitySchemes.entries()) {
            this.securityScheme(name, securityScheme);
        }
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
        checkDuplicate("ContactObject", this.target,"email");
        this.target.email = email;
        return this;
    }

    public name(name: string): ContactObjectBuilder {
        checkDuplicate("ContactObject", this.target, "name");
        this.target.name = name;
        return this;
    }

    public url(url: string): ContactObjectBuilder {
        checkDuplicate("ContactObject", this.target, "url");
        checkURL("ContactObject", this.target,"url", url);
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
        checkDuplicate("ExampleObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public externalValue(externalValue: string) {
        checkDuplicate("ExampleObject", this.target, "externalValue");
        checkExclusive("ExampleObject", this.target, "externalValue", "value");
        this.target.externalValue = externalValue;
        return this;
    }

    public summary(summary: string): ExampleObjectBuilder {
        checkDuplicate("ExampleObject", this.target, "summary");
        this.target.summary = summary;
        return this;
    }

    public value(value: any): ExampleObjectBuilder {
        checkDuplicate("ExampleObject", this.target, "value");
        checkExclusive("ExampleObject", this.target, "value", "externalValue");
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
        this.target = {
            url: url,
        }
        checkURL("ExternalDocsObject", this.target, "url", url);
    }

    private target: ExternalDocsObject;

    public description(description: string): ExternalDocsObjectBuilder {
        checkDuplicate("ExternalDocsObject", this.target, "description");
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
        checkDuplicate("HeaderObject", this.target, "allowEmptyValue");
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    allowReserved(allowReserved: boolean): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "allowReserved");
        this.target.allowReserved = allowReserved;
        return this;
    }

    deprecated(deprecated: boolean): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    description(description: string): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    example(example: ExampleObject | ReferenceObject): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "example");
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): HeaderObjectBuilder {
        if (this.target.examples) {
            checkMap("HeaderObject", this.target, "examples", name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    explode(explode: boolean): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "explode");
        this.target.explode = explode;
        return this;
    }

    required(required: boolean): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "required");
        this.target.required = required;
        return this;
    }

    schema(schema: SchemaObject): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "schema");
        this.target.schema = schema;
        return this;
    }

    style(style: string): HeaderObjectBuilder {
        checkDuplicate("HeaderObject", this.target, "style");
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
        checkDuplicate("InfoObject", this.target, "contact");
        this.target.contact = contact;
        return this;
    }

    public description(description: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public license(license: LicenseObject): InfoObjectBuilder {
        checkDuplicate("InfoObject", this.target, "license");
        this.target.license = license;
        return this;
    }

    public summary(summary: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", this.target, "summary");
        this.target.summary = summary;
        return this;
    }

    public termsOfService(termsOfService: string): InfoObjectBuilder {
        checkDuplicate("InfoObject", this.target, "termsOfService");
        checkURL("InfoObject", this.target, "termsOfService", termsOfService);
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
        checkDuplicate("LicenseObject", this.target, "identifier");
        checkExclusive("LicenseObject", this.target, "identifier",  "url");
        this.target.identifier = identifier;
        return this;
    }

    public url(url: string): LicenseObjectBuilder {
        checkDuplicate("LicenseObject", this.target, "url");
        checkExclusive("LicenseObject", this.target, "url", "identifier");
        checkURL("LicenseObject", this.target, "url", url);
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
        checkDuplicate("LinkObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public operationId(operationId: string): LinkObjectBuilder {
        checkDuplicate("LinkObject", this.target, "operationId");
        checkExclusive("LinkObject", this.target,"operationId", "operationRef");
        this.target.operationId = operationId;
        return this;
    }

    public operationRef(operationRef: string): LinkObjectBuilder {
        checkDuplicate("LinkObject", this.target, "operationRef");
        checkExclusive("LinkObject", this.target, "operationRef", "operationId");
        this.target.operationRef = operationRef;
        return this;
    }

    public parameter(name: string, parameter: any): LinkObjectBuilder {
        if (this.target.parameters) {
            checkMap("LinkObject", this.target, "parameters", name);
        } else {
            this.target.parameters = new Map();
        }
        this.target.parameters.set(name, parameter);
        return this;
    }

    public requestBody(requestBody: any): LinkObjectBuilder {
        checkDuplicate("LinkObject", this.target, "requestBody");
        this.target.requestBody = requestBody;
        return this;
    }

    public server(server: ServerObject): LinkObjectBuilder {
        checkDuplicate("LinkObject", this.target, "server");
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
        checkDuplicate("MediaTypeObject", this.target, "example");
        checkExclusive("MediaTypeObject", this.target, "example", "examples");
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): MediaTypeObjectBuilder {
        checkDuplicate("MediaTypeObject", this.target, "examples");
        checkExclusive("MediaTypeObject", this.target, "examles", "example");
        if (this.target.examples) {
            checkMap("ParameterObject", this.target, "examples", name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    schema(schema: SchemaObject | ReferenceObject): MediaTypeObjectBuilder {
        checkDuplicate("MediaTypeObject", this.target, "schema");
        this.target.schema = schema;
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
        checkDuplicate("OpenApiObject", this.target, "components");
        this.target.components = components;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): OpenApiObjectBuilder {
        checkDuplicate("OpenApiObject", this.target, "externalDocs");
        this.target.externalDocs = externalDocs;
        return this;
    }

    public jsonSchemaDialect(jsonSchemaDialect: string): OpenApiObjectBuilder {
        checkDuplicate("OpenApiObject", this.target, "jsonSchemaDialect");
        this.target.jsonSchemaDialect = jsonSchemaDialect;
        return this;
    }

    public path(path: string, pathItem: PathItemObject): OpenApiObjectBuilder {
        if (this.target.paths) {
            checkDuplicate("OpenApiObject", this.target.paths, path);
        } else {
            this.target.paths = new PathsObjectBuilder().build();
        }
        this.target.paths[path] = pathItem;
        return this;
    }

    // Convenience - add them individually
    public paths(paths: PathsObject): OpenApiObjectBuilder {
        for (const path in paths) {
            this.path(path, paths[path]);
        }
        return this;
    }

    public security(security: SecurityRequirementsObject): OpenApiObjectBuilder {
        if (this.target.security) {
            checkArray("OpenApiProject", this.target, "security", security);
        } else {
            this.target.security = [];
        }
        this.target.security.push(security);
        return this;
    }

    public server(server: ServerObject): OpenApiObjectBuilder {
        if (this.target.servers) {
            checkArray("OpenApiObject", this.target, "servers", server);
        } else {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    // Convenience - add them individually
    public servers(servers: ServerObject[]): OpenApiObjectBuilder {
        for (const server of servers) {
            this.server(server);
        }
        return this;
    }

    public tag(tag: TagObject): OpenApiObjectBuilder {
        if (this.target.tags) {
            checkArray("OpenApiProject", this.target, "tags", tag);
        } else {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    // Convenience - add them individually
    public tags(tags: TagObject[]): OpenApiObjectBuilder {
        for (const tag of tags) {
            this.tag(tag);
        }
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
            checkMap("OperationObject", this.target, "callbacks", name);
        } else {
            this.target.callbacks = new Map();
        }
        this.target.callbacks.set(name, callback);
        return this;
    }

    public deprecated(deprecated: boolean): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target,"deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "externalDocs");
        this.target.externalDocs = externalDocs;
        return this;
    }

    public operationId(operationId: string): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "operationId");
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

    // Convenience - add them individually
    public parameters(parameters: ParametersObject): OperationObjectBuilder {
        for (const name in parameters) {
            this.parameter(parameters[name]);
        }
        return this;
    }

    public requestBody(requestBody: RequestBodyObject | ReferenceObject): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "requestBody");
        this.target.requestBody = requestBody;
        return this;
    }

    // TODO: This is a little clumsy, but hard to articulate how to add default and
    // TODO: other responses individually
    public responses(responses: ResponsesObject): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "responses");
        this.target.responses = responses;
        return this;
    }

    public security(security: SecurityRequirementsObject): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "security");
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

    public summary(summary: string): OperationObjectBuilder {
        checkDuplicate("OperationObject", this.target, "summary");
        this.target.summary = summary;
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
        checkDuplicate("ParameterObject", this.target, "allowEmptyValue");
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    allowReserved(allowReserved: boolean): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "allowReserved");
        this.target.allowReserved = allowReserved;
        return this;
    }

    deprecated(deprecated: boolean): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    description(description: string): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    example(example: ExampleObject | ReferenceObject): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "example");
        checkExclusive("ParameterObject", this.target, "example", "examples");
        this.target.example = example;
        return this;
    }

    // Cannot overload example() method name
    examples(name: string, example: ExampleObject | ReferenceObject): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "examples");
        checkExclusive("ParameterObject", this.target, "examples","example");
        if (this.target.examples) {
            checkMap("ParameterObject", this.target, "examples", name);
        } else {
            this.target.examples = new Map();
        }
        this.target.examples.set(name, example);
        return this;
    }

    explode(explode: boolean): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "explode");
        this.target.explode = explode;
        return this;
    }

    required(required: boolean): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "required");
        this.target.required = required;
        return this;
    }

    schema(schema: SchemaObject): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "schema");
        this.target.schema = schema;
        return this;
    }

    style(style: string): ParameterObjectBuilder {
        checkDuplicate("ParameterObject", this.target, "style");
        this.target.style = style;
        return this;
    }

    public build(): HeaderObject {
        return this.target;
    }
}

/**
 * Builder for `ParametersObject` objects.  Not officially an OpenAPI object type,
 * but convenient for building up more complex objects.
 */
export class ParametersObjectBuilder {

    constructor() {
        this.target = {};
    }

    public parameter(parameter: ParameterObject): ParametersObjectBuilder {
        checkDuplicate("ParametersObject", this.target, parameter.name);
        this.target[parameter.name] = parameter;
        return this;
    }

    private target: ParametersObject;

    public build(): ParametersObject {
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
        checkDuplicate("PathItemObject", this.target, "$ref");
        this.target.$ref = $ref;
        return this;
    }

    public delete(deleteValue: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "delete");
        this.target.delete = deleteValue;
        return this;
    }

    public description(description: string): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public get(get: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "get");
        this.target.get = get;
        return this;
    }

    public head(head: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "head");
        this.target.head = head;
        return this;
    }

    public options(options: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "options");
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
        checkDuplicate("PathItemObject", this.target, "patch");
        this.target.patch = patch;
        return this;
    }

    public post(post: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "post");
        this.target.post = post;
        return this;
    }

    public put(put: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "put");
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
        checkDuplicate("PathItemObject", this.target, "summary");
        this.target.summary = summary;
        return this;
    }

    public trace(trace: OperationObject): PathItemObjectBuilder {
        checkDuplicate("PathItemObject", this.target, "trace");
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
        checkDuplicate("PathsObject", this.target, path);
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
        checkDuplicate("ReferenceObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public summary(summary: string): ReferenceObjectBuilder {
        checkDuplicate("ReferenceObject", this.target, "summary");
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
        checkMap("RequestBodyObject", this.target, "content", type);
        this.target.content.set(type, mediaType);
        return this;
    }

    public description(description: string): RequestBodyObjectBuilder {
        checkDuplicate("RequestBodyObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public required(required: boolean): RequestBodyObjectBuilder {
        checkDuplicate("RequestBodyObject", this.target, "required");
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
        } else {
            checkMap("ResponseObject", this.target, "content", type);
        }
        this.target.content.set(type, mediaType);
        return this;
    }

    public description(description: string): ResponseObjectBuilder {
        checkDuplicate("ResponseObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = new Map();
        } else {
            checkMap("ResponseObject", this.target, "headers", name);
         }
        this.target.headers.set(name, header);
        return this;
    }

    public link(key: string, link: LinkObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.links) {
            this.target.links = new Map();
        } else {
            checkMap("ResponseObject", this.target, "links", key);
        }
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
        checkDuplicate("ResponsesObject", this.target, "default");
        this.target.default = defaultValue;
        return this;
    }

    public statusCode(statusCode: string, response: ResponseObject | ReferenceObject): ResponsesObjectBuilder {
        checkDuplicate("ResponsesObject", this.target, "statusCode");
        // TODO - check for three digit code in the right range?
        this.target[statusCode] = response;
        return this;
    }

    public build(): ResponsesObject {
        return this.target;
    }

}

/**
 * Builder for `SchemaObject` objects.
 * TODO: needs tests
 */
export class SchemaObjectBuilder {

    constructor(type: SchemaObjectType) {
        this.target = {
            type: type,
        }
    }

    private target: SchemaObject;

    $dynamicAnchor($dynamicAnchor: string): SchemaObjectBuilder {
        checkDuplicate("SchemaObject", this.target, "$dynamicAnchor");
        this.target.$dynamicAnchor = $dynamicAnchor;
        return this;
    }

    $id($id: string): SchemaObjectBuilder {
        checkDuplicate("SchemaObject", this.target, "$id");
        this.target.$id = $id;
        return this;
    }

    $schema($schema: string): SchemaObjectBuilder {
        checkDuplicate("SchemaObject", this.target, "$schema");
        this.target.$schema = $schema;
        return this;
    }

    allOf(allOf: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.allOf) {
            this.target.allOf = [];
        } else {
            checkArray("SchemaObject", this.target, "allOf", allOf);
        }
        this.target.allOf.push(allOf);
        return this;
    }

    anyOf(anyOf: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.anyOf) {
            this.target.anyOf = [];
        } else {
            checkArray("SchemaObject", this.target, "anyOf", anyOf);
        }
        this.target.anyOf.push(anyOf);
        return this;
    }

    // TODO: discriminator()

    // TODO: items()

    oneOf(oneOf: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.oneOf) {
            this.target.oneOf = [];
        } else {
            checkArray("SchemaObject", this.target, "oneOf", oneOf);
        }
        this.target.oneOf.push(oneOf);
        return this;
    }

    public property(name: string, property: SchemaPropertyObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.properties) {
            this.target.properties = new Map();
        } else {
            checkMap("SchemaObject", this.target, "properties", name);
        }
        this.target.properties.set(name, property);
        return this;
    }

    public required(required: string): SchemaObjectBuilder {
        if (!this.target.required) {
            this.target.required = [];
        } else {
            checkArray("SchemaObject", this.target, "required", required);
        }
        this.target.required.push(required);
        return this;
    }

    public title(title: string): SchemaObjectBuilder {
        checkDuplicate("SchemaObject", this.target, "title");
        this.target.title = title;
        return this;
    }

    public build(): SchemaObject {
        return this.target;
    }

}

// TODO: SchemaDiscriminatorObjectBuilder

/**
 * Builder for `SchemaPropertyObject` objects.
 * TODO: needs tests
 */
export class SchemaPropertyObjectBuilder {

    constructor(type: SchemaObjectType | SchemaObjectType[]) {
        this.target = {
            type: type,
        }
    }

    private target: SchemaPropertyObject;

    public const(constValue: boolean | string | number | null): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "const");
        this.target.const = constValue;
        return this;
    }

    public default(defaultValue: boolean | string | number | null): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "default");
        this.target.default = defaultValue;
        return this;
    }

    public deprecated(deprecated: boolean): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "deprecated");
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "description")
        this.target.description = description;
        return this;
    }

    public enum(value: string | number | null): SchemaPropertyObjectBuilder {
        if (!this.target.enum) {
            this.target.enum = [];
        } else {
            checkArray("SchemaPropertyObject", this.target, "enum", value);
        }
        this.target.enum.push(value);
        return this;
    }

    public exclusiveMaximum(exclusiveMaximum: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "exclusiveMaximum");
        this.target.exclusiveMaximum = exclusiveMaximum;
        return this;
    }

    public exclusiveMinimum(exclusiveMinimum: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "exclusiveMinimum");
        this.target.exclusiveMinimum = exclusiveMinimum;
        return this;
    }

    public format(format: SchemaFormatType): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "format");
        this.target.format = format;
        return this;
    }

    public maximum(maximum: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "maximum");
        this.target.maximum = maximum;
        return this;
    }

    public maxItems(maxItems: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "maxItems");
        this.target.maxItems = maxItems;
        return this;
    }

    public maxLength(maxLength: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "maxLength");
        this.target.maxLength = maxLength;
        return this;
    }

    public maxProperties(maxProperties: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "maxProperties");
        this.target.maxProperties = maxProperties;
        return this;
    }

    public minimum(minimum: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "minimum");
        this.target.minimum = minimum;
        return this;
    }

    public minItems(minItems: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "minItems");
        this.target.minItems = minItems;
        return this;
    }

    public minLength(minLength: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "minLength");
        this.target.minLength = minLength;
        return this;
    }

    public minProperties(minProperties: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "minProperties");
        this.target.minProperties = minProperties;
        return this;
    }

    public multipleOf(multipleOf: number): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "multipleOf");
        this.target.multipleOf = multipleOf;
        return this;
    }

    public pattern(pattern: string): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "pattern");
        this.target.pattern = pattern;
        return this;
    }

    public readOnly(readOnly: boolean): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "readOnly");
        this.target.readOnly = readOnly;
        return this;
    }

    public required(required: string): SchemaPropertyObjectBuilder {
        if (!this.target.required) {
            this.target.required = [];
        } else {
            checkArray("SchemaPropertyObject", this.target, "required", required);
        }
        this.target.required.push(required);
        return this;
    }

    public title(title: string): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "title");
        this.target.title = title;
        return this;
    }

    public unique(unique: boolean): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "unique");
        this.target.unique = unique;
        return this;
    }

    public writeOnly(writeOnly: boolean): SchemaPropertyObjectBuilder {
        checkDuplicate("SchemaPropertyObject", this.target, "writeOnly");
        this.target.writeOnly = writeOnly;
        return this;
    }

    public build(): SchemaPropertyObject {
        return this.target;
    }

}

/**
 * Builder for `ServerObject` objects.
 * TODO: needs tests
 */
export class ServerObjectBuilder {

    constructor(url: string) {
        this.target = {
            url: url,
        }
        checkURL("ServerObject", this.target,"url", url);
    }

    private target: ServerObject;

    public description(description: string): ServerObjectBuilder {
        checkDuplicate("ServerObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    // Convenience
    public variable(name: string, variable: ServerVariableObject): ServerObjectBuilder {
        if (!this.target.variables) {
            this.target.variables = new Map();
        } else {
            checkMap("ServerObject", this.target, "variables", name);
        }
        this.target.variables.set(name, variable);
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
        checkDuplicate("ServerVariableObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public enum(enumValues: string[]): ServerVariableObjectBuilder {
        checkDuplicate("ServerVariableObject", this.target, "enum");
        checkEmpty("ServerVariableObject", this.target,"enum", enumValues);
        this.target.enum = enumValues;
        return this;
    }

}

/**
 * Builder for `TagObject` objects.
 */
export class TagObjectBuilder {

    constructor(name: string) {
        this.target = {
            name: name
        }
    }

    public description(description: string): TagObjectBuilder {
        checkDuplicate("TagObject", this.target, "description");
        this.target.description = description;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): TagObjectBuilder {
        checkDuplicate("TagObject", this.target, "externalDocs");
        this.target.externalDocs = externalDocs;
        return this;
    }

    private target: TagObject;

    public build(): TagObject {
        return this.target;
    }

}
