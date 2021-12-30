// AbstractModel -------------------------------------------------------------

// Abstract base class for the OpenAPI documentation generator methods for a
// particular application data model class.  Default behavior for some methods
// has been implemented, but can be overridden as desired by a concrete subclass.

// External Modules ----------------------------------------------------------

const pluralize = require("pluralize");

// Internal Modules ----------------------------------------------------------

import {
    MediaTypeObjectBuilder,
    OperationObjectBuilder,
    ParametersObjectBuilder,
    PathItemObjectBuilder,
    PathsObjectBuilder,
    RequestBodyObjectBuilder,
    ResponseObjectBuilder,
    SchemaObjectBuilder
} from "./Builders";
import {
    APPLICATION_JSON, BAD_REQUEST, CREATED, FORBIDDEN,
    LIMIT, NOT_FOUND, OFFSET, OK, UNAUTHORIZED,
    parameterRef, requestBodyRef, responseRef, schemaRef,
} from "./Helpers";

// Public Objects ------------------------------------------------------------

/**
 * Abstract base class describing a particular application data model.
 */
export abstract class AbstractModel {

    /**
     * Return the API path to the collection endpoint for the specified
     * children of the specified model.
     *
     * @param child                     The child model
     *
     * The default implementation returns
     * `${this.apiDetail(this.apiPathId())}/${child.names().toLowerCase()}`
     */
    public apiChildren(child: AbstractModel) {
        return `${this.apiDetail()}/${child.names().toLowerCase()}`;
    }

    /**
     * Return the API path to the collection endpoint for this model.
     *
     * The default implementation returns
     * `${this.apiPrefix()}/${this.names())}`
     */
    public apiCollection(): string {
        return `${this.apiPrefix()}/${this.names().toLowerCase()}`;
    }

    /**
     * Return the API path to the detail endpoint for the specified model.
     *
     * The default implementation returns
     * `${this.apiPrefix()}/${pluralize(this.names())}/{${this.apiPathId()}}`
     */
    public apiDetail(): string {
        return `${this.apiCollection()}/{${this.apiPathId()}}`;
    }

    /**
     * Return the API path to the "exact" endpoint for the specified model.
     *
     * The default implementation returns apiCollection() + "/exact" +
     * a parameter reference for the matching value.
     *
     * @param parameter                 Parameter name for the matching value [name]
     */
    public apiExact(parameter: string = "name"): string {
        return `${this.apiCollection()}/exact/{${parameter}}`;
    }

    /**
     * Return the name of the ID parameter for detail paths.
     *
     * The default implementation returns "id".
     */
    public apiPathId(): string {
        return "id";
    }

    /**
     * Return the API prefix (starting with a slash) for all API paths for this
     * application's APIs for this model.
     *
     * The default implementation returns "/api".
     */
    public apiPrefix(): string {
        return "/api";
    }

    /**
     * Return the singular capitalized name for instances of this model.
     */
    public abstract name(): string;

    /**
     * Return the plural capitalized name for instance of this model.
     *
     * The default implementation uses pluralize() on the name() value.
     */
    public names(): string {
        return pluralize(this.name());
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to return all model objects that match the specified criteria
     */
    public abstract operationAll(): OperationObjectBuilder;

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to return all model objects that match the specified criteria.
     *
     * The default implementation returns a generic operation builder.
     *
     * @param tag                       Optional tag for this operation
     * @param includes                  Optional builder for include query parameters
     * @param matches                   Optional builder for matches query parameters
     * @param model                     Optional model for objects being retrieved [this]
     */
    public operationAllBuilder(tag: string | null,
                               includes: ParametersObjectBuilder | null,
                               matches: ParametersObjectBuilder | null,
                               model: AbstractModel = this)
        : OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Return all matching ${model.names()}`)
            .parameters(includes ? includes.build() : {})
            .parameters(matches ? matches.build() : {})
            .response(OK, responseRef(this.names()))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .summary(`The requested ${model.names()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to return model objects of children of this parent model
     * that match the specified criteria.
     *
     * The default implementation passes the specified model and tag
     * to operationChildrenBuilder(), along with the parametersIncludes()
     * and parametersMatches() values from the child model.
     *
     * @param model                 AbstractModel of the child model
     * @param tag                   Optional tag for this operation
     */
    public operationChildren(model: AbstractModel, tag: string | null) : OperationObjectBuilder {
        const builder = this.operationChildrenBuilder(model, tag,
            model.parametersIncludes(), model.parametersMatches())
        ;
        return builder;
    }

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to return all model objects of children of this parent model
     * that match the specified criteria.
     *
     * The default implementation returns a generic operation builder.
     *
     * @param model                     AbstractModel of the child model
     * @param tag                       Optional tag for this operation
     * @param includes                  Optional builder for include query parameters
     * @param matches                   Optional builder for matches query parameters
     */
    public operationChildrenBuilder(model: AbstractModel, tag: string | null,
                                    includes: ParametersObjectBuilder | null,
                                    matches: ParametersObjectBuilder | null)
        : OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Return matching ${model.names()} for this ${this.name()}`)
            .parameters(includes ? includes.build() : {})
            .parameters(matches ? matches.build() : {})
            .response(OK, responseRef(`${model.names()}`))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .response(NOT_FOUND, responseRef(NOT_FOUND))
            .summary(`The requested ${model.names()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to return an exact match for the specified model object by value.
     *
     * The default implementation returns an OperationObjectBuilder ...
     *
     * @param tag                   Optional tag for this operation
     * @param includes              Optional builder for include parameters
     * @param parameter             Parameter name for matching value [name]
     */
    public operationExactBuilder(tag: string | null,
                                 includes: ParametersObjectBuilder | null,
                                 parameter: string = "name")
        : OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Find the specified ${this.name()} by ${parameter}`)
            .parameters(includes ? includes.build() : {})
            .response(OK, responseRef(`${this.name()}`))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .response(NOT_FOUND, responseRef(NOT_FOUND))
            .summary(`The specified ${this.name()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to return the specified model object by ID.
     */
    public abstract operationFind(): OperationObjectBuilder;

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to return the specified model object by ID.
     *
     * The default implementation returns a generic operation builder.
     *
     * @param tag                       Optional tag for this operation
     * @param includes                  Optional builder for include query parameters
     */
    public operationFindBuilder(tag: string | null,
                                includes: ParametersObjectBuilder | null)
        : OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Find the specified ${this.name()} by ID`)
            .parameters(includes ? includes.build() : {})
            .response(OK, responseRef(`${this.name()}`))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .response(NOT_FOUND, responseRef(NOT_FOUND))
            .summary(`The specified ${this.name()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to insert a new model, and return the inserted model with ID.
     */
    public abstract operationInsert(): OperationObjectBuilder;

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to insert a new model, and return the inserted model with ID.
     *
     * The default implementation returns a generic operation builder.
     *
     * @param tag                       Optional tag for this operation
     */
    public operationInsertBuilder(tag: string | null): OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Insert and return the specified ${this.name()}`)
            .requestBody(requestBodyRef(`${this.name()}`))
            .response(CREATED, responseRef(`${this.name()}`))
            .response(BAD_REQUEST, responseRef(BAD_REQUEST))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .summary(`The inserted ${this.name()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to remove an existing model, and return the removed model.
     */
    public abstract operationRemove(): OperationObjectBuilder;

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to remove an existing model, and return the removed model.
     *
     * The default implementation returns a generic builder.
     *
     * @param tag                       Optional tag for this operation
     */
    public operationRemoveBuilder(tag: string | null): OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Remove and return the specified ${this.name()}`)
            .response(OK, responseRef(`${this.name()}`))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .response(NOT_FOUND, responseRef(NOT_FOUND))
            .summary(`The removed ${this.name()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a configured OperationObjectBuilder that describes a request
     * to update an existing model, and return the updated model.
     */
    public abstract operationUpdate(): OperationObjectBuilder;

    /**
     * Generate an OperationObjectBuilder that describes a request
     * to update an existing model, and return the updated model.
     *
     * The default implementation returns a generic builder.
     *
     * @param tag                       Optional tag for this operation
     */
    public operationUpdateBuilder(tag: string | null): OperationObjectBuilder {
        const builder = new OperationObjectBuilder()
            .description(`Update and return the specified ${this.name()}`)
            .requestBody(requestBodyRef(this.name()))
            .response(OK, responseRef(this.name()))
            .response(BAD_REQUEST, responseRef(BAD_REQUEST))
            .response(UNAUTHORIZED, responseRef(UNAUTHORIZED))
            .response(FORBIDDEN, responseRef(FORBIDDEN))
            .response(NOT_FOUND, responseRef(NOT_FOUND))
            .summary(`The updated ${this.name()}`)
        ;
        if (tag) {
            builder.tag(tag);
        }
        return builder;
    }

    /**
     * Generate a ParametersObjectBuilder for query parameters that
     * specify inclusion of parent and/or children for retrieval of this model.
     *
     * The default implementation returns an empty builder
     */
    public parametersIncludes(): ParametersObjectBuilder {
        const builder = new ParametersObjectBuilder()
        ;
        return builder;
    }

    /**
     * Generate a ParametersObjectBuilder for query parameters that
     * specify match conditions for retrieval of this model.
     *
     * The default implementation returns an empty builder
     */
    public parametersMatches(): ParametersObjectBuilder {
        const builder = new ParametersObjectBuilder()
        ;
        return builder;
    }

    /**
     * Generate a ParametersObjectBuilder for query parameters that
     * specify pagination configuration.
     *
     * The default implementation returns LIMIT and OFFSET parameters
     */
    public parametersPagination(): ParametersObjectBuilder {
        const builder = new ParametersObjectBuilder()
            .parameter(LIMIT, parameterRef(LIMIT))
            .parameter(OFFSET, parameterRef(OFFSET))
        ;
        return builder;
    }

    /**
     * Generate a PathItemObjectBuilder for the "collection" path
     * to the specified children for this model.
     *
     * @param model                     AbstractModel of the child model
     * @param operation                 Operation to retrieve child models
     *
     * The default implementation generates a PathItemObjectBuilder for a
     * path to the detail parent model + "/" + lowercase names() of child model,
     * along with the specified OperationBuilder, with a GET verb.
     */
    public pathChildren(model: AbstractModel, tag: string | null)
        : PathItemObjectBuilder {
        const builder = new PathItemObjectBuilder()
            .description(`Collection operations for ${model.names()} children of this ${this.name()}`)
            .get(this.operationChildren(model, tag).build())
        ;
        return builder;
    }

    /**
     * Generate a PathItemObjectBuilder for the "collection" path
     * for this model.
     *
     * The default implementation will return a builder configured
     * with a GET for operationAll() and a POST for operationInsert()
     */
    public pathCollection(): PathItemObjectBuilder {
        const builder = new PathItemObjectBuilder()
            .description(`Collection operations for ${this.names()}`)
            .get(this.operationAll().build())
            .post(this.operationInsert().build())
        ;
        return builder;
    }

    /**
     * Generate a PathItemObjectBuilder for the "detail" path
     * for this model.
     *
     * The default implementation will return a builder configured
     * with a GET for operationFind(), a DELETE for operationRemove(),
     * and a PUT for operationUpdate()
     */
    public pathDetail(): PathItemObjectBuilder {
        const builder = new PathItemObjectBuilder()
            .description(`Detail operations for this ${this.name()}`)
            .get(this.operationFind().build())
            .delete(this.operationRemove().build())
            .put(this.operationUpdate().build())
        ;
        return builder;
    }

    /**
     * Generate a PathItemObjectBuilder for the "exact" path
     * for this model.
     *
     * The default implementation will return a builder configured
     * with a GET for operationExact().
     *
     * @param tag                       Optional tag for this operation
     * @param parameter                 Parameter name for matching value [name]
     */
    public pathExact(tag: string | null,
                     parameter: string = "name"): PathItemObjectBuilder {
        const builder = new PathItemObjectBuilder()
            .description(`Exact operation for this ${this.name()}`)
            .get(this.operationExactBuilder(tag, this.parametersIncludes(), parameter)
                .parameter(parameterRef(parameter))
                .build())
        ;
        return builder;
    }

    /**
     * Generate a PathsObjectBuilder for all of the paths for this model.
     *
     * The default implementation will return the results of pathCollection()
     * and pathDetail().
     */
    public paths(): PathsObjectBuilder {
        const builder = new PathsObjectBuilder()
            .path(this.apiCollection(), this.pathCollection().build())
            .path(this.apiDetail(), this.pathDetail().build())
        ;
        return builder;
    }

    /**
     * Generate a RequestBodyObjectBuilder for instances of this model.
     *
     * The default implementation constructs one based on
     * a content type of application/json and a schema reference
     * to this model.
     */
    public requestBody(): RequestBodyObjectBuilder {
        const builder = new RequestBodyObjectBuilder()
            .content(APPLICATION_JSON, new MediaTypeObjectBuilder()
                .schema(schemaRef(this.name()))
                .build())
            .required(true)
        ;
        return builder;
    }

    /**
     * Generate a ResponseObjectBuilder for instances of this model
     * that return a single object.
     *
     * The default implementation constructs one based on
     * a content type of application/json and a schema reference
     * to singular schema for this model.
     */
    public response(): ResponseObjectBuilder {
        const builder = new ResponseObjectBuilder(`The specified ${this.name()}`)
            .content(APPLICATION_JSON, new MediaTypeObjectBuilder()
                .schema(schemaRef(this.name()))
                .build())
        ;
        return builder;
    }

    /**
     * Return an ResponseObjectBuilder for instances of this model
     * that return an array of objects.
     *
     * The default implementation constructs one based on
     * a content type of application/json and a schema reference
     * to the plural schema for this model.
     */
    public responses(): ResponseObjectBuilder {
        const builder = new ResponseObjectBuilder(`The specified ${pluralize(this.name())}`)
            .content(APPLICATION_JSON, new MediaTypeObjectBuilder()
                .schema(schemaRef(pluralize(this.name())))
                .build())
        ;
        return builder;
    }

    /**
     * Generate a SchemaObjectBuilder for this model.
     */
    public abstract schema(): SchemaObjectBuilder;

    /**
     * Generate a SchemaObjectBuilder for an array of this model.
     *
     * The default implementation pluralizes the name and indicates
     * that the result is an array.
     */
    public schemas(): SchemaObjectBuilder {
        return new SchemaObjectBuilder()
            .items(schemaRef(this.name()))
            .type("array")
            ;
    }

}

export default AbstractModel;
