package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/streadway/amqp"
)

var conn *amqp.Connection

func servePush(resp http.ResponseWriter, req *http.Request) {
	conn, err := amqp.Dial(os.Getenv("AMQP_URI"))
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	q, err := ch.QueueDeclare(
		"go-rabbitmq", // name
		false,         // durable
		false,         // delete when unused
		false,         // exclusive
		false,         // no-wait
		nil,           // arguments
	)
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}

	mesg := req.URL.Path
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(mesg),
		},
	)
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(resp, "published: %q", mesg)
}

func servePop(resp http.ResponseWriter, req *http.Request) {
	conn, err := amqp.Dial(os.Getenv("AMQP_URI"))
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	q, err := ch.QueueDeclare(
		"go-rabbitmq", // name
		false,         // durable
		false,         // delete when unused
		false,         // exclusive
		false,         // no-wait
		nil,           // arguments
	)
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}

	mesgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		http.Error(resp, err.Error(), http.StatusInternalServerError)
		return
	}

	// This will block until someone pushes something.
	m := <-mesgs
	fmt.Fprintf(resp, "popped: %q", m.Body)
}

func main() {
	http.HandleFunc("/push/", servePush)
	http.HandleFunc("/pop", servePop)

	if err := http.ListenAndServe(":"+os.Getenv("PORT"), nil); err != nil {
		log.Fatal(err)
	}
}
