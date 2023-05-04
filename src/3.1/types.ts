// types.ts

/**
 * Type definitions for supported components of the OpenAPI 3.1 Specification.
 *
 * @packageDocumentation
 */

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
 */
export interface ComponentsObject extends SpecificationExtension {
    // TODO - flesh out
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
 * Reference to an external resource for extended information about the
 * exposed API.
 */
export interface ExternalDocsObject extends SpecificationExtension {

    /**
     * Description of the target documentatation.
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
export interface HeaderObject extends SpecificationExtension {
    // TODO - flesh out (copy ParameterObject but leave out in and name)
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
 * them as parametwers while invoking the linked operation.
 */
export interface LinkObject extends SpecificationExtension {
    // TODO - flesh out
}

/**
 * Provides schema and examles for the media type identified by its key.
 */
export interface MediaTypeObject extends SpecificationExtension {
    // TODO - flesh out
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
     * needs to be satisfied to autorize a request.  Individual operations
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
 */
export interface ParameterObject extends SpecificationExtension {
    // TODO - flesh out
}

/**
 * The operations available on a single path.  A `PathItem` MAY be empty,
 * due to ACL constraints.  The path itself is still exposed to the
 * documentation viewer, but they will not know which operations and
 * parameters are available.
 */
export interface PathItemObject extends SpecificationExtension {
    // TODO - flesh out
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
     * component.  If the referenced objecvt type does not allow a
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
     * `text/plain` overrides `text/*`.
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
     * A map of operation links that can be followed from the resonse.  The
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
     * define a range of resonse codes, this field MAY contain the uppercase
     * wildcard character `X`.  For example, `2XX` represents all response
     * codes between `[200-299]`.  Only the following range definitions
     * are allowed:  `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`.  If a response
     * is defined using an explicit code, the explicit code definition
     * takes precedence over the range definition of that code.
     */
    [statusCode: string]: ResponseObject | ReferenceObject;

}

/**
 * TODO - flesh out
 */
export interface SecurityRequirementsObject extends SpecificationExtension {
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
     * MAY be used for rich text represenation.
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