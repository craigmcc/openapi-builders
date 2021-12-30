// AbstractApplication -------------------------------------------------------

// Abstract base class for the descriptor of an entire Application for which
// OpenAPI documentation is to be generated.  Default behavior for some methods
// has been implemented, but can be overridden as desired by a concrete subclass.

// External Modules ----------------------------------------------------------

const pluralize = require("pluralize");

// Internal Modules ----------------------------------------------------------

import AbstractModel from "./AbstractModel";
import {
    ComponentsObjectBuilder,
    InfoObjectBuilder,
    ParametersObjectBuilder,
    PathsObjectBuilder,
    RequestBodiesObjectBuilder,
    ResponsesObjectBuilder, SchemasObjectBuilder
} from "./Builders";
import {
    TagsObject
} from "./types";

// Public Objects ------------------------------------------------------------

/**
 * Abstract base class describing the entire application.
 */
export abstract class AbstractApplication {

    /**
     * Generate a ComponentsObjectBuilder for this application.
     *
     * The default implementation uses the parameters(),
     * requestBodies(), responses(), and schemas() methods
     * from the concrete implementation.
     */
    public components(): ComponentsObjectBuilder {
        const builder = new ComponentsObjectBuilder()
            .parameters(this.parameters().build())
            .requestBodies(this.requestBodies().build())
            .responses(this.responses().build())
            .schemas(this.schemas().build())
        ;
        return builder;
    }

    /**
     * Generate an InfoObjectBuilder for this application.
     */
    public abstract info(): InfoObjectBuilder;

    /**
     * Return a list of the model implementations for this application.
     */
    public abstract models(): AbstractModel[];

    /**
     * Generate a ParametersObjectBuilder containing required parameters
     * for this application.
     */
    public abstract parameters(): ParametersObjectBuilder;

    /**
     * Generate a PathsObjectBuilder containing all of the defined paths
     * (with their nested operations).
     *
     * The default implementation iterates through the models() and
     * calls model.paths() for each, combining the results.
     */
    public paths(): PathsObjectBuilder {
        const builder = new PathsObjectBuilder();
        this.models().forEach(model => {
            const paths = model.paths().build();
            for (const key in paths) {
                builder.path(key, paths[key]);
            }
        });
        return builder;
    }

    /**
     * Generate a RequestBodiesObjectBuilder containing required request bodies
     * for this application.
     *
     * The default implementation iterates through the requestBody() methods
     * for each defined model.
     */
    public requestBodies(): RequestBodiesObjectBuilder {
        const builder = new RequestBodiesObjectBuilder();
        for (const model of this.models()) {
            builder.requestBody(model.name(), model.requestBody().build());
        }
        return builder;
    }

    /**
     * Return a ResponsesObjectBuilder containing required responses
     * for this application.
     *
     * The default implementation iterates through the response()
     * and responses() methods for each defined model.
     * // NOTE - manually add responses for HTTP errors
     */
    public responses(): ResponsesObjectBuilder {
        const builder = new ResponsesObjectBuilder();
        for (const model of this.models()) {
            builder.response(model.name(), model.response().build());
            builder.response(pluralize(model.name()), model.responses().build());
        }
        return builder;
    }

    /**
     * Generate a SchemasObjectBuilder containing generated SchemaObject
     * instances for all model implementations for this application.
     *
     * The default implementation returns the result of calling schema()
     * and schemas() for each model implementation returned by models().
     */
    public schemas(): SchemasObjectBuilder {
        const builder = new SchemasObjectBuilder();
        this.models().forEach(model => {
            builder.schema(model.name(), model.schema().build());
            builder.schema(pluralize(model.name()), model.schemas().build());
        })
        return builder;
    }

    /**
     * Generate a TagsObjectBuilder containing tag descriptions for this
     * application.
     *
     * // NOTE - Add TagsObjectBuilder and switch when available
     *
     * The default implementation returns an empty builder.
     */
    public tags(): TagsObject {
        const tags: TagsObject = {};
        return tags;
    }

}

export default AbstractApplication;
