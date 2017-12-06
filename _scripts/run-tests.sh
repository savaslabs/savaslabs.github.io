#!/usr/bin/env bash
set -e

if [ -z "$TRAVIS" ]; then
  codeclimate analyze
fi
gulp build:test
bundle exec rake test -f Rakefile
gulp accessibility-test
