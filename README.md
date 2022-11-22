# ECS Logger

## Description
`ecs-logger` acts as a lightweight wrapper for `winston` adding enhanced type hinting for the fields in the Elastic Common Schema (ECS).

`ecs-logger` also exports a type representing the ECS with the fields all made optional.

---

## Installation
To install `ecs-logger` into your project run:
```
npm install ecs-logger
```

the default export from the `ecs-logger` module is the `ECSLogger` class. There is also a named export, `ECS`, which is the type representing the ECS with the fields all made optional.

---

## Usage
`ECSLogger` has 1 required parameter for the constructor - an instance of `winston.Logger`.

Here is an example of creating an instance of `ECSLogger`.

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

If you want to directly access the instance of `winston.Logger` you constructed the `ECSLogger` with you can call the `getBaseLogger` method on the instance of `ECSLogger`.

---

## Adding extra fields to the ECS

If you want to add extra fields to the ECS then you can pass an `object` to the generic type parameter list when constructing your instance of `ECSLogger`.

An example of this is that we might want to define some arbitrary labels for our logger:

```ts
interface ExtraFields {
  labels: {
    myLabel: string;
  };
}

const ecsLogger = new ECSLogger<ExtraFields>(winstonLogger);

ecsLogger.error("Uh, oh.", { labels: { myLabel: "foo" } });
```

Another reason for wanting to do this is to take advantage of the ability `winston` has to map the `err` meta field to the `error` field in the ECS (when using the `ecsFormat` format).

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
-  [ECS Logging with Winston](https://www.elastic.co/guide/en/ecs-logging/nodejs/current/winston.html)
