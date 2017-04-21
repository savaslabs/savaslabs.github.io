#!/usr/bin/env bash
set -e
gulp build:test
bundle exec scss-lint _assets/styles/scss/*/*.scss
# Run markdown lint
# bundle exec mdl _posts/2017-04-20-web-redesign.md -c .mdlrc -g
bundle exec mdl . -c .mdlrc --git-recurse
bundle exec rake test -f Rakefile
