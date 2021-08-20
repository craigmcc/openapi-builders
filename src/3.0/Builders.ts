// Builders ------------------------------------------------------------------

// Builder Pattern classes for OpenAPI Specification configuration objects.

// External Modules ----------------------------------------------------------

import * as yaml from "yaml";

// Internal Modules ----------------------------------------------------------

import {
    BaseParameterObject,
    CallbackObject,
    ComponentsObject,
    ContactObject, ContentsObject,
    ExampleObject,
    ExternalDocsObject,
    FormatType,
    HeaderObject,
    InfoObject,
    LicenseObject,
    LinkObject,
    MediaTypeObject,
    OpenApiObject,
    OperationObject,
    ParameterInType,
    ParameterObject,
    ParameterStyleType, PathItemObject,
    PathsObject,
    ReferenceObject,
    RequestBodyObject,
    ResponseObject,
    SchemaObject,
    SecurityObject,
    ServerObject,
    TagObject,
    TypeType,
} from "./types";

export const OPENAPI_VERSION = "3.0";

// Overall Object Builder ----------------------------------------------------

export class OpenApiObjectBuilder {

    constructor(info: InfoObject, paths?: PathsObject) {
        this.target = {
            openapi: OPENAPI_VERSION,
            info: info,
            paths: paths ? paths : {},
        }
    }

    private target: OpenApiObject;

    public addComponents(components: ComponentsObject): OpenApiObjectBuilder {
        this.target.components = components;
        return this;
    }

    public addExternalDocs(externalDocs: ExternalDocsObject): OpenApiObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public addPaths(paths: PathsObject): OpenApiObjectBuilder {
        this.target.paths = paths;
        return this;
    }

    public addSecurity(security: SecurityObject): OpenApiObjectBuilder {
        this.target.security = security;
        return this;
    }

    public addServer(server: ServerObject): OpenApiObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    public addTag(tag: TagObject): OpenApiObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
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
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

// Detailed Object Builders --------------------------------------------------

class BaseParameterObjectBuilder {

    constructor() {
        this.target = {};
    }

    protected target: BaseParameterObject;

    public addAllowEmptyValue(allowEmptyValue: boolean): BaseParameterObjectBuilder {
        this.target.allowEmptyValue = allowEmptyValue;
        return this;
    }

    public addAllowReserved(allowReserved: boolean): BaseParameterObjectBuilder {
        this.target.allowReserved = allowReserved;
        return this;
    }

    public addContent(key: string, content: MediaTypeObject): BaseParameterObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        this.target.content[key] = content;
        return this;
    }

    public addDeprecated(deprecated: boolean): BaseParameterObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public addDescription(description: string): BaseParameterObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addExample(example: ExampleObject, key?: string): BaseParameterObjectBuilder {
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

    public addExplode(explode: boolean): BaseParameterObjectBuilder {
        this.target.explode = explode;
        return this;
    }

    public addRequired(required: boolean): BaseParameterObjectBuilder {
        this.target.required = required;
        return this;
    }

    public addSchema(schema: SchemaObject | ReferenceObject): BaseParameterObjectBuilder {
        this.target.schema = schema;
        return this;
    }

    public addStyle(style: ParameterStyleType): BaseParameterObjectBuilder {
        this.target.style = style;
        return this;
    }

    public build(): BaseParameterObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

export class ComponentsObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: ComponentsObject;

    public addCallback(key: string, callback: CallbackObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.callbacks) {
            this.target.callbacks = {};
        }
        this.target.callbacks[key] = callback;
        return this;
    }

