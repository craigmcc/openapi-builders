// types.ts

/**
 * Type definitions for supported components of the OpenAPI 3.1 Specification.
 * These are defined in the
 * [OpenAPI 3.1 Specification](https://github.com/OAI/OpenAPI-Specification/blob/3.1.0/versions/3.1.0.md)
 * which includes examples of each object type.
 *
 * @packageDocumentation
 */

export type InType = "cookie" | "header" | "path" | "query";

/**
 * Format validations defined in the [spec](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01).
 */
export type SchemaFormatType =
    "date" | "date-time" | "duration" | "email" | "hostname" |
    "idn-email" | "idn-hostname" | "ipv4" | "ipv6" | "iri" |
    "iri-reference" | "json-pointer|" | "regex" |
    "relative-json-pointer" | "time" | "uri" | "uri-reference" |
    "uri-template" | "uuid";

export type SchemaObjectType =
    "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";

/**
 * A map of possible out-of-band callbacks related to the parent operation.
 * Each value in the map is a `Path Item Object` that describes a set of
 * requests that may be initiated by the API provider and the expected
 * responses.  The key value used to identify the path item object is an
 * expression, evaluated at runtime, that identifies a URL to use for the
 * callback operation.
 *
 * To describe incoming requests from the API provider, independent of
 * another API call, use the `webhooks` field.
 */
export interface CallbackObject extends SpecificationExtension {

    [expression: string]: PathItemObject | ReferenceObject;

}

/**
 * A set of reusable objects for different aspects of the exposed API.
 * All objects defined within the `components` object will have no effect
 * on the API unless they are explicitly referenced from properties
 * outside the `components` object.
 *
 * The keys in each map MUST match the regular expression
 * `[a-zA-Z0-9\.\-_]`.
 */
export interface ComponentsObject extends SpecificationExtension {
    callbacks?: Map<string, CallbackObject | ReferenceObject>;
    examples?: Map<string, ExampleObject | ReferenceObject>;
    headers?: Map<string, HeaderObject | ReferenceObject>;
    links?: Map<string, LinkObject | ReferenceObject>;
    parameters?: Map<string, ParameterObject | ReferenceObject>;
    pathItems?: Map<string, PathItemObject | ReferenceObject>;
    requestBodies?: Map<string, RequestBodyObject | ReferenceObject>;
    responses?: Map<string, ResponseObject | ReferenceObject>;
    schemas?: Map<string, SchemaObject | ReferenceObject>;
    securitySchemes?: Map<string, SecuritySchemeObject | ReferenceObject>;
}

/**
 * Contact information for the exposed API.
 */
export interface ContactObject extends SpecificationExtension {

    /**
     * Email address of the contact person or organization.
     */
    email?: string;

    /**
     * The identifying name of the contact person or organization.
     */
    name?: string;

    /**
     * URL pointing to the contact information.
     */
    url?: string;

}

/**
 * An example of usage of a particular object type.
 */
export interface ExampleObject extends SpecificationExtension {

    /**
     * Long description for the example.
     * (CommonMark syntax)[https://spec.commonmark.org/] MAY be used
     * for rich text representation.
     */
    description?: string;

    /**
     * URI that points to the literal example.  This provides the
     * capability to reference examples that cannot easily be included
     * in JSON or YAML documents.  The `value` field and
     * `externalValue` are mutually exclusive.
     */
    externalValue?: string;

    /**
     * Short description for the example.
     */
    summary?: string;

    /**
     * Embedded literal example.  The `value` field and `externalValue` are
     * mutually exclusive.
     */
    value?: any;

}

/**
 * Reference to an external resource for extended information about the
 * exposed API.
 */
export interface ExternalDocsObject extends SpecificationExtension {

    /**
     * Description of the target documentation.
     * (CommonMark syntax)[https://spec.commonmark.org/] MAY be used
     * for rich text representation.
     */
    description?: string;

    /**
     * URL for the target documentation.
     */
    url: string;

}

/**
 * Follows the structure of the `Parameter Object` with the following changes:
 * * `name` MUST NOT be specified, it is given in the corresponding header map.
 * * `in` MUST NOT be specified, it is implicitly in `header`.
 * * All traits that are affected by the location MUST be applicable to a
 *   location of `header` (for example, `style`).
 */
