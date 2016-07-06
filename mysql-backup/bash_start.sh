#!/bin/bash

# Create cron job to backup the MySQL database

set -e

# Persistent mount point where the database is backed up
DB_BACKUP_DIR=/backups/mysql-service

# File that is touched when backup has completed by /root/mysql_backup.sh
export BACKUP_COMPLETE=$DB_BACKUP_DIR/backup.complete

# Make sure that the backup script is executable
sudo chmod +x /app/mysql_backup.sh

echo "==> CONFIGURING crond"

sudo -s -- <<EOF
echo "PATH=$PATH" > /etc/cron.d/backup
echo "BACKUP_COMPLETE=$BACKUP_COMPLETE" >> /etc/cron.d/backup
echo "# Backup the database every hour on the half hour" >> /etc/cron.d/backup
echo "30 * * * * root /app/mysql_backup.sh $MYSQL_URI $DB_BACKUP_DIR >> /tmp/cron.log 2>&1" >> /etc/cron.d/backup
echo "# Delete backups after 30 days" >> /etc/cron.d/backup
echo "15 1 * * * root /usr/bin/find $DB_BACKUP_DIR -name '*.gz' -mtime +30 -print0 | xargs --null --no-run-if-empty rm -f" >> /etc/cron.d/backup
chmod 0644 /etc/cron.d/backup
touch /tmp/cron.log
EOF

(
    while true; do
        if [ ! -d $DB_BACKUP_DIR ]; then
            (>&2 echo "ERROR: Mount point '$DB_BACKUP_DIR' not found. Bind this job to a file service, use '$DB_BACKUP_DIR' as the mount point.")
            exit 1
        elif [ ! -e $BACKUP_COMPLETE ]; then
            echo -ne "HTTP/1.0 503 OK\r\n\r\nFirst backup has not completed" | nc -l -p ${PORT:?}
        else
            LAST_BACKUP=`stat -c '%Y' $BACKUP_COMPLETE`
            CURRENT_TIME=`date +'%s'`
            BEHIND=$((CURRENT_TIME - LAST_BACKUP))
            ONE_HALF_DAYS=129600

            if [ $BEHIND -gt $ONE_HALF_DAYS ]; then
                echo -ne "HTTP/1.0 500 OK\r\n\r\nLast backup completed ${BEHIND} seconds ago" | nc -l -p ${PORT:?}
            else
                echo -ne "HTTP/1.0 200 OK\r\n\r\nLast backup completed ${BEHIND} seconds ago" | nc -l -p ${PORT:?}
            fi
        fi
    done
) &

echo "==> STARTING crond"
sudo cron && tail -f /tmp/cron.log
