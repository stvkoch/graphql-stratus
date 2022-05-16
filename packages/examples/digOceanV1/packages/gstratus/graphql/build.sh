#!/bin/bash

# Using --ignore-engines since #graphql package requires node version "^12.22.0 || ^14.16.0 || >=16.0.0". But digitalocean-functions has version "14.15.4"
yarn install --ignore-engines
yarn build

rm -rf node_modules
yarn install --production --ignore-engines
