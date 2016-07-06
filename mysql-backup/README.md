### mysql-backup

This is a sample bash application that runs two scripts, as accepted by Apcera Platform's built-in bash stager:

1. `bash_start.sh` creates a crontab file `/etc/cron.d/backup`, starts a monitoring loop, and starts cron.
2. `mysql_backup.sh` is executed once an hour by cron. It backs up the MySQL server that's bound to the app and saves the backup onto the NFS service that's bound to the app.

To create the app, perform the following:

```
cd mysql-backup
apc app create mysql-backup-app --allow-egress
```

Bind the database that you want to back up to the app:

```
apc service bind mysql-service --job mysql-backup-app
```

Create and bind the NFS service to the app, mounting the NFS file system at `/backups/mysql-service`:

```
apc service create mysql-backup-storage --provider /apcera/providers::apcfs --description "Storage for mysql backups"
apc service bind mysql-backup-storage --job mysql-backup-app --batch -- --mountpath /backups/mysql-service
```

Next, start the app as follows:

```
apc app start mysql-backup-app
```

Navigate to the URL provided from the app staging process to view the output page. It should display the number of seconds since the last successful backup. If a backup hasn't happened in over a day and a half it throws a 500 error and displays the number of seconds since the last successful backup. 
