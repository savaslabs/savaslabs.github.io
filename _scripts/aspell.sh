#!/bin/sh

# Install aspell
ASPELL=$(which aspell)
if [ $? != 0 ]; then
  brew install aspell
fi

# Generate the custom dictionary.
aspell --lang=en create master /tmp/en-savas.pws < savas_wordlist.txt
cp /tmp/en-savas.pws /usr/local/lib/aspell*