export interface HeaderObject extends ParameterObject {
    // "in" is disallowed, is implicitly "header"
    // "name" is disallowed, is implicitly the map key
}

/**
 * Metadata about the API.  The metadata MAY be used by the clients if needed,
 * and MAY be presented in editing or documentation generation tools for convenience.
 */
export interface InfoObject extends SpecificationExtension {

    /**
     * Contact information for the exposed API.
     */
    contact?: ContactObject;

    /**
     * A description of this API.  (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * License information for the exposed API.
     */
    license?: LicenseObject;

    /**
     * A short summary of this API.
     */
    summary?: string;

    /**
     * URL to the Terms of Service for this API.
     */
    termsOfService?: string;

    /**
     * Title of this API
     */
    title: string;

    /**
     * Version of the API documented by this OpenAPI document.
     * This is NOT the same as the OpenAPI Specification version
     * that this document corresponds to.
     */
    version: string;

}

/**
 * License information for the exposed API.
 */
export interface LicenseObject extends SpecificationExtension {

    /**
     * An (SPDX)[https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60]
     * license expression for the exposed API.  The *identifier* field
     * is mutually exclusive of the *identifier* field.
     */
    identifier?: string;

    /**
     * License name used for the exposed API.
     */
    name: string;

    /**
     * URL to the license used for the exposed API.  The *url* field is
     * mutually exclusive of the *identifier* field.
     */
    url?: string;

}

/**
 * Represents a possible design-time link for a response.  The presence
 * of a link does not guarantee the caller's ability to successfully invoke
 * it, rather it provides a known relationship and traversal mechanism
 * between responses and operations.
 *
 * Unlike *dynamic* links (i.e. links provided *in* the response payload),
 * the OAS linking mechanism does not require link information in the
 * runtime response.
 *
 * For computing links, and providing instructions to execute them, a
 * `runtime expression` is used for accessing values in an operation and using
 * them as parameters while invoking the linked operation.
 *
 * A linked operation MUST be identified using either an `operationRef` or
 * `operationId`.  In the case of an `operationId`, it MUST be unique and
 * resolved in the scope of the OAS document.  Because of the potential for
 * name clashes, the `operationRef` syntax is preferred for OpenAPI
 * documents with external references.
 */
export interface LinkObject extends SpecificationExtension {

    /**
     * A description of the link.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * The name of an *existing*, resolvable OAS operation, as defined with
     * a unique `operationId`.  This field is mutually exclusive of the
     * `operationRef` field.
     */
    operationId?: string;

    /**
     * A relative or absolute URI reference to an OAS operation.  This field
     * is mutually exclusive of the `operationId` field, and MUST point to
     * an `Operation Object`.  Relative `operationRef` values MAY be used
     * to locate an existing `Operation Object` in the OpenAPI definition.
     * See the rules for resolving `Relative References`.
     */
    operationRef?: string;

    /**
     * Map representing parameters to pass to an operation as specified with
     * `operationId` or identified via `operationRef`.  The key is the
     * parameter name to be used, whereas the value can be a constant or an
     * expression to be evaluated and passed to the linked operation.  The
     * parameter name can be qualified using the `parameter location`
     * `[{in}].{name}` for operations that use the same parameter name
     * in different locations (e.g. `path.id`).
     */
    parameters?: Map<string, any>;

    /**
     * A literal value or *{expression}* to use as a request body when calling
     * the target operation.
     */
    requestBody?: any;

    /**
     * A server object to be used by the target operation.
     */
    server?: ServerObject;

}

/**
 * Provides schema and examples for the media type identified by its key.
 */
export interface MediaTypeObject extends SpecificationExtension {

    /**
     * A map between a property name and its encoding information.
     * The key, being the property name, MUST exist in the schema
     * property.  The encoding object SHALL only apply to
     * `requestBody` objects when the media type is `multipart` or
     * `application/x-www-form-urlencoded`.
     */
    // TODO - encoding?: Map<string, EncodingObject>;

