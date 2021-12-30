// types ---------------------------------------------------------------------

// Typescript types for OpenAPI 3.0 Builders.

// Overall Configuration Object ----------------------------------------------

// OpenApiObject - Overall Open API Specification configuration
// NOTE - PartialTest
export interface OpenApiObject extends SpecificationExtension {
    openapi: string;
    components?: ComponentsObject;
    externalDocs?: ExternalDocsObject;
    info: InfoObject;
    paths: PathsObject;
    security?: SecurityObject;
    servers?: ServerObject[];
    tags?: TagObject[];
}

// Detailed Configuration Objects --------------------------------------------

// Single Callback instance
// NOTE - NoTest
export interface CallbackObject extends SpecificationExtension {
    [name: string]: PathItemObject; // | any ???
}

// Set of Callbacks, keyed by ???
// NOTE - NoTest
export interface CallbacksObject extends SpecificationExtension {
    [name: string]: CallbackObject | ReferenceObject; // | any ???
}

// Various components of an overall application
// NOTE - PartialBuilder PartialTest
export interface ComponentsObject extends SpecificationExtension {
    callbacks?: CallbacksObject;
    examples?: ExamplesObject;
    headers?: HeadersObject;
    links?: LinksObject;
    parameters?: ParametersObject;
    requestBodies?: RequestBodiesObject;
    responses?: ResponsesObject;
    schemas?: SchemasObject;
    // NOTE - securitySchemes?: SecuritySchemesObject;
}

// Contact information for application developer(s)
export interface ContactObject extends SpecificationExtension {
    email?: string;
    name?: string;
    url?: string;
}

// Information about media types, keyed by media type
// NOTE - SkipBuilder NoTest
export interface ContentsObject {
    [mediaType: string]: MediaTypeObject;
}

// A particular example
// NOTE - NoBuilder NoTest
export interface ExampleObject extends SpecificationExtension {
    description?: string;
    externalValue?: string; // URL to an example
    summary?: string;
    value?: any; // Literal example
}

// Set of examples, keyed by example name
// NOTE - NoTest
export interface ExamplesObject {
    [name: string]: ExampleObject | ReferenceObject;
}

// External documentation pointer
export interface ExternalDocsObject extends SpecificationExtension {
    description?: string;
    url: string;
}

// Single HTTP Header
// NOTE - NoTest
export interface HeaderObject extends ParametersObject {
    // "in" is disallowed
    // "name" is disallowed
}

// Information about HTTP Headers, keyed by header name
// NOTE - NoTest
export interface HeadersObject {
    [name: string]: HeaderObject | ReferenceObject;
}

// General application information
// NOTE - PartialTest
export interface InfoObject extends SpecificationExtension {
    contact?: ContactObject;
    description?: string;
    license?: LicenseObject;
    servers?: ServerObject[];
    termsOfService?: string;
    title: string;
    version: string;
}

// Application license information
export interface LicenseObject extends SpecificationExtension {
    name: string;
    url?: string;
}

// Information about a particular HTTP Link
// NOTE - PartialObject NoBuilder NoTest
export interface LinkObject extends SpecificationExtension {
    description?: string;
    operationId?: string;
    operationRef?: string;
    // parameters?: LinkParametersObject; // NOTE - ???
    requestBody: any | string; // NOTE - ???
    server?: ServerObject;
}

// Information about HTTP links, keyed by name
// NOTE - NoTest
export interface LinksObject {
    [name: string]: LinkObject | ReferenceObject;
}

// Characteristics of a media type
// NOTE - PartialBuilder NoTest
export interface MediaTypeObject extends SpecificationExtension {
    // encoding?: string; // NOTE - Map???
    example?: any;
    examples?: { [name: string]: any };
    schema?: SchemaObject | ReferenceObject;
}

// Information about a specific HTTP operation on a path
// NOTE - PartialBuilder PartialTest
export interface OperationObject extends SpecificationExtension {
    callbacks?: CallbacksObject;
    deprecated?: boolean;
    description?: string;
    externalDocs?: ExternalDocsObject;
    operationId?: string;
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    responses: ResponsesObject;
    // security
    servers?: (ServerObject | ReferenceObject)[];
    summary?: string;
    tags?: string[];
}

// Description of a general parameter, not otherwise specialized
// NOTE - PartialBuilder PartialTest
export interface ParameterObject extends SpecificationExtension {
    allowEmptyValue?: boolean;
    allowReserved?: boolean;
    content?: ContentsObject;
    deprecated?: boolean;
    description?: string;
    example?: any;
    examples?: ExamplesObject;
    explode?: boolean;
    in?: ParameterInType;       // Required in some parameter definitions
    name? : string;             // Required in some parameter definitions
    required?: boolean;
    schema?: SchemaObject | ReferenceObject;
    style?: ParameterStyleType;
}

