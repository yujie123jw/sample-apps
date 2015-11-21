##example-go-ldap-client

This sample Golang application is a web application which can query a user on a remote LDAP directory through LDAP service provisoned using [generic gateway](http://docs.apcera.com/services/examples/#creating-a-generic-service) and can communicate to the service over TLS.

Following steps explain how an LDAP service can be provisioned and bound to an app in [Apcera Platform](http://docs.apcera.com/introduction/introducing-apcera-hcos/).

####Create LDAP Service(s)...

1. Create LDAP service using generic gateway:

  ```console
  $ apc service create ldap --type generic -- --url "ldap://<ldap-server-host>:389"
  ```

  Above LDAP service named 'ldap' can be used for secure (TLS) communication if Extended 'StartTLS' operation is supported by LDAP server.

2. If extended operation is not supported, create secure LDAP service using same generic gateway:

  ```console
  $ apc service create ldaps --type generic -- --url "ldaps://<ldap-server-host>:636"
  ```

  ####Create application...

3. Now create and deploy this sample app, Checkout the code to your working directory then:

  ```console
  $ apc app create go-ldap-client --start --disable-routes --allow-ssh --env-set 'HTTP_PORT=8080' --env-set 'ADMIN_DN=<my-admin-dn>' --env-set 'ADMIN_PASSWORD=<my-admin-password>'
  ```
  This opens an SSH port on the job running the app and disables any other inbound communication (--disable-rutes). An 'HTTP_PORT' environment variable is also added to specify the web server's port (Check main method in code). We still need to open port 8080 for app to be accessible.

4. To open port 8080 for accessing the app:

  First, open the port on the job,

  ```console
  $ apc app update go-ldap-client --port-add 8080
  ```
  Second, add a route to the job at port 8080 on which web server is listening

  ```console
  $ apc route add --app go-ldap-client --type http --port 8080
  ```
  Now the web app is accessible through web browser but any LDAP query will fail.

5. Bind the app to the 'ldap' service (First, try insecure one):

  ```console
  $ apc service bind ldap --job go-ldap-client
  ```
  Refreshing the page should yield a successful LDAP session.

  ####Secure LDAP communication...

6. Bind the app to the 'ldaps' service created in STEP 2:

  ```console
  $ apc service bind ldaps --job go-ldap-client
  ```
  Not done yet..

7. App needs to be presented with a root certificate authority for client to verify server certificate. Following sequence is one way to extract the server's TLS certificate in PEM format. Create a separate package from cert file:

  ```console
  $ export LDAP_HOST=<ldap server host name or IP>
  $ openssl x509 -in <(openssl s_client -connect $LDAP_HOST:636 -prexit </dev/null) > ldap-client-cert.pem
  $ tar cvf ldap-cert.tar ldap-client-cert.pem

  $ apc package from file ldap-cert.tar ldaps-cert --provides "package=ldaps-cert"
  ```
8. Update the job with the newly created package:

  ```console
  $ apc job update go-ldap-client --pkg-add ldaps-cert=/app-certs --env-set LDAP_CERT_PATH=/app-certs/ldap-client-cert.pem
  ```
  Environment variable LDAP_CERT_PATH is used by the app to find the file with the certificate in PEM format.
  Go back to home page to query a new user and it should return the results as before (with non-TLS one).

  The app tries to use secure service first (LDAPS_URI) and if fails to find either the env variable or load the certificate, it falls back to insecure one if available.
