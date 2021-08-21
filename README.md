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

## Example

A fleshed out example of using this module is the
[openapi-builders-example](https://github.com/craigmcc/openapi-builders-example),
where a variety of techniques are employed to document a fairly simple
REST API for CRUD services against two different models (User and Post).
See the README file for this module for more details.




