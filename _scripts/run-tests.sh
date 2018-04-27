#!/usr/bin/env bash
set -e

if [ -z "$TRAVIS" ]; then
  codeclimate analyze
fi
gulp build:test
bundle exec rake test -f Rakefile

# Since this test takes a while, only run it on cron.
if [[ "$TRAVIS_EVENT_TYPE" == "cron" ]]; then
  node --max-old-space-size=6000 ./node_modules/.bin/gulp accessibility-test
fi
