# ECS Logger

`ecs-logger` acts as a lightweight wrapper for `winston` or `pino` adding enhanced type hinting for the fields in the Elastic Common Schema (ECS).

`ecs-logger` also exports a type representing the ECS with the fields all made optional.

## Installation

To install `ecs-logger` into your project run:

```sh
# if using winston 
npm install ecs-logger winston

# if using pino
npm install ecs-logger pino
```

the default export from the `ecs-logger` module is the `ECSLogger` class. There is also a named export, `ECS`, which is the type representing the ECS with the fields all made optional.

## Usage

`ECSLogger` has 1 required parameter for the constructor - an instance of either `winston.Logger` or `pino.Logger`.

Here is an example of creating an instance of `ECSLogger` with winston.

```ts
import ecsFormat from "@elastic/ecs-winston-format";
import ECSLogger from "ecs-logger";
import winston from "winston";

const winstonLogger = winston.createLogger({
  format: ecsFormat(),
  transports: [new winston.transports.Console()],
});

const ecsLogger = new ECSLogger(winstonLogger);

ecsLogger.error("Uh, oh.");
```

Here is an example of creating an instance of `ECSLogger` with pino.

```ts
import ecsFormat from "@elastic/ecs-pino-format";
import ECSLogger from "ecs-logger";
import pino from "pino";

const pinoLogger = pino({
  ...ecsFormat({ convertReqRes: true }),
  level: "info",
});

const ecsLogger = new ECSLogger(pinoLogger);

ecsLogger.error("Uh, oh.");
```

If you want to directly access the instance of the logger you constructed, you can call the `getBaseLogger` method on the instance of `ECSLogger`.

## Adding extra fields to the ECS

If you want to add extra fields to the ECS then you can pass an `object` to the generic type parameter list when constructing your instance of `ECSLogger`.

An example of this is that we might want to define some arbitrary labels for our logger:

```ts
interface ExtraFields {
  labels: {
    myLabel: string;
  };
}

const ecsLogger = new ECSLogger<ExtraFields>(logger);
// or for better types when calling `getBaseLogger` with winston
const ecsLogger = new ECSLogger<ExtraFields, winston.Logger>(winstonLogger);
// or for better types when calling `getBaseLogger` with pino
const ecsLogger = new ECSLogger<ExtraFields, pino.Logger>(pinoLogger);

ecsLogger.error("Uh, oh.", { labels: { myLabel: "foo" } });
```

Another reason for wanting to do this is to take advantage of the ability `winston` and `pino` have to map the `err` meta field to the `error` field in the ECS (when using the `ecsFormat` format).

```ts
interface ExtraFields {
  err?: Error;
}

const ecsLogger = new ECSLogger<ExtraFields>(winstonLogger);

const err = new Error("Something went wrong");

ecsLogger.error("Uh, oh.", { err });
```

## Important links and documentation

- [Elastic Common Schema (ECS) Reference](https://www.elastic.co/guide/en/ecs/current/index.html)
- [ECS Logging with Winston](https://www.elastic.co/guide/en/ecs-logging/nodejs/current/winston.html)
- [ECS Logging with Pino](https://www.elastic.co/guide/en/ecs-logging/nodejs/current/pino.html)