    /**
     * Example of the media type.  The example object SHOULD be in the
     * correct format as specified by the media type.  The `example`
     * field is mutually exclusive with the `examples` field.  Furthermore,
     * if referencing a `schema` which contains an example, the example
     * value SHALL *override* the example provided in the schema.
     */
    example?: ExampleObject | ReferenceObject; // Spec says "any" ???

    /**
     * Examples of the media type.  Each example object SHOULD match the
     * media type and specified schema, if present.  The `example` field
     * is mutually exclusive with the `examples` field.  Furthermore, if
     * referencing a `schema` which contains an example, the `examples`
     * value SHALL *override* the example provided by the schema.
     */
    examples?: Map<string, ExampleObject | ReferenceObject>;

    /**
     * The schema defining the content of the request, response, or
     * parameter.
     */
    schema?: SchemaObject | ReferenceObject;

}

/**
 * "OpenAPI" root object.
 */
export interface OpenApiObject extends SpecificationExtension {

    /**
     * The various schemas for the document.
     */
    components?: ComponentsObject;

    /**
     * References to additional external documentation.
     */
    externalDocs?: ExternalDocsObject;

    /**
     * Metadata about this API.
     */
    info: InfoObject;

    /**
     * URL for the default value for the `$schema` keyword within
     * (Schema Objects)[https://github.com/OAI/OpenAPI-Specification/blob/3.1.0/versions/3.1.0.md#schemaObject]
     * contained within this document.
     */
    jsonSchemaDialect?: string;

    /**
     * The version number of the OpenAPI Specification that this document uses.
     * Will be set to "3.1" for this implementation.
     */
    openapi: string;

    /**
     * The available paths and operations for this API.
     */
    paths?: PathsObject;

    /**
     * Declaration of which security mechanisms can be used across this API.
     * The list of values includes alternative security requirement objects
     * that can be used.  Only one of the security requirement objects
     * needs to be satisfied to authorize a request.  Individual operations
     * can override this definition.
     */
    security?: SecurityRequirementsObject[];

    /**
     * Array of Server Objects, which provide connectivity information to a
     * target server.  If not provided, or is an empty array, the default value
     * will be a ServerObject with a *url* value of `/`.
     */
    servers?: ServerObject[];

    /**
     * List of tags used by the document with additional metadata.
     */
    tags?: TagObject[];

    /**
     * The incoming webhooks that MAY be received as part of this API, and
     * that the API consumer MAY choose to implement.
     */
    webhooks?: Map<string, PathItemObject | ReferenceObject>;

}

/**
 * Describes a single API operation on a path.
 */
export interface OperationObject extends SpecificationExtension {

    /**
     * A map of possible out-of-band callbacks related to the parent
     * operation.  The key is a unique identifier for the Callback
     * Object.  Each value in the map is a `Callback Object` that
     * describes a request that may be initiated by the API provider
     * and the expected responses.
     */
    callbacks?: Map<string, CallbackObject | ReferenceObject>;

    /**
     * Declares this operation to be deprecated.  Consumers SHOULD refrain
     * from usage of the declared operation.  Default value is `false`.
     */
    deprecated?: boolean;

    /**
     * A verbose explanation of the operation behavior.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * Additional external documentation for this operation.
     */
    externalDocs?: ExternalDocsObject;

    /**
     * Unique string used to identify the operation.  The id
     * MUST be unique among all operations described in the API.
     * The operationId value is *case-sensitive*.  Tools and
     * libraries MAY use the operationId to uniquely identify an
     * operation, therefore, it is RECOMMENDED to follow common
     * programming naming conventions.
     */
    operationId?: string;

    /**
     * A list of parameters that are applicable for this operation.  If a
     * parameter is already defined at the `Path Item`, the new definition
     * will override it but can never remove it.  The list MUST NOT include
     * duplicated parameters.  A unique parameter is defined by a combination
     * of a `name` and `location`.  The list can use the `Reference Object`
     * to link to parameters that are defined in the `parameters` field of
     * the `components` object.
     */
    parameters?: (ParameterObject | ReferenceObject)[];

