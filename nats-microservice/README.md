# NATS based microservice

- Go to your sandbox, or a namespace where you have enough permissions to create jobs.
  In this example, we will be using the `/sandbox/admin` namespace.

```
apc namespace /sandbox/admin
Setting namespace to '/sandbox/admin'... done
Success!
```

- Stage the nats-app

```
cd webapp
apc app create nats-app --batch
```

- Stage the nats-worker

```
cd worker
apc app create nats-worker --batch
```

- Deploy manifest to build and start NATS Docker image 
  and link jobs together. It also starts a capsule which
  is linked to the NATS server as well so can tap the
  traffic in NATS.

```
apc manifest deploy project.json
[manifest] -- Deploy -- execution started
[manifest] -- Deploy -- looking up "package::/sandbox/admin::nats-app"
[nats-server] -- Pulling Docker image -- checking policy
[nats-server] -- Pulling Docker image -- checking if package FQN is taken
[nats-server] -- Pulling Docker image -- fetching image metadata
[nats-server] -- Pulling Docker image -- creating package
[nats-server] -- Pulling Docker image -- all layers downloaded
[manifest] -- Deploy -- looking up "package::/sandbox/admin::nats-worker"
[manifest] -- Deploy -- looking up "package::/apcera/pkg/os::ubuntu-14.04-apc3"
[manifest] -- Deploy -- checking if policy allows linking "job::/sandbox/admin::nats-worker" to "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- checking if policy allows linking "job::/sandbox/admin::nats-ops" to "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- checking if policy allows linking "job::/sandbox/admin::nats-app" to "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- creating "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- created "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- creating "job::/sandbox/admin::nats-ops"
[manifest] -- Deploy -- created "job::/sandbox/admin::nats-ops"
[manifest] -- Deploy -- updating "job::/sandbox/admin::nats-app"
[manifest] -- Deploy -- updating "job::/sandbox/admin::nats-worker"
[manifest] -- Deploy -- linking "job::/sandbox/admin::nats-ops" to "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- linking "job::/sandbox/admin::nats-app" to "job::/sandbox/admin::nats-server"
[manifest] -- Deploy -- linking "job::/sandbox/admin::nats-worker" to "job::/sandbox/admin::nats-server"
[manifest] -- Finish -- execution was successful
```

- Confirm status of jobs.

```
apc job list
Working in "/sandbox/admin"
╭─────────────┬──────┬────────────────┬─────────┬───────────╮
│ Name        │ Type │ Namespace      │ Status  │ Instances │
├─────────────┼──────┼────────────────┼─────────┼───────────┤
│ nats-app    │ app  │ /sandbox/admin │ started │ 3/3       │
│ nats-ops    │ job  │ /sandbox/admin │ started │ 1/1       │
│ nats-server │ app  │ /sandbox/admin │ started │ 1/1       │
│ nats-worker │ app  │ /sandbox/admin │ started │ 1/1       │
╰─────────────┴──────┴────────────────┴─────────┴───────────╯
```

- Connect to the `nats-ops` capsule and subscribe to NATS

```
apc job connect nats-ops

-bash-4.3# env | grep NATS_URI
NATS_URI=tcp://169.254.0.4:10000
-bash-4.3# nc 169.254.0.4 10000
INFO {"server_id":"5ca41a4f043d4d71bd6ec94bae67ada8","version":"0.7.2","go":"go1.5.2","host":"0.0.0.0","port":4222,"auth_required":false,"ssl_required":false,"tls_required":false,"tls_verify":false,"max_payload":1048576} 
sub > 1
+OK
```

- Make a request to the nats-app and see how traffic flows within the capsule.

```
curl http://nats-app-jziwuh.example.apcera-platform.io/help
Got help within 999.455µs: OK I can help!
```

```
MSG help 1 _INBOX.mRzj3WwpUseJmWN1iIPAG1 11
help please
MSG _INBOX.mRzj3WwpUseJmWN1iIPAG1 1 14
OK I can help!
```
