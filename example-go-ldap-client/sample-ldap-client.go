// Copyright 2015-2016 Apcera Inc. All rights reserved.

package main

import (
	"crypto/tls"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"time"

	goldap "github.com/jmckaskill/goldap"
)

type LdapClient struct {
	AdminDN       string
	AdminPassword string
	ServerURI     string
	tlsConfig     *tls.Config
	BaseDN        string
}

type LdapResponse struct {
	DN           goldap.ObjectDN
	Email        string
	CN           string
	EmailAccount string
}

var (
	ldapClient *LdapClient
	isLDAPS    bool
)

// SearchLDAPUser searches for a user's information in
// the LDAP directory - function member is exported.
func (lc *LdapClient) SearchLDAPUser(user string, baseDN string) (res *LdapResponse, err error) {

	adminLdapDB := ldapClient.GetDBHandle()
	defer adminLdapDB.Close()

	// Search for a user using uid.
	filter := goldap.Equal{Attr: "uid", Value: []byte(user)}

	var response LdapResponse
	if err := adminLdapDB.SearchTree(&response, goldap.ObjectDN(baseDN), filter); err != nil {
		fmt.Printf("Error searching UID: %q - %q\n", user, err)
		return nil, err
	}

	fmt.Printf("Admin account connected to LDAP. Result DN: %q\n", response.DN)
	return &response, nil
}

// GetDBHandle creates a handle with connection
// details - function member is exported.
func (lc *LdapClient) GetDBHandle() (db *goldap.DB) {

	fmt.Printf("Using URI: %q for connecting to LDAP server\n", lc.ServerURI)

	ldapTimeout := 1 * time.Second
	dialFunc := func(network, addr string) (net.Conn, error) {
		return net.DialTimeout(network, addr, ldapTimeout)
	}

	// Use TLS dial for LDAPS.
	if lc.tlsConfig != nil {
		dialFunc = func(network, addr string) (net.Conn, error) {
			return tls.Dial(network, addr, lc.tlsConfig)
		}
	}

	// Don't set TLS, that causes StartTLS, tls dial func is enough.
	adminConfig := &goldap.ClientConfig{
		Dial: dialFunc,
		Auth: []goldap.AuthMechanism{
			goldap.SimpleAuth{
				User: lc.AdminDN,
				Pass: lc.AdminPassword,
			},
		},
	}

	// Create LDAP DB handle, this doesn't connect to LDAP server.
	db = goldap.Open(lc.ServerURI, adminConfig)
	return db
}

func loadPEMCertificate(certPool *x509.CertPool, pemCerts []byte) (ok bool) {
	for len(pemCerts) > 0 {
		var block *pem.Block
		block, pemCerts = pem.Decode(pemCerts)
		if block == nil {
			break
		}
		if block.Type != "CERTIFICATE" || len(block.Headers) != 0 {
			continue
		}

		cert, err := x509.ParseCertificate(block.Bytes)
		if err != nil {
			continue
		}

		// Assumption: CA is self-signed. Not recommended
		// for production environments.
		cert.IsCA = true
		certPool.AddCert(cert)
		ok = true
	}

	return
}

func getTLSConfig(url *url.URL) (*tls.Config, error) {

	certPath := os.Getenv("LDAP_CERT_PATH")
	if certPath == "" {
		return nil, errors.New("No certificate path found!")
	} else {
		clientCAPool := x509.NewCertPool()
		certBytes, err := ioutil.ReadFile(certPath)
		if err == nil {
			fmt.Printf("Loaded Certificate from %s\n", certPath)
			if loadPEMCertificate(clientCAPool, certBytes) {
				tlsConfig := &tls.Config{
					RootCAs:            clientCAPool,
					InsecureSkipVerify: true,
					ServerName:         url.Host,
				}
				return tlsConfig, nil
			}
		}
		return nil, fmt.Errorf("Error:%s loading the certificate from %s!", err, certPath)
	}
}

func createLDAPClient(basedn string) (lc *LdapClient, err error) {

	var serverUri string
	if isLDAPS {
		serverUri = os.Getenv("LDAPS_URI")
	} else {
		serverUri = os.Getenv("LDAP_URI")
	}

	var url *url.URL
	if serverUri != "" {
		u, err := url.Parse(serverUri)
		if err != nil {
			return nil, fmt.Errorf("Failed to parse service URI : %s", err)
		}
		url = u
	} else {
		return nil, errors.New("LDAP Service URI is unavailable!")
	}

	var tlsCfg *tls.Config
	if isLDAPS {
		if tlsCfg, err = getTLSConfig(url); err != nil {
			return nil, err
		}
	}

	// Figure out yourself how you want to get these here.
	adminDN := os.Getenv("ADMIN_DN")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	if adminDN == "" {
		return nil, fmt.Errorf("No admin DN provided")
	}

	ldapClient = &LdapClient{
		AdminDN:       adminDN,
		AdminPassword: adminPassword,
		ServerURI:     serverUri,
		tlsConfig:     tlsCfg,
		BaseDN:        basedn,
	}
	return ldapClient, nil
}