    /**
     * The request body applicable for this operation.  The `requestBody` is
     * fully supported in HTTP methods where the HTTP 1.1 specification
     * `RFC7231` has explicitly defined semantics for request bodies.  In
     * other cases where the HTTP spec is vague (such as `GET`, `HEAD`, and
     * `DELETE`), `requestBody` is permitted but does not have well-defined
     * semantics and SHOULD be avoided if possible.
     */
    requestBody?: RequestBodyObject | ReferenceObject;

    /**
     * The list of possible responses as they are returned from executing
     * this operation.
     */
    responses?: ResponsesObject;

    /**
     * A declaration of which security mechanisms can be used for this
     * operation.  The list of values includes alternative security
     * requirement objects that can be used.  Only one of the security
     * requirement objects need to be satisfied to authorize a request.
     * To make security optional, an empty security requirement (`{}`)
     * can be included in the array.  This definition overrides any
     * declared top-level `security`.  To remove a top-level security
     * declaration, an empty array can be used.
     */
    security?: SecurityRequirementsObject;

    /**
     * An alternative `server` array to service this operation.  If an
     * alternative `server` object is specified at the Path Item Object
     * or Root level, it will be overridden by this value.
     */
    servers?: ServerObject[];

    /**
     * A short summary of what the operation does.
     */
    summary?: string;

    /**
     * A list of tags for API documentation control.  Tags can be used
     * for logical grouping of operations by resources or any other
     * qualifier.
     */
    tags?: TagObject[];

}

/**
 * Describes a single operation parameter.  A unique parameter is defined
 * by a combination of a `name` and `location`.
 *
 * The rules for serialization of the parameter are specified in one of two
 * ways.  For simpler scenarios, a `schema` and `style` can describe the
 * structure and syntax of the parameter.
 *
 * For more complex scenarios, the `content` property can define the media
 * type and schema of the parameter.  A parameter MUST contain either a
 * `schema` property or a `content` property, but not both.  When `example`
 * or `examples` are provided in conjunction with the `schema` object,
 * the example MUST follow the prescribed serialization strategy for the
 * parameter.
 */
export interface ParameterObject extends SpecificationExtension {

    /**
     * Sets the ability to pass empty-valued parameters.  This is valid only
     * for `query` parameters and allows sending a parameter with an empty
     * value.  Default value is `false`.
     */
    allowEmptyValue?: boolean;

    /**
     * Determines whether the parameter value SHOULD allow reserved characters,
     * as defined by `RFC3986` to be included without percent-encoding.  This
     * property only applies to parameters with an `in` value of `query`.
     * The default value is `false`.
     */
    allowReserved?: boolean;

    // TODO - needs `content` property, mutually exclusive with `schema`, only one value in the map?

    /**
     * Specifies that a parameter is deprecated and SHOULD be transitioned
     * out of usage.  Default value is `false`.
     */
    deprecated?: boolean;

    /**
     * A brief description of the parameter.  This could contain
     * examples of use.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * Example of the parameter's potential value.  The example SHOULD
     * match the specified schema and encoding properties if present.
     * The `example` field is mutually exclusive of the `examples` field.
     * Furthermore, if referencing a `schema` that contains an example,
     * the `example` value SHALL *override* the example given in the
     * schema.  To represent examples of media types that cannot naturally
     * be represented in JSON or YAML, a string value can contain the
     * example with escaping where necessary.
     */
    example?: ExampleObject | ReferenceObject; // Spec says "any" ???

    /**
     * Examples of the parameter's potential value.  Each example SHOULD
     * contain a value in the correct format as specified in the parameter
     * encoding.  The `examples` field is mutually exclusive with the
     * `example` field.  Furthermore, if referencing a `schema` that
     * contains an example, the `examples` value SHALL override the example
     * provided by the schema.
     */
    examples?: Map<string, ExampleObject | ReferenceObject>;

    /**
     * When this is true, parameter values of type `array` or `object`
     * generate separate parameters for each value of the array or
     * key-value pair of the map.  For other types of parameters, this
     * property has no effect.  When `style` is `form`, the default value
     * is `true`.  For all other styles, the default value is `false`.
     */
    explode?: boolean;

    /**
     * The location of the parameter.  Possible values are "query",
     * "header", "path", or "cookie".
     */
    in: InType;

