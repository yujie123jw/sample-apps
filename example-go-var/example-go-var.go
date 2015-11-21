package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"os"
	"strconv"
	"strings"
)

/*
#include <stdlib.h>
*/
import "C"

// First param may specify a different reply. Some tests use it.
var reply = "hello, world!\n"

// hello world, the web server
func HandleHello(w http.ResponseWriter, r *http.Request) {
	fmt.Println("printed to stdout")
	fmt.Fprintln(os.Stderr, "printed to stderr")
	io.WriteString(w, reply)
}

func HandleError(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	code, _ := strconv.Atoi(r.Form.Get("code"))
	w.WriteHeader(code)
	io.WriteString(w, "test error response")
}

func HandleEcho(w http.ResponseWriter, r *http.Request) {
	bytes, _ := httputil.DumpRequest(r, true)
	w.Write(bytes)
}

func HandleEnv(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, strings.Join(os.Environ(), "\n"))
}

func HandleRandCgo(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, fmt.Sprintf("C-based rand: %d", rand()))
}

func rand() int {
	return int(C.random())
}

func main() {

	// TODO: currently just take the first param (after prog name) if
	// present. May need to pass more etc then use flag instead.
	if len(os.Args) > 1 {
		reply = os.Args[1]
	}

	fmt.Println("app is starting...")

	http.HandleFunc("/", HandleHello)
	http.HandleFunc("/env", HandleEnv)
	http.HandleFunc("/rand", HandleRandCgo)
	http.HandleFunc("/error/", HandleError)
	http.HandleFunc("/echo/", HandleEcho)

	err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