// For "/" request.
func viewHandler(w http.ResponseWriter, r *http.Request) {

	const viewTemplate = `
		{{if .Error}}
			<div align="center"><h4 style="color:red">{{.Error}}</h4></div>
		{{else}}
			<h1 style="text-align:center">{{.Header}}</h1>
			<form action="/search" method="POST" style="text-align:center">
			<input type="text" name="username" style="width:20%" value="{{.UserName}}"></br></br>
			<input type="text" name="basedn" style="width:20%" value="{{.BaseDN}}"></br></br>
			<input type="checkbox" name="useldapsonly" value="true"> Secure Connection Only</br>
			<input type="submit" value="Submit">
			</form>
		{{end}}
	`
	temp, err := template.New("view").Parse(viewTemplate)
	if err != nil {
		log.Fatalf("Error occurred while loading the View template [%s]", err)
	}

	if r.URL.Path != "/" {
		data := struct {
			Error string
		}{
			Error: "Error 404: Page Not Found!",
		}
		err = temp.Execute(w, data)
	} else {
		data := struct {
			Header   string
			UserName string
			BaseDN   string
			Error    string
		}{
			Header:   "Query LDAP Users",
			UserName: "Username...",
			BaseDN:   "BaseDN... ",
		}
		err = temp.Execute(w, data)
	}
}

// Used after form submission, i.e. "/search" request.
func searchHandler(w http.ResponseWriter, r *http.Request) {

	username := r.FormValue("username")
	baseDN := r.FormValue("basedn")
	ldspsOnly, err := strconv.ParseBool(r.FormValue("useldapsonly"))
	if err != nil {
		ldspsOnly = false
	}

	fmt.Printf("Username: %q, Base DN: %q LDAPS: %s\n", username, baseDN, strconv.FormatBool(ldspsOnly))
	var res *LdapResponse
	var lerr error

	// Don't create LDAP client for each query request. It's expensive.
	if ldapClient == nil || isLDAPS != ldspsOnly {
		isLDAPS = ldspsOnly
		if ldapClient, lerr = createLDAPClient(baseDN); err != nil {
			log.Printf("Error creating LDAP client. %q\n", err)
		}
	}

	if lerr == nil {
		if res, lerr = ldapClient.SearchLDAPUser(username, baseDN); lerr != nil {
			fmt.Printf("Error searching the user: [%q]", lerr)
		}
	}

	const userInfoTemplate = `
		{{if .Error}}
			<div style="width:50%"><h4 style="color:red">{{.Error}}</h4></div>
		{{else}}
			<div align="center">
			<table border="1" style="width:50%">
			<tr><th colspan="2">LDAP User Information for {{.User}}</th></tr>
			{{range $key, $value := .UserInfo}}
				<tr><td style="width:50%">{{$key}}</td><td style="width:50%">{{$value}}</td></tr>
			{{else}}
				<tr><th colspan="2">No Info found</th></tr>
			</table></div>
			{{end}}
		{{end}}
	`

	temp, err := template.New("search").Parse(userInfoTemplate)
	if err != nil {
		log.Fatalf("Error occurred while loading the search template [%s]", err)
	}

	var data struct {
		User     string
		UserInfo map[string]string
		Error    string
	}
	if lerr != nil {
		data.Error = "Error 503: Internal Server Error! [" + lerr.Error() + "]"
	} else {
		fmt.Printf("DN: %s, Email: %s, CN: %s", res.DN, res.Email, res.CN)
		// Render the user information in the response

		data.User = username
		data.UserInfo = map[string]string{
			"DN:":            res.DN.String(),
			"CN:":            res.CN,
			"Email:":         res.Email,
			"Email Account:": res.EmailAccount,
		}
	}
	temp.Execute(w, data)
}

func main() {

	log.SetPrefix("GO LDAP CLient: ")
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	// Start the webserver.
	http.HandleFunc("/search", searchHandler)
	http.HandleFunc("/", viewHandler)
	err := http.ListenAndServe(":"+os.Getenv("HTTP_PORT"), nil)
	if err != nil {
		log.Fatal("LisenAndServe:", err)
	}
}
