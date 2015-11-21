### example-java-jdbc-Mysql

Sample java app that connects to Mysql via a JDBC adapter. It reads the connection settings from the `JDBC_MYSQL_URI` env variable.

## Deploying

```console
$ apc app create jdbc-mysql -dr --restart no
```

## Binding To Mysql

Create a mysql service using one of your mysql providers

```console
$ apc service create mysql-service -t mysql --provider /apcera/bootstrap::mysql --batch
```
Bind the app to this new service 

```console
$ apc service bind mysql-service -j jdbc-mysql
```

Start the app 

```console
$ apc app start jdbc-mysql
```