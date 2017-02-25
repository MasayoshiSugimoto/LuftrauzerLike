#!/bin/bash

################################################################################
# This files clean the sources files
# It replace the tabs by 2 spaces in all files
################################################################################

cd ../..

#Replace tab by 2 files in all html/js files.
find . | grep -E '.html$|.js$' | xargs sed -i '' 's/	/  /g'

#Remove trailing spaces
find . | grep -E '.html$|.js$' | xargs sed -E -i '' 's/ *$//'