    public addExample(key: string, example: ExampleObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.examples) {
            this.target.examples = {};
        }
        this.target.examples[key] = example;
        return this;
    }

    public addHeader(key: string, header: HeaderObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = {};
        }
        this.target.headers[key] = header;
        return this;
    }

    public addLink(key: string, link: LinkObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.links) {
            this.target.links = {};
        }
        this.target.links[key] = link;
        return this;
    }

    public addParameter(key: string, parameter: ParameterObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = {};
        }
        this.target.parameters[key] = parameter;
        return this;
    }

    public addRequestBody(key: string, requestBody: RequestBodyObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.requestBodies) {
            this.target.requestBodies = {};
        }
        this.target.requestBodies[key] = requestBody;
        return this;
    }

    public addResponse(key: string, response: ResponseObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.responses) {
            this.target.responses = {};
        }
        if (key === "default") {
            this.target.responses.default = response;
        } else {
            this.target.responses[key] = response;
        }
        return this;
    }

    public addSchema(key: string, schema: SchemaObject | ReferenceObject): ComponentsObjectBuilder {
        if (!this.target.schemas) {
            this.target.schemas = {};
        }
        this.target.schemas[key] = schema;
        return this;
    }

    // TODO: addSecurityScheme

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

    public addEmail(email: string): ContactObjectBuilder {
        this.target.email = email;
        return this;
    }

    public addName(name: string): ContactObjectBuilder {
        this.target.name = name;
        return this;
    }

    public addUrl(url: string): ContactObjectBuilder {
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
        this.target = {
            url: url,
        };
    }

    private target: ExternalDocsObject;

    public addDescription (description: string): ExternalDocsObjectBuilder {
        this.target.description = description;
        return this;
    }

    public build(): ExternalDocsObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

class HeaderObjectBuilder extends BaseParameterObjectBuilder {

