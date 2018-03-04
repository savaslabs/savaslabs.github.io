#!/usr/bin/env bash
set -e

if [ -z "$TRAVIS" ]; then
  codeclimate analyze
fi
gulp build:test
bundle exec rake test -f Rakefile

# Since this test takes a while, only run it on feature branches.
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "source" ]]; then
  gulp accessibility-test
fi
