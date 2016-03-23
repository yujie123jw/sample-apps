#!/bin/bash

# Create cron job to backup the MySQL database

set -e
set -x

DB_BACKUP_DIR=/backups/mysql-service

# Make sure that the backup script is executable
sudo chmod +x /app/mysql_backup.sh

echo "==> INSTALLING mysql-client"

# Install the MySQL client software, including mysqldump
sudo apt-get update
sudo apt-get install mysql-client -y

echo "==> CONFIGURING crond"

sudo -s -- <<EOF
echo "# Backup the database every hour on the half hour" > /etc/cron.d/backup
echo "30 * * * * root /app/mysql_backup.sh $MYSQL_URI $DB_BACKUP_DIR >> /tmp/cron.log 2>&1" >> /etc/cron.d/backup
echo "# Delete backups after 30 days" >> /etc/cron.d/backup
echo "15 1 * * * root /usr/bin/find $DB_BACKUP_DIR -name '*.gz' -mtime +30 -print0 | xargs --null --no-run-if-empty rm -f" >> /etc/cron.d/backup
chmod 0644 /etc/cron.d/backup
touch /tmp/cron.log
EOF

# File that is touched when backup has completed by /root/mysql_backup.sh
touch /tmp/backup.complete

(
    while true; do
        LAST_BACKUP=`stat -c '%Y' /tmp/backup.complete`
        CURRENT_TIME=`date +'%s'`
        BEHIND=$((CURRENT_TIME - LAST_BACKUP))
        ONE_HALF_DAYS=129600

        if [ $BEHIND -gt $ONE_HALF_DAYS ]; then
            echo -ne "HTTP/1.0 500 OK\r\n\r\n${BEHIND}" | nc -l -p ${PORT:?}
        else
            echo -ne "HTTP/1.0 200 OK\r\n\r\n${BEHIND}" | nc -l -p ${PORT:?}
        fi
    done
) &

echo "==> STARTING crond"
sudo cron && tail -f /tmp/cron.log
