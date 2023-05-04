// types.ts

/**
 * Type definitions for supported components of the OpenAPI 3.1 Specification.
 *
 * @packageDocumentation
 */

/**
 * A set of reusable objects for different aspects of the exposed API.
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
     * Decription, which by default SHOULD override that of the referenced
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
