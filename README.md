# openapi-builders

Typescript based module to facilitate programatically creating REST API
description files compatible with the
[Open API Specification](https://github.com/OAI/OpenAPI-Specification).  This
can be very useful for larger APIs, because the amount of possible detail
is large, and in many cases repetitive.  Typically, your application would
be set up to create the description file once (upon first request), and
cache a static copy for subsequent requests.

This module was inspired by the
[openapi3-ts](https://github.com/metadevpro/openapi3-ts)
project, but with a goal of a more comprehensive use of the
[Builder Pattern](https://betterprogramming.pub/lets-look-at-the-builder-pattern-in-typescript-fb9cf202c04d)
to assemble the fairly complicated nested object structures that are
possible using OpenAPI.

The initial version of this module is targeted towards Version 3.0 of
the Open API specification.  The organizational structure will easily
allow expansion to future versions (if desired or needed).

## Installation

```bash
npm install @craigmcc/openapi-builders
```

## Usage

To start on building a very simple OpenAPI compatible description,
do something like this in your Typescript-based application, most
likely in a separate function that is called when someone requests
"http://myserver/openapi.json":

```typescript
import {InfoObjectBuilder, OpenApiObjectBuilder} from "./Builders";

// TODO - VALIDATE THIS!
import "openapi-builders/3.0"; // Reference the OpenAPI version you want

let openAPI: string = "";

export const generateOpenAPI = () => {
    if (!openAPI) {
        openAPI = new OpenApiObjectBuilder(
            new InfoObjectBuilder("My Application", "1.0")
                .addContact(new ContactObjectBuilder()
                    .addEmail("myname@example.com")
                    .addName("My Name")
                    .build())
                .addDescription("This is my cool application")
                .build(),
            .addPathItem("/users", new PathItemObjectBuilder(...).build()
        ).asJson();
    }
    return openAPI;
}
```

TODO - lots of refinement needed on this example!!!

Although you can create nested changes of builder creation and build() calls,
it is more likely that you will want to assemble parts of the overall structure
in separate functions.  If you follow Builder Pattern principles, you can
make all of these functions builders themselves, and assemble the results by
calling your highest level detail builders.

A comprehensive example of usage of this module can be found
in the TODO project.


