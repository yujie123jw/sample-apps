package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/nats-io/nats"
)

type Server struct {
	nc *nats.Conn
}

func (s *Server) Hello(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "OK\n")
}

func (s *Server) Help(w http.ResponseWriter, req *http.Request) {
	a := time.Now()
	msg, err := s.nc.Request("help", []byte("help please"), 500*time.Millisecond)
	if err != nil {
		io.WriteString(w, "Error while making request to NATS!\n")
		return
	}

	duration := time.Since(a)
	line := fmt.Sprintf("Got help within %v: %v\n", duration, string(msg.Data))
	log.Printf(line)
	io.WriteString(w, line)
}

func init() {
	log.SetOutput(os.Stdout)
}

func main() {
	natsUri := os.Getenv("NATS_URI")
	nc, err := nats.Connect(natsUri)
	if err != nil {
		log.Fatalf("Error connecting to NATS on %q: %s\n", natsUri, err)
	}

	s := &Server{
		nc: nc,
	}
	http.HandleFunc("/", s.Hello)
	http.HandleFunc("/help", s.Help)

	port := os.Getenv("PORT")
	log.Printf("Start listening on port %s...\n", port)
	err = http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("Error: %s\n", err)
	}
}