// Information about multiple Parameters, keyed by parameter name
// NOTE - NoTest
export interface ParametersObject {
    [name: string]: ParameterObject | ReferenceObject;
}

// A specific endpoint path with associated operations
// NOTE - NoTest
export interface PathItemObject extends SpecificationExtension {
    $ref?: string;
    delete?: OperationObject;
    description?: string;
    get?: OperationObject;
    head?: OperationObject;
    options?: OperationObject;
    parameters?: (ParameterObject | ReferenceObject)[];
    patch?: OperationObject;
    post?: OperationObject;
    put?: OperationObject;
    servers?: ServerObject[];
    summary?: string;
    trace?: OperationObject;
}

// Available endpoint paths, keyed by path
// NOTE - NoTest
export interface PathsObject extends SpecificationExtension {
    [path: string]: PathItemObject | ReferenceObject;
}

// A reference to other objects, either internal or external
export interface ReferenceObject { // NOTE: No SpecificationExtension here
    $ref: string;
}

// Describes a set of RequestBodyObjects, keyed by ???
// NOTE - NoTest
export interface RequestBodiesObject {
    [name: string]: RequestBodyObject | ReferenceObject;
}

// Describes a single request body
// NOTE - NoTest
export interface RequestBodyObject extends SpecificationExtension {
    content?: ContentsObject;
    description?: string;
    required?: boolean;
}

// Describes a single response
// NOTE - NoTest
export interface ResponseObject extends SpecificationExtension {
    content?: ContentsObject;
    description: string;
    headers?: HeadersObject;
    links?: LinksObject;
}

// Describes a set of possible responses, keyed by HTTP status code
// NOTE - NoTest
export interface ResponsesObject extends SpecificationExtension {
    // @ts-ignore
    default?: ResponseObject | ReferenceObject;
    [statusCode: string]: ResponseObject | ReferenceObject;
}

// Characteristics of an individual field in a schema
// NOTE - PartialBuilder PartialTest
export interface SchemaObject extends SpecificationExtension {
    // NOTE - additionalProperties, allOf, anyOf, default,
    // NOTE - discriminator, enum, example,
    // NOTE - exclusiveMaximum, exclusiveMinimum, maximum,
    // NOTE - maxItems, maxLength, maxProperties, minimum, minItems,
    // NOTE - minLength, minProperties, multipleOf, not, oneOf,
    // NOTE - pattern, properties, readOnly, required, title,
    // NOTE - uniqueItems, xml, writeOnly,
    deprecated?: boolean;
    description?: string;
    example?: ExampleObject;
    externalDocs?: ExternalDocsObject;
    format?: FormatType;
    items?: SchemaObject | ReferenceObject;
    nullable?: boolean;
    properties?: { [name: string]: SchemaObject | ReferenceObject };
    type?: TypeType;
}

// Information about Schemas, keyed by schema name
// NOTE - NoTest
export interface SchemasObject {
    [name: string]: SchemaObject | ReferenceObject;
}

// Information about application security requirements
// NOTE - NoBuilder NoTest
export interface SecurityObject extends SpecificationExtension {
    // NOTE - not yet implemented
}

// Information about a particular server
// NOTE - PartialBuilder NoTest
export interface ServerObject extends SpecificationExtension {
    description?: string;
    url: string;
    // variables: ServerVariablesObject;
}

// Shared interface for extendable aspects
// Name must start with "x-", enforced via code checks
export interface SpecificationExtension {
    [extensionName: string]: any;
}

// Information about a particular tag
export interface TagObject extends SpecificationExtension {
    description?: string;
    externalDocs?: ExternalDocsObject;
    name: string;
}

// Available tag descriptions, keyed by tag name
// NOTE - NoTest
export interface TagsObject extends SpecificationExtension {
    [tag: string]: TagObject;
}

// Primitive Types -----------------------------------------------------------

// Data formats for a SchemaObject
export type FormatType =
    "binary" |
    "byte" |
    "date" |
    "date-time" |
    "double" |
    "float" |
    "int32" |
    "int64" |
    "password" |
    "string"
;

// Locations for parameters
export type ParameterInType =
    "cookie" |
    "header" |
    "path" |
    "query"
;

// Styles for parameters
export type ParameterStyleType =
    "deepObject" |
    "form" |
    "label" |
    "matrix" |
    " pipeDelimited" |
    "simple" |
    "spaceDelimited"
;

// Data types for a SchemaObject
export type TypeType =
    "array" |
    "boolean" |
    "integer" |
    "null" |
    "number" |
    "object" |
    "string"
;
