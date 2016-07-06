#!/bin/bash

# Backup MySQL database

# Usage: /root/mysql_backup.sh $MYSQL_URI $DB_BACKUP_DIR

DUMP_PRG=`which mysqldump`
set -e

if ! [ -x "$DUMP_PRG" ]; then
    echo "mysqldump is not installed" >&2
    exit 1
fi

# Pass the MYSQL_URI as the URI
URI=$1
DB_BACKUP_DIR="${2:-/backups/mysql-service}"
DATE=`date +%Y%m%d%H%M%S`

if [ -z "$URI" ]; then
    echo "MYSQL_URI is undefined" >&2
    exit 1
fi

# Extract fields from the URI
URI_PROTO="$(echo $URI | grep :// | sed -e's,^\(.*://\).*,\1,g')"
URL=$(echo $URI | sed -e s,$URI_PROTO,,g)
URI_USERPW="$(echo $URL | grep @ | cut -d@ -f1)"
URI_USER="$(echo $URI_USERPW | grep : | cut -d: -f1)"
URI_PW="$(echo $URI_USERPW | grep : | cut -d: -f2)"
URI_HOSTPORT=$(echo $URL | sed -e s,$URI_USERPW@,,g | cut -d/ -f1)
URI_HOST="$(echo $URI_HOSTPORT | grep : | cut -d: -f1)"
URI_PORT="$(echo $URI_HOSTPORT | grep : | cut -d: -f2)"

if [ -z "$URL" ]; then
    echo "Failed to parse URI: $URI" >&2
    exit 1
fi

DBNAME="$(echo $URL | grep / | cut -d/ -f2-)"

$DUMP_PRG --host=$URI_HOST --user=$URI_USER \
    --password=$URI_PW --port=$URI_PORT \
    --skip-opt --add-drop-database --add-drop-table \
    --add-locks --allow-keywords --create-options \
    --comments --complete-insert --compress \
    --create-options --routines --tz-utc \
    --disable-keys --extended-insert --single-transaction \
    --quick --routines --tz-utc --set-charset \
    $DBNAME | gzip > $DB_BACKUP_DIR/mysql-${DBNAME}-backup.$DATE.gz

touch $BACKUP_COMPLETE