    /**
     * Name of the parameter.  Parameter names are *case-sensitive*.
     * * If `in` is "path", the `name` field MUST correspond to a template
     *   expression occurring within the `path` field in the `Paths Object`.
     * * If `in` is "header" and the `name` field is "Accept",
     *   "Content-Type", or "Authorization", the parameter definition
     *   SHALL be ignored.
     * * For all other cases, the `name` corresponds to the parameter name
     *   used by the `in` property.
     */
    name: string;

    /**
     * Determines whether this parameter is mandatory.  If the
     * `parameter location` is "path", this property is REQUIRED and its
     * value must be `true`.  Otherwise, the property MAY be included and
     * its default value is `false`.
     */
    required?: boolean;

    /**
     * The schema defining the type used for the parameter.
     */
    schema?: SchemaObject | ReferenceObject;

    /**
     * Describes how the parameter value will be serialized depending on the
     * type of the parameter value.  Default values (based on the value
     * of `in`):
     * * For `query` - `form`.
     * * For `path` - `simple`.
     * * For `header` - `simple`.
     * * For `cookie` - `form`.
     */
    style?: string;
    // TODO - see spec for specific values

}

/**
 * A set of parameters, keyed by `name`.  This is not an official object type
 * in OpenAPI, but is a convenience for composing more complicated objects.
 */
export interface ParametersObject {

    /**
     * Map of included ParameterObjects, keyed by parameter name.
     */
    [name: string]: ParameterObject | ReferenceObject;

}

/**
 * The operations available on a single path.  A `PathItem` MAY be empty,
 * due to ACL constraints.  The path itself is still exposed to the
 * documentation viewer, but they will not know which operations and
 * parameters are available.
 */
export interface PathItemObject extends SpecificationExtension {

    /**
     * Allows for a referenced definition of this path item.  The referenced
     * structure MUST be in the form of a Path Item Object.  In case a
     * Path Item Object field appears both in the defined object and the
     * reference object, the behavior is undefined.
     */
    $ref?: string;

    /**
     * A definition of a DELETE operation on this path.
     */
    delete?: OperationObject;

    /**
     * An optional description, intended to apply to all operations in this path.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * A definition of a GET operation on this path.
     */
    get?: OperationObject;

    /**
     * A definition of a HEAD operation on this path.
     */
    head?: OperationObject;

    /**
     * A definition of an OPTIONS operation on this path.
     */
    options?: OperationObject;

    /**
     * A list of parameters that are applicable for all operations
     * described under this path.  These parameters can be overridden
     * at the operation level, but cannot be removed there.  The list MUST NOT
     * include duplicated parameters.  A unique parameter is defined by a
     * combination of a `name` and `location`.  The list can use the
     * `Reference Object` to link to parameters that are defined at the
     * `OpenAPI Object`'s `components` `parameters` field.
     */
    parameters?: (ParameterObject | ReferenceObject)[];

    /**
     * A definition of a PATCH operation on this path.
     */
    patch?: OperationObject;

    /**
     * A definition of a POST operation on this path.
     */
    post?: OperationObject;

    /**
     * A definition of a PUT operation on this path.
     */
    put?: OperationObject;

    /**
     * An alternative `server` array to service all operations on this path.
     */
    servers?: ServerObject[];

    /**
     * An optional summary, intended to apply to all operations in this path.
     */
    summary?: string;

    /**
     * A definition of a TRACE operation on this path.
     */
    trace?: OperationObject;

}

/**
 * Relative paths to individual endpoints and their operations.  The path is
 * appended to the URL from the `Server Object` in order to construct the
 * full URL.
 */
export interface PathsObject extends SpecificationExtension {

    /**
     * Relative path to an individual endpoint.  The field name MUST begin
     * with a forward slash.  The path is *appended* to the expanded URL
     * from a `ServerObject`'s field in order to construct the full URL.
     * The paths MAY be empty, due to Access Control List (ACL) constraints.
     *
     * See the OpenAPI specification for details on template matching.
     */
    [path: string]: PathItemObject;

}

/**
 * A reference to other objects, either internal or external.
 */
