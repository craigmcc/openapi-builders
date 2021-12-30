// Builders ------------------------------------------------------------------

// Builder Pattern classes for OpenAPI Specification configuration objects.

// External Modules ----------------------------------------------------------

import * as yaml from "yaml";

// Internal Modules ----------------------------------------------------------

import {
    CallbackObject,
    CallbacksObject,
    ComponentsObject,
    ContactObject,
    ContentsObject,
    ExampleObject,
    ExamplesObject,
    ExternalDocsObject,
    FormatType,
    HeaderObject,
    HeadersObject,
    InfoObject,
    LicenseObject,
    LinkObject,
    LinksObject,
    MediaTypeObject,
    OpenApiObject,
    OperationObject,
    ParameterInType,
    ParameterObject,
    ParametersObject,
    ParameterStyleType,
    PathItemObject,
    PathsObject,
    ReferenceObject,
    RequestBodiesObject,
    RequestBodyObject,
    ResponseObject,
    ResponsesObject,
    SchemaObject,
    SchemasObject,
    SecurityObject,
    ServerObject,
    TagObject,
    TagsObject,
    TypeType,
} from "./types";

// This is the version of the specification that we were designed with,
// but should be compatible with anything that requires 3.0 or 3.0.x.
export const OPENAPI_VERSION = "3.0.3";

// Overall Object Builder ----------------------------------------------------

export class OpenApiObjectBuilder {

