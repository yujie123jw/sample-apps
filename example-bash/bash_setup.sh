#!/bin/bash

set -e

echo "SETTING UP BASH APP"

# Cleanly ensure we do not already have an index.html.
rm -f index.html

# Write example text into an index.html file that we then serve.
# Note: the bash stager system test explicitly looks for the 'CONTENT:'
# prefix in order to parse the html content that it needs to validate 
# the GET request's response body against.
sed > index.html -n 's/^CONTENT://p' <<'EOINDEX'
CONTENT:<html><body><h1>Sample Index.html</h1><p>This is the sample index.html that we have configured.</p></body></html>
EOINDEX
