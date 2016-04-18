package main

import (
	"log"
	"os"
	"runtime"

	"github.com/nats-io/nats"
)

func init() {
	log.SetOutput(os.Stdout)
}

func main() {
	natsUri := os.Getenv("NATS_URI")
	nc, err := nats.Connect(natsUri)
	if err != nil {
		log.Fatalf("Error connecting to NATS on %q: %s\n", natsUri, err)
	}
	nc.Subscribe("help", func(msg *nats.Msg) {
		log.Printf("Got help request %q, replying back...", string(msg.Data))
		nc.Publish(msg.Reply, []byte("OK I can help!"))
	})

	log.Printf("Connected to NATS and waiting for help requests...")
	runtime.Goexit()
}
