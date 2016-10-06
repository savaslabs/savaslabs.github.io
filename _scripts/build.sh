#!/bin/bash

# Enable error reporting to the console.
set -e

# Install bundles if needed
bundle_check || bundle install --path vendor/bundle

# Build the site.
gulp

# Clone repo (defaulted to source branch) into a new directory using encrypted
# GH_TOKEN for authentication.
git clone https://${GH_TOKEN}@github.com/savaslabs/savaslabs.github.io.git ../savaslabs.github.io.master

# Check out master branch on new repo and remove everything.
cd ../savaslabs.github.io.master
git config user.email ${GH_EMAIL}
git config user.name "savas-bot"
git checkout master
rm -rf *

# Copy generated HTML site from source branch in original repo.
# Now the master branch will contain only the contents of the _site directory.
cp -R ../savaslabs.github.io/_site/* .

# Make sure we have the updated .travis.yml file so tests won't run on master.
cp ../savaslabs.github.io/.travis.yml .

# Commit and push generated content to master branch.
git add -A .
git status
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
ls -la
git log --patch
# TODO: Uncomment when ready.
# git push --quiet origin master > /dev/null 2>&1