    constructor(info: InfoObject) {
        this.target = {
            openapi: OPENAPI_VERSION,
            info: info,
            paths: {},
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

    public pathItem(path: string, pathItem: PathItemObject): OpenApiObjectBuilder {
        validatePath("ApiObjectBuilder.pathItem", path);
        if (this.target.paths[path]) {
            throw new Error(`OpenApiObjectBuilder.pathItem: path '${path}' cannot be specified more than once.`);
        }
        this.target.paths[path] = pathItem;
        return this;
    }

    public pathItems(pathItems: PathsObject): OpenApiObjectBuilder {
        for (const path in pathItems) {
            this.pathItem(path, pathItems[path]);
        }
        return this;
    }

    // Alias for pathItems
    public paths(paths: PathsObject): OpenApiObjectBuilder {
        return this.pathItems(paths);

    }

    public security(security: SecurityObject): OpenApiObjectBuilder {
        this.target.security = security;
        return this;
    }

    public server(server: ServerObject): OpenApiObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    public tag(tag: TagObject): OpenApiObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    public tags(tags: TagsObject): OpenApiObjectBuilder {
        for (const tag in tags) {
            this.tag(tags[tag]);
        }
        return this;

    }

    public asJson(): string {
        return JSON.stringify(
            this.build(),
            (key: string, value: any) => value,
            2
        );
    }

    public asYaml(): string {
        return yaml.stringify(this.build());
    }

    public build(): OpenApiObject {
/* Would be nice to check, but the spec allows none because of ACL constraints
        if (this.target.paths && (Object.keys(this.target.paths).length === 0)) {
            throw new Error("OpenApiBuilder.build:  At least one path must be specified.");
        }
*/
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

// Detailed Object Builders --------------------------------------------------

// Must be declared before use
export class ParameterObjectBuilder {

    constructor(inValue?: ParameterInType, name?: string) {
        this.target = {};
        if (inValue) {
            this.target.in = inValue;
        }
        if (name) {
            this.target.name = name;
        }
    }

    protected target: ParameterObject;

    public allowEmptyValue(allowEmptyValue: boolean): ParameterObjectBuilder {
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    public allowReserved(allowReserved: boolean): ParameterObjectBuilder {
        this.target.allowReserved = allowReserved;
        return this;
    }

    public content(key: string, content: MediaTypeObject): ParameterObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        this.target.content[key] = content;
        return this;
    }

    public deprecated(deprecated: boolean): ParameterObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): ParameterObjectBuilder {
        this.target.description = description;
        return this;
    }

    public example(example: ExampleObject, key?: string): ParameterObjectBuilder {
        if (key) {
            if (!this.target.examples) {
                this.target.examples = {};
            }
            this.target.examples[key] = example;
        } else {
            this.target.example = example;
        }
        return this;
    }

    public explode(explode: boolean): ParameterObjectBuilder {
        this.target.explode = explode;
        return this;
    }

    public required(required: boolean): ParameterObjectBuilder {
        this.target.required = required;
        return this;
    }

    public schema(schema: SchemaObject | ReferenceObject): ParameterObjectBuilder {
        this.target.schema = schema;
        return this;
    }

    public schemas(schemas: SchemasObject): ParameterObjectBuilder {
        for (const name in schemas) {
            this.schema(schemas[name]);
        }
        return this;
    }

    public style(style: ParameterStyleType): ParameterObjectBuilder {
        this.target.style = style;
        return this;
    }

    public build(): ParameterObject {
        // TODO - validation checks (if not already performed)
        if (!this.target.in) {
            throw new Error("ParameterObjectBuilder.build: Missing required 'in' value");
        }
        if (!this.target.name) {
            throw new Error("ParameterObjectBuilder.build: Missing required 'name' value");
        }
        return this.target as ParameterObject;
    }

}

export class ComponentsObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ComponentsObject;

    public callback(name: string, callback: CallbackObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.callbacks) {
            this.target.callbacks = {};
        }
        if (this.target.callbacks[name]) {
            throw new Error(`ComponentsObjectBuilder.callback: Callback '${name}' has already been registered`);
        }
        this.target.callbacks[name] = callback;
        return this;
    }

    public callbacks(callbacks: CallbacksObject): ComponentsObjectBuilder {
        for (const name in callbacks) {
            this.callback(name, callbacks[name]);
        }
        return this;
    }

    public example(name: string, example: ExampleObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.examples) {
            this.target.examples = {};
        }
        if (this.target.examples[name]) {
            throw new Error(`ComponentsObjectBuilder.example: Example '${name}' has already been registered`);
        }
        this.target.examples[name] = example;
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = {};
        }
        if (this.target.headers[name]) {
            throw new Error(`ComponentsObjectBuilder.header: Header '${name}' has already been registered`);
        }
        this.target.headers[name] = header;
        return this;
    }

    public headers(headers: HeadersObject): ComponentsObjectBuilder {
        for (const name in headers) {
            this.header(name, headers[name]);
        }
        return this;
    }

    public link(name: string, link: LinkObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.links) {
            this.target.links = {};
        }
        if (this.target.links[name]) {
            throw new Error(`ComponentsObjectBuilder.link: Link '${name}' has already been registered`);
        }
        this.target.links[name] = link;
        return this;
    }

    public links(links: LinksObject): ComponentsObjectBuilder {
        for (const name in links) {
            this.link(name, links[name]);``
        }
        return this;
    }

    public parameter(name: string, parameter: ParameterObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = {};
        }
        if (this.target.parameters[name]) {
            throw new Error(`ComponentsObjectBuilder.parameter: Parameter '${name}' has already been registered`);
        }
        this.target.parameters[name] = parameter;
        return this;
    }

    public parameters(parameters: ParametersObject): ComponentsObjectBuilder {
        for (const name in parameters) {
            this.parameter(name, parameters[name]);
        }
        return this;
    }

    public requestBodies(requestBodies: RequestBodiesObject): ComponentsObjectBuilder {
        for (const name in requestBodies) {
            this.requestBody(name, requestBodies[name]);
        }
        return this;
    }

    public requestBody(name: string, requestBody: RequestBodyObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.requestBodies) {
            this.target.requestBodies = {};
        }
        if (this.target.requestBodies[name]) {
            throw new Error(`ComponentsObjectBuilder.requestBody: RequestBody '${name}' has already been registered`);
        }
        this.target.requestBodies[name] = requestBody;
        return this;
    }

    public response(statusCode: string, response: ResponseObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.responses) {
            this.target.responses = {};
        }
        if (statusCode === "default") {
            this.target.responses.default = response;
        } else {
            if (this.target.responses[statusCode]) {
                throw new Error(`ComponentsObjectBuilder.response: Response '${statusCode}' has already been registered`);
            }
            this.target.responses[statusCode] = response;
        }
        return this;
    }

    public responses(responses: ResponsesObject): ComponentsObjectBuilder {
        for (const statusCode in responses) {
            this.response(statusCode, responses[statusCode]);
        }
        return this;
    }

    public schema(name: string, schema: SchemaObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.schemas) {
            this.target.schemas = {};
        }
        if (this.target.schemas[name]) {
            throw new Error(`ComponentsObjectBuilder.schema: Schema '${name}' has already been registered`);
        }
        this.target.schemas[name] = schema;
        return this;
    }

    public schemas(schemas: SchemasObject): ComponentsObjectBuilder {
        for (const name in schemas) {
            this.schema(name, schemas[name]);
        }
        return this;
    }

    // TODO: securityScheme

    public build(): ComponentsObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ContactObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ContactObject;

    public email(email: string): ContactObjectBuilder {
        this.target.email = email;
        return this;
    }

    public name(name: string): ContactObjectBuilder {
        this.target.name = name;
        return this;
    }

    public url(url: string): ContactObjectBuilder {
        validateUrl("ContactObjectBuilder.url", url);
        this.target.url = url;
        return this;
    }

    public build(): ContactObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ExternalDocsObjectBuilder {

    constructor(url: string) {
        validateUrl("ExternalDocsObjectBuilder", url);
        this.target = {
            url: url,
        };
    }

    private target: ExternalDocsObject;

    public description (description: string): ExternalDocsObjectBuilder {
        this.target.description = description;
        return this;
    }

    public build(): ExternalDocsObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class HeaderObjectBuilder extends ParameterObjectBuilder {

    public build(): ParameterObject {
        if (this.target.in) {
            throw new Error("HeaderObjectBuilder.build: 'in' is not allowed on HeaderObject");
        }
        if (this.target.name) {
            throw new Error("HeaderObjectBuilder.build: 'name' is not allowed on HeaderObject")
        }
        return this.target;
    }

}

export class InfoObjectBuilder {

    constructor(title: string, version: string) {
        this.target = {
            title: title,
            version: version,
        }
    }

    private target: InfoObject;

    public contact(contact: ContactObject): InfoObjectBuilder {
        this.target.contact = contact;
        return this;
    }

    public description(description: string): InfoObjectBuilder {
        this.target.description = description;
        return this;
    }

    public license(license: LicenseObject): InfoObjectBuilder {
        this.target.license = license;
        return this;
    }

    public server(server: ServerObject): InfoObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    public tag(tag: TagObject): InfoObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    public termsOfService(termsOfService: string): InfoObjectBuilder {
        this.target.termsOfService = termsOfService;
        return this;
    }

    public build(): InfoObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class LicenseObjectBuilder {

    constructor(name: string) {
        this.target = {
            name: name,
        };
    }

    private target: LicenseObject;

    public url(url: string): LicenseObjectBuilder {
        validateUrl("LicenseObjectBuilder.url", url);
        this.target.url = url;
        return this;
    }

    public build(): LicenseObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class MediaTypeObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: MediaTypeObject;

    // TODO: addEncoding()

    public example(example: ExampleObject): MediaTypeObjectBuilder {
        this.target.example = example;
        return this;
    }

    // TODO: examples()

    public schema(schema: SchemaObject | ReferenceObject): MediaTypeObjectBuilder {
        if (this.target.schema) {
            throw new Error("MediaTypeObjectBuilder.schema: Cannot specify more than one schema");
        }
        this.target.schema = schema;
        return this;
    }

    public build(): MediaTypeObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class OperationObjectBuilder {

    constructor() {
        this.target = {
            responses: {},  // Technically required but will always get added
        };
    }

    private target: OperationObject;

    public callback(key: string, callback: CallbackObject): OperationObjectBuilder {
        if (!this.target.callbacks) {
            this.target.callbacks = {};
        }
        this.target.callbacks[key] = callback;
        return this;
    }

    public deprecated(deprecated: boolean): OperationObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): OperationObjectBuilder {
        this.target.description = description;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): OperationObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public operationId(operationId: string): OperationObjectBuilder {
        this.target.operationId = operationId;
        return this;
    }

    public parameter(parameter: ParameterObject | ReferenceObject): OperationObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        this.target.parameters.push(parameter);
        return this;
    }

    public parameters(parameters: ParametersObject): OperationObjectBuilder {
        for (const name in parameters) {
            this.parameter(parameters[name]);
        }
        return this;
    }

    public requestBody(requestBody: RequestBodyObject | ReferenceObject): OperationObjectBuilder {
        this.target.requestBody = requestBody;
        return this;
    }

    public response(statusCode: string, response: ResponseObject | ReferenceObject): OperationObjectBuilder {
        if (!this.target.responses) {
            this.target.responses = {};
        }
        if (statusCode === "default") {
            this.target.responses.default = response;
        } else {
            this.target.responses[statusCode] = response;
        }
        return this;
    }

    public responses(responses: ResponsesObject): OperationObjectBuilder {
        for (const statusCode in responses) {
            this.response(statusCode, responses[statusCode]);
        }
        return this;
    }

    public server(server: ServerObject | ReferenceObject): OperationObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    // TODO: security()

    public summary(summary: string): OperationObjectBuilder {
        this.target.summary = summary;
        return this;
    }

    public tag(tag: string): OperationObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    public build(): OperationObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ParametersObjectBuilder {

    constructor() {
        this.target = {}
    }

    private target: ParametersObject = {};

    public parameter(name: string, parameter: ParameterObject | ReferenceObject) {
        this.target[name] = parameter;
        return this;
    }

    public build(): ParametersObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class PathItemObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: PathItemObject;

    public $ref($ref: string): PathItemObjectBuilder {
        validateRef("PathItemObjectBuilder.$ref", $ref);
        this.target.$ref = $ref;
        return this;
    }

    public delete(_delete: OperationObject): PathItemObjectBuilder {
        if (this.target.delete) {
            throw new Error(`PathItemObjectBuilder.delete: Cannot specify DELETE operation more than once per path.`);
        }
        this.target.delete = _delete;
        return this;
    }

    public description(description: string): PathItemObjectBuilder {
        this.target.description = description;
        return this;
    }

    public get(_get: OperationObject): PathItemObjectBuilder {
        if (this.target.get) {
            throw new Error(`PathItemObjectBuilder.get: Cannot specify GET operation more than once per path.`);
        }
        this.target.get = _get;
        return this;
    }

    public head(head: OperationObject): PathItemObjectBuilder {
        if (this.target.head) {
            throw new Error(`PathItemObjectBuilder.head: Cannot specify HEAD operation more than once per path.`);
        }
        this.target.head = head;
        return this;
    }

    public options(options: OperationObject): PathItemObjectBuilder {
        if (this.target.options) {
            throw new Error(`PathItemObjectBuilder.options: Cannot specify OPTIONS operation more than once per path.`);
        }
        this.target.options = options;
        return this;
    }

    public parameter(parameter: ParameterObject | ReferenceObject): PathItemObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        this.target.parameters.push(parameter);
        return this;
    }

    public parameters(parameters: ParametersObject): PathItemObjectBuilder {
        for (const name in parameters) {
            this.parameter(parameters[name]);
        }
        return this;
    }

    public patch(patch: OperationObject): PathItemObjectBuilder {
        if (this.target.patch) {
            throw new Error(`PathItemObjectBuilder.patch: Cannot specify PATCH operation more than once per path.`);
        }
        this.target.patch = patch;
        return this;
    }

    public post(post: OperationObject): PathItemObjectBuilder {
        if (this.target.post) {
            throw new Error(`PathItemObjectBuilder.post: Cannot specify POST operation more than once per path.`);
        }
        this.target.post = post;
        return this;
    }

    public put(put: OperationObject): PathItemObjectBuilder {
        if (this.target.put) {
            throw new Error(`PathItemObjectBuilder.put: Cannot specify PUT operation more than once per path.`);
        }
        this.target.put = put;
        return this;
    }

    public server(server: ServerObject): PathItemObjectBuilder {
        if (!this.target.server) {
            this.target.servers = [];
        }
        // @ts-ignore
        this.target.servers.push(server);
        return this;
    }

    public summary(summary: string): PathItemObjectBuilder {
        this.target.summary = summary;
        return this;
    }

    public trace(trace: OperationObject): PathItemObjectBuilder {
        if (this.target.trace) {
            throw new Error(`PathItemObjectBuilder.trace: Cannot specify TRACE operation more than once per path.`);
        }
        this.target.trace = trace;
        return this;
    }

    public build(): PathItemObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class PathsObjectBuilder {

    constructor() {
        this.target = {}
    }

    private target: PathsObject = {};

    public path(path: string, pathItem: PathItemObject | ReferenceObject) {
        this.target[path] = pathItem;
        return this;
    }

    public build(): PathsObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

// Shorthand for creating references because they are very common
export class Ref implements ReferenceObject {
    constructor($ref: string) {
        validateRef("Ref", $ref)
        this.$ref = $ref;
    }
    $ref: string;
}

export class ReferenceObjectBuilder {

    constructor($ref: string) {
        validateRef("ReferenceObjectBuilder", $ref);
        this.target = {
            $ref: $ref,
        }
    }

    private target: ReferenceObject;

    public build(): ReferenceObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class RequestBodiesObjectBuilder {

    constructor() {
        this.target = {}
    }

    private target: RequestBodiesObject = {};

    public requestBody(name: string, requestBody: RequestBodyObject | ReferenceObject) {
        this.target[name] = requestBody;
        return this;
    }

    public build(): RequestBodiesObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class RequestBodyObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: RequestBodyObject;

    public content(mediaType: string, content: MediaTypeObject): RequestBodyObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        validateMediaType("RequestBodyObjectBuilder.content", mediaType);
        this.target.content[mediaType] = content;
        return this;
    }

    public description(description: string): RequestBodyObjectBuilder {
        this.target.description = description;
        return this;
    }

    public required(required: boolean): RequestBodyObjectBuilder {
        this.target.required = required;
        return this;
    }

    public build(): RequestBodyObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ResponseObjectBuilder {

    constructor(description: string) {
        this.target = {
            description: description,
        }
    }

    private target: ResponseObject;

    public content(key: string, content: MediaTypeObject): ResponseObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        this.target.content[key] = content;
        return this;
    }

    public header(name: string, header: HeaderObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = {};
        }
        // TODO - case insensitive name dedup!
        if (this.target.headers[name]) {
            throw new Error(`ResponseObjectBuilder.header: Cannot specify header name '${name}' more than once`);
        }
        this.target.headers[name] = header;
        return this;
    }

    public headers(headers: HeadersObject): ResponseObjectBuilder {
        for (const name in headers) {
            this.header(name, headers[name]);
        }
        return this;
    }

    public link(name: string, link: LinkObject | ReferenceObject): ResponseObjectBuilder {
        if (!this.target.links) {
            this.target.links = {};
        }
        if (this.target.links[name]) {
            throw new Error(`ResponseObjectBuilder.link: Cannot specify link name '${name}' more than once`);
        }
        this.target.links[name] = link;
        return this;
    }

    public links(links: LinksObject): ResponseObjectBuilder {
        for (const name in links) {
            this.link(name, links[name]);
        }
        return this;
    }

    public build(): ResponseObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ResponsesObjectBuilder {

    constructor() {
        this.target = {}
    }

    private target: ResponsesObject = {};

    public response(statusCode: string, response: ReferenceObject | ResponseObject, isDefault: boolean = false): ResponsesObjectBuilder {
        this.target[statusCode] = response;
        if (isDefault) {
            this.target.default = response;
        }
        return this;
    }

    public build(): ResponsesObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class SchemaObjectBuilder {

    constructor(type?: TypeType, description?: string, nullable?: boolean) {
        this.target = {
            description: description ? description : undefined,
            type: type ? type : undefined,
        };
        if (nullable !== undefined) {
            this.target.nullable = nullable;
        }
    }

    private target: SchemaObject;

    public deprecated(deprecated: boolean): SchemaObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public description(description: string): SchemaObjectBuilder {
        this.target.description = description;
        return this;
    }

    public example(example: ExampleObject): SchemaObjectBuilder {
        this.target.example = example;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): SchemaObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public format(format: FormatType): SchemaObjectBuilder {
        this.target.format = format;
        return this;
    }

    public items(items: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        this.target.items = items;
        return this;
    }

    public nullable(nullable: boolean): SchemaObjectBuilder {
        this.target.nullable = nullable;
        return this;
    }

    public property(name: string, property: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.properties) {
            this.target.properties = {};
        }
        this.target.properties[name] = property;
        return this;
    }

    public type(type: TypeType): SchemaObjectBuilder {
        this.target.type = type;
        return this;
    }

    public build(): SchemaObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class SchemasObjectBuilder {

    constructor() {
        this.target = {}
    }

    private target: SchemasObject = {};

    public schema(name: string, schema: SchemaObject | ReferenceObject) {
        this.target[name] = schema;
        return this;
    }

    public build(): SchemasObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class SecurityObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: SecurityObject;

    public build(): SecurityObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ServerObjectBuilder {

    constructor(url: string) {
        validateUrl("ServerObjectBuilder", url);
        this.target = {
            url: url,
        };
    }

    private target: ServerObject;

    public description(description: string): ServerObjectBuilder {
        this.target.description = description;
        return this;
    }

    // TODO: variable()

    public build(): ServerObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class TagObjectBuilder {

    constructor(name: string) {
        this.target = {
            name: name,
        };
    }

    private target: TagObject;

    public description(description: string): TagObjectBuilder {
        this.target.description = description;
        return this;
    }

    public externalDocs(externalDocs: ExternalDocsObject): TagObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public build(): TagObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

// Support Methods -----------------------------------------------------------

const validateMediaType = (context: string, mediaType: string) => {
    // TODO - syntax validation
}

const validatePath = (context: string, path: string) => {
    // TODO - more complete syntax validation (template variabless OK)
    if (!path.startsWith("/")) {
        throw new Error(`${context}: Path '${path}' does not start with a slash`);
    }
}

const validateRef = (context: string, ref: string) => {
    // TODO - syntax validation
}

const validateUrl = (context: string, url: string) => {
    // TODO - syntax validation (template variables OK)
}
