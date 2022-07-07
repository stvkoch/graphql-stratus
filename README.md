# Graphql Stratus

Generate schema and resolvers basead on models to access different datasources

> This is in an early development stage

## Datasources supported

 - SQL RDBMS (postgres, mariadb)
 - D1 Cloudflare
 - Hash Redis
 - ...anyone 

## Features

- Get data from differents data sources (SQL, REDIS, GRAPHQL, ...)
- Control data access using middlewares
- Grant control of what should be generated
- ...more soon

### packages/generators

```
(cd packages/generators/ ; pnpm run compile -- -w)
```

### packages/clients

```
(packages/clients/; pnpm run compile -- -w)
```


### YOGA example

Was build a server example with models that access three diferent datasources.

[/nicwo-com/yoga/models](/packages/examples/yoga/models)

Orders and related data from Northwind database
Customers data come from Northwind_customers database
Sessions data from REDIS

Each associations is access by related datasource

```
{
  session (where: {Id: {eq: "SSSSS"}}) { # redis datasource
    Id
    customer { # customers datasource
      CompanyName
      ContactName
      _ordersCount # orders datasource
    }
  }
}
```

#### Run example

```
pnpm run start:redis
NODE_ENV=development pnpm run start:server
```


# Migration tools 

Since than Graphql Stratus is datasource agnostic we don't hava plan to build a tool to migrate models to datasource.

But here a list of migrations tools that you could use:

https://github.com/amacneil/dbmate
