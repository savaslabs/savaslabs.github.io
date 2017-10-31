#!/usr/bin/env bash
set -e
node_modules/eslint/bin/eslint.js _comments-app/
bundle exec scss-lint _assets/styles/scss/*/*.scss
bundle exec mdl . -c .mdlrc --git-recurse
gulp build:test
gulp accessibility-test
bundle exec rake test -f Rakefile