export interface ReferenceObject { // NOTE: No SpecificationExtension here

    /**
     * URI identifying this reference.
     */
    $ref: string;

    /**
     * Description, which by default SHOULD override that of the referenced
     * component.  If the referenced object type does not allow a
     * `description` field, then this field has no effect.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * Short summary, which by default SHOULD override that of the referenced
     * component.  If the referenced object type does not allow a `summary`
     * field, then this field has no effect.
     */
    summary?: string;

}

/**
 * Describes a single request body.
 */
export interface RequestBodyObject extends SpecificationExtension {

    /**
     * The content of the request body.  The key is a media type
     * or media type range, and the value describes it.  For requests that
     * match multiple keys, only the most specific key is applicable (e.g.
     * `text/plain` overrides `text/*`).
     */
    content: Map<string, MediaTypeObject>;

    /**
     * A brief description of the request body.  This could contain
     * examples of use.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * Determines if the request body is required in the request.
     * Defaults to `false`.
     */
    required?: boolean;

}

/**
 * Describes a single response from an API operation, including design-time
 * static `links` to operations based on the response.
 */
export interface ResponseObject extends SpecificationExtension {

    /**
     * A map containing descriptions of potential response payloads.  The
     * key is a media type or `media type range` and the value describes it.
     * For responses that match multiple keys, only the most specific key is
     * applicable (e.g. text/plain overrides text/*).
     */
    content?: Map<string, MediaTypeObject>;

    /**
     * A description of the response.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description: string;

    /**
     * Maps a header name to its definition.  `RFC7230` states header names
     * are case-sensitive.  If a response header with the name
     * `"Content-Type"`, it SHALL be ignored.
     */
    headers?: Map<string, HeaderObject | ReferenceObject>;

    /**
     * A map of operation links that can be followed from the response.  The
     * key is a short name for the link, following the naming constraints of
     * the names for `Component Objects`.
     */
    links?: Map<string, LinkObject | ReferenceObject>;

}


/**
 * A container for the expected responses of an operation.  The container
 * maps an HTTP response code to the expected response.
 *
 * The documentation is not necessarily expected to cover all possible
 * HTTP response codes, because they may not be known in advance.  However,
 * documentation is expected to cover a successful operation response and
 * any known errors.
 *
 * The `default` MAY be used as a default response object for all HTTP codes
 * that are not covered individually by the `Responses Object`.
 *
 * The `Responses Object` MUST contain at least one response code, and if
 * only one response code is provided it SHOULD be the response for a
 * successful operation call.
 */
export interface ResponsesObject extends SpecificationExtension {

    /**
     * The documentation of responses other than the ones declared for
     * specific HTTP response codes.  Use this field to cover undeclared
     * responses.
     */
    // @ts-ignore
    default?: ResponseObject | ReferenceObject;

    /**
     * Any `HTTP status code` can be used as the property name, but only
     * one property per code, to describe the expected response for that
     * HTTP status code.  This field MUST be enclosed in quotation marks
     * (for example, "200") for compatibility between JSON and YAML.  To
     * define a range of response codes, this field MAY contain the uppercase
     * wildcard character `X`.  For example, `2XX` represents all response
     * codes between `[200-299]`.  Only the following range definitions
     * are allowed:  `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`.  If a response
     * is defined using an explicit code, the explicit code definition
     * takes precedence over the range definition of that code.
     */
    [statusCode: string]: ResponseObject | ReferenceObject;

}

/**
 * Allows the definition of input and output data types.  These types can be
 * objects, but also primitives and arrays.  This object is a superset of
 * [JSON Schema Specification Draft 2020-12](https://tools.ietf.org/html/draft-bhutton-json-schema-00).
 *
 * For more information about the properties, see
 * [JSON Schema Core](https://tools.ietf.org/html/draft-bhutton-json-schema-00) and
 * [JSON Schema Validation](https://tools.ietf.org/html/draft-bhutton-json-schema-validation-00).
 *
 * Unless stated otherwise, the property definitions follow those of JSON
 * Schema and do not add any additional semantics.  Where JSON Schema
 * indicates that behavior is defined by the application (e.g. for
 * annotations), OAS also defers the definition of semantics to the
 * application consuming the OpenAPI document.
 *
 * NOTE:  THIS IS *NOT* A COMPLETE TYPESCRIPT DEFINITION OF A SCHEMA OBJECT!
 * IT HAS BEEN INFERRED FROM EXAMPLES WHILE I LOOK FOR A CANONICAL DEFINITION!
 */
