#!/bin/bash

bundle check || bundle install
npm install -g

/app/node_modules/.bin/gulp $@
