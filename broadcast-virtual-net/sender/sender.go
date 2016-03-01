package main

import (
	"fmt"
	"log"
	"net"
	"time"
)

func main() {
	conn, err := net.Dial("udp", "255.255.255.255:6666")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	for {
		fmt.Fprintf(conn, "HELLO!")
		time.Sleep(1 * time.Second)
	}
}