export interface SchemaObject extends SpecificationExtension {

    // TODO:  $defs???

    /**
     * TODO - description
     */
    $dynamicAnchor?: string;

    /**
     * TODO - description
     */
    $id?: string;

    /**
     * TODO - description
     */
    $schema?: string;

    // TODO - additionalProperties???

    /**
     * This object MUST match all the specified schemas.
     */
    allOf?: (SchemaObject | ReferenceObject)[];

    /**
     * This object MUST match any one of the specified schemas.
     */
    anyOf?: (SchemaObject | ReferenceObject)[];

    // TODO - contentEncoding???

    // TODO - contentMediaType???

    // TODO - contentSchema???

    /**
     * The property name (and optional mappings) used to disambiguate
     * the selected schema to be used for validation.
     */
    discriminator?: SchemaDiscriminatorObject;

    /**
     * If `type` is "array", the schema (or schema reference) defining
     * each array element.
     */
    items?: SchemaObject | ReferenceObject;

    /**
     * This object MUST match exactly one of the specified schemas.
     */
    oneOf?: (SchemaObject | ReferenceObject)[];

    // TODO - patternProperties???

    /**
     * The individual properties of an "object".
     */
    properties?: Map<string, SchemaPropertyObject | ReferenceObject>;

    /**
     * List of property names that MUST be present in the object
     * being validated.
     */
    required?: string[];

    /**
     * TODO: description
     */
    title?: string;

    /**
     * The type of schema object represented by this SchemaObject.
     */
    type: SchemaObjectType;

    // XML Object not included

}

/**
 * The property name (and optional mappings) used to discriminate
 * between schemas to use in a polymorphism use case.
 */
export interface SchemaDiscriminatorObject extends SpecificationExtension {

    /**
     * Mappings between payload values and schema names or references.
     */
    mapping?: Map<string, string>;

    /**
     * The name of the property in the payload that will hold the
     * discriminator value.
     */
    propertyName: string;

}

/**
 * Description of an individual property in a schema description.  Validation
 * constraints come from
 * [JSON Schema Validation](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01).
 */
export interface SchemaPropertyObject /* extends SpecificationExtension */ {

    /**
     * If present, the value of this property must match this constant.
     * Functionally equivalent to an `enum` with this single value.
     */
    const?: boolean | string | number | null;

    /**
     * A default value for this property when it is not specified
     */
    default?: boolean | number | string | null;

    // TODO - dependentRequired?

    /**
     * Flag indicating that this property has been deprecated or not.
     * If not present, false is assumed?
     */
    deprecated?: boolean;

    /**
     * Optional description of this property for UI purposes.
     */
    description?: string;

    /**
     * The value of this property must match one of the listed values.
     */
    enum?: (string | number | null)[];

    // TODO - example (deprecated, but like for other parts of the schema).

    // TODO - examples (like for other parts of the schema).

    /**
     * The value of this property must be a number less than this value.
     */
    exclusiveMaximum?: number;

    /**
     * The value of this property must be a number greater than this value.
     */
    exclusiveMinimum?: number;

    /**
     * Constrain the value of this property according to the
     * [Format Metadata Specification](https://json-schema.org/draft/2020-12/meta/format-annotation).
     */
    format?: SchemaFormatType;

    // TODO - items???

    /**
     * The value of this property must be a number less than or equal
     * to this value.
     */
    maximum?: number;

    // TODO - maxContains???

    /**
     * The value of this property must be an array with a length
     * less than or equal to this value.
     */
    maxItems?: number;

    /**
     * The value of this property must be a string whose length is less
     * than or equal to this value.
     */
    maxLength?: number;

    /**
     * The value of this property must be an object that contains
     * a number of properties less than or equal to this value.
     */
    maxProperties?: number;

