#!/bin/bash

set -e

echo "STARTING APP ON ${PORT:?}"
# This command-substitution will strip off trailing-newline
HTML="$(cat index.html)"
disk_len=$(wc -c < index.html | xargs)
if [[ $(( ${#HTML} + 1 )) == $disk_len ]]; then
  HTML="${HTML}"$'\n'
else
  echo >&2 "Something hinky with multiple trailing newlines in index?"
  exit 1
fi

http_headers=$'HTTP/1.1 200 OK\r\nConnection: close\r\nContent-Length: '${#HTML}$'\r\n\r\n'

# Start a lightweight server that blocks.
# Note: this may be a non-portable version of netcat and is intended to be used for
# example purposes only. Additionally, the one-second timeout specified with the '-q'
# flag will break with many HTTP proxies.
while true; do
  echo -n "${http_headers}${HTML}" | nc -l -p ${PORT:?} -q 1
done