    public build(): HeaderObject {
        // TODO - validation checks (if not already performed)
        return this.target as HeaderObject;
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

    public addContact(contact: ContactObject): InfoObjectBuilder {
        this.target.contact = contact;
        return this;
    }

    public addDescription(description: string): InfoObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addLicense(license: LicenseObject): InfoObjectBuilder {
        this.target.license = license;
        return this;
    }

    public addServer(server: ServerObject): InfoObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    public addTag(tag: TagObject): InfoObjectBuilder {
        if (!this.target.tags) {
            this.target.tags = [];
        }
        this.target.tags.push(tag);
        return this;
    }

    public addTermsOfService(termsOfService: string): InfoObjectBuilder {
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

    public addUrl(url: string): LicenseObjectBuilder {
        this.target.url = url;
        return this;
    }

    public build(): LicenseObject {
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

    public addCallback(key: string, callback: CallbackObject): OperationObjectBuilder {
        if (!this.target.callbacks) {
            this.target.callbacks = {};
        }
        this.target.callbacks[key] = callback;
        return this;
    }

    public addDeprecated(deprecated: boolean): OperationObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public addDescription(description: string): OperationObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addExternalDocs(externalDocs: ExternalDocsObject): OperationObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public addOperationId(operationId: string): OperationObjectBuilder {
        this.target.operationId = operationId;
        return this;
    }

    public addParameter(parameter: ParameterObject | ReferenceObject): OperationObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        this.target.parameters.push(parameter);
        return this;
    }

    public addRequestBody(requestBody: RequestBodyObject | ReferenceObject): OperationObjectBuilder {
        this.target.requestBody = requestBody;
        return this;
    }

    public addResponse(key: string, response: ResponseObject): OperationObjectBuilder {
        if (!this.target.responses) {
            this.target.responses = {};
        }
        this.target.responses[key] = response;
        return this;
    }

    public addServer(server: ServerObject | ReferenceObject): OperationObjectBuilder {
        if (!this.target.servers) {
            this.target.servers = [];
        }
        this.target.servers.push(server);
        return this;
    }

    // TODO: addSecurity()

    public addSummary(summary: string): OperationObjectBuilder {
        this.target.summary = summary;
        return this;
    }

    public addTag(tag: string): OperationObjectBuilder {
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

class ParameterObjectBuilder extends BaseParameterObjectBuilder {

    constructor(inValue: ParameterInType, name: string) {
        super();
        this.target = {
            in: inValue,
            name: name,
        };
    }

    public build(): ParameterObject {
        // TODO - validation checks (if not already performed)
        return this.target as ParameterObject;
    }

}

class PathItemObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: PathItemObject;

    public add$Ref($ref: string): PathItemObjectBuilder {
        this.target.$ref = $ref;
        return this;
    }

    public addDelete(_delete: OperationObject): PathItemObjectBuilder {
        this.target.delete = _delete;
        return this;
    }

    public addDescription(description: string): PathItemObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addGet(_get: OperationObject): PathItemObjectBuilder {
        this.target.get = _get;
        return this;
    }

    public addHead(head: OperationObject): PathItemObjectBuilder {
        this.target.head = head;
        return this;
    }

    public addOptions(options: OperationObject): PathItemObjectBuilder {
        this.target.options = options;
        return this;
    }

    public addParameter(parameter: ParameterObject | ReferenceObject): PathItemObjectBuilder {
        if (!this.target.parameters) {
            this.target.parameters = [];
        }
        this.target.parameters.push(parameter);
        return this;
    }

    public addPatch(patch: OperationObject): PathItemObjectBuilder {
        this.target.patch = patch;
        return this;
    }

    public addPost(post: OperationObject): PathItemObjectBuilder {
        this.target.post = post;
        return this;
    }

    public addServer(server: ServerObject): PathItemObjectBuilder {
        if (!this.target.server) {
            this.target.servers = [];
        }
        // @ts-ignore
        this.target.servers.push(server);
        return this;
    }

    public addSummary(summary: string): PathItemObjectBuilder {
        this.target.summary = summary;
        return this;
    }

    public addTrace(trace: OperationObject): PathItemObjectBuilder {
        this.target.trace = trace;
        return this;
    }

    public build(): PathItemObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

// Shorthand for creating references because they are very common
export class Ref implements ReferenceObject {
    constructor($ref: string) {
        this.$ref = $ref;
    }
    $ref: string;
}

export class ReferenceObjectBuilder {

    constructor($ref: string) {
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

export class RequestBodyObjectBuilder {

    constructor() {
        this.target = {};
    }

    private target: RequestBodyObject;

    public addContent(key: string, content: MediaTypeObject): RequestBodyObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        this.target.content[key] = content;
        return this;
    }

    public addDescription(description: string): RequestBodyObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addRequired(required: boolean): RequestBodyObjectBuilder {
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

    public addContent(key: string, content: MediaTypeObject): ResponseObjectBuilder {
        if (!this.target.content) {
            this.target.content = {};
        }
        this.target.content[key] = content;
        return this;
    }

    public addHeader(key: string, header: HeaderObject): ResponseObjectBuilder {
        if (!this.target.headers) {
            this.target.headers = {};
        }
        this.target.headers[key] = header;
        return this;
    }

    public addLink(key: string, link: LinkObject): ResponseObjectBuilder {
        if (!this.target.links) {
            this.target.links = {};
        }
        this.target.links[key] = link;
        return this;
    }

    private target: ResponseObject;

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

    public addDeprecated(deprecated: boolean): SchemaObjectBuilder {
        this.target.deprecated = deprecated;
        return this;
    }

    public addDescription(description: string): SchemaObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addExternalDocs(externalDocs: ExternalDocsObject): SchemaObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public addFormat(format: FormatType): SchemaObjectBuilder {
        this.target.format = format;
        return this;
    }

    public addNullable(nullable: boolean): SchemaObjectBuilder {
        this.target.nullable = nullable;
        return this;
    }

    public addProperty(name: string, property: SchemaObject | ReferenceObject): SchemaObjectBuilder {
        if (!this.target.properties) {
            this.target.properties = {};
        }
        this.target.properties[name] = property;
        return this;
    }

    public addType(type: TypeType): SchemaObjectBuilder {
        this.target.type = type;
        return this;
    }

    public build(): SchemaObject {
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
        this.target = {
            url: url,
        };
    }

    private target: ServerObject;

    public addDescription(description: string): ServerObjectBuilder {
        this.target.description = description;
        return this;
    }

    // TODO: addVariable()

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

    public addDescription(description: string): TagObjectBuilder {
        this.target.description = description;
        return this;
    }

    public addExternalDocs(externalDocs: ExternalDocsObject): TagObjectBuilder {
        this.target.externalDocs = externalDocs;
        return this;
    }

    public build(): TagObject {
        // TODO - validation checks (if not already performed)
        return this.target;
    }

}