    /**
     * The value of this property must be a number greater than or equal
     * to this value.
     */
    minimum?: number;

    // TODO - minContains???

    /**
     * The value of this property must be an array with a length
     * greater than or equal to this value.
     */
    minItems?: number;

    /**
     * The value of this property must be a string whose length is greater
     * than or equal to this value.
     */
    minLength?: number;

    /**
     * The value of this property must be an object that contains
     * a number of properties greater than or equal to this value.
     */
    minProperties?: number;

    /**
     * The value of this property must be a number, strictly greater than zero,
     * which when divided by the `multipleOf` value results in an integer.
     */
    multipleOf?: number;

    /**
     * The value of this property must be a string that matches the
     * ECMA-262 regular expression defined by this value.
     */
    pattern?: string;

    /**
     * The value of this property should be considered to be read only.
     * Defaults to false if not present.
     */
    readOnly?: boolean;

    /**
     * The value of this property must be an object, which contains all
     * the listed property names.
     */
    required?: string[];

    /**
     * Optional title of this property, for UI purposes.
     */
    title?: string;

    type: SchemaObjectType | SchemaObjectType[]; // TODO - different list for property types?

    /**
     * The value of this property must be an array which, if this value
     * is true, must all be unique.  Default (if not specified) is false.
     */
    unique?: boolean;

    /**
     * The value of this property should be considered write only.
     * Defaults to false if not present.
     */
    writeOnly?: boolean;

}

/**
 * List the required security schemes to execute this operation.  The name
 * used for each property MUST correspond to a security scheme declared in
 * the `Security Schemes` under the `Components Object`.
 */
export interface SecurityRequirementsObject extends SpecificationExtension {
    // TODO - flesh out
}

/**
 * Defines a security scheme that can be used by operations.
 *
 * Supported schemes are HTTP authentication, an API key (either as a header,
 * a cookie parameter, or as a query parameter), mutual TLS (use of a client
 * certificate), OAuth2's common flows (implicit, password, client credentials,
 * and authorization code) as defined in `RFC6749`, and
 * `OpenID Connect Discovery.
 */
export interface SecuritySchemeObject extends SpecificationExtension {
    // TODO - flesh out
}

/**
 * An object representing an individual server for the exposed API.
 */
export interface ServerObject extends SpecificationExtension {

    /**
     * Description of the host designated by the URL.
     https://spec.commonmark.org/
    /**
     * URL to the target host.  This URL supports Server Variables and
     * MAY be relative, to indicate that the host location is relative
     * to where the OpenAPI document is being served.  Variable substitutions
     * will be made when a variable is named in `{` brackets `}`.
     */
    url: string;

    /**
     * Map between a variable name and its value.  The value is used for
     * substitution in the server's URL template.
     */
    variables?: Map<string, ServerVariableObject>;

}

/**
 * An object representing a Server Variable for server URL template
 * substitution.
 */
export interface ServerVariableObject extends SpecificationExtension {

    /**
     * The default value to use for substitution, which SHALL be sent if an
     * alternative value is *not* supplied.  If `enum` is defined, the value
     * MUST exist in the enum's values.
     */
    default?: string;

    /**
     * Description of this server variable.
     * (CommonMarkSyntax)[https://spec.commonmark.org/]
     * may be used for rich text representation.
     */
    description?: string;

    /**
     * An enumeration of string values to be used if the substitution
     * objects are from a limited set.  The array MUST NOT be empty.
     */
    enum?: string[];

}

/**
 * Shared interface for extendable objects.  Names must start with "x-".
 */
export interface SpecificationExtension {
    [extensionName: string]: any;
}

/**
 * Add metadata to a single tag that is used by the *OperationObject*.  It is
 * not mandatory to have a TagObject per tag defined in the
 * OperationObject instances.
 */
export interface TagObject extends SpecificationExtension {

    /**
     * A description for the tag.
     * (CommonMark syntax)[https://spec.commonmark.org/]
     * MAY be used for rich text representation.
     */
    description?: string;

    /**
     * Additional external documentation for this tag.
     */
    externalDocs?: ExternalDocsObject;

    /**
     * Name of this tag.
     */
    name: string;

}
