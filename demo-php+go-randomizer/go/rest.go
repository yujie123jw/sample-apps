package main

import (
	"encoding/json"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
)

// Randomizer REST API
func RandoServer(w http.ResponseWriter, req *http.Request) {

	// Build response data
	type response struct {
		API_Instance string
		API_FQN      string
		Number       int
	}
	rstruct := response{
		API_Instance: os.Getenv("CNTM_INSTANCE_UUID"),
		API_FQN:      os.Getenv("CNTM_JOB_FQN"),
		Number:       rand.Intn(100),
	}

	// Reformat response into JSON
	byteout, err := json.MarshalIndent(rstruct, "", "  ")
	if err != nil {
		log.Fatal("error:", err)
	}
	out := string(byteout[:])

	// Display data
	io.WriteString(w, out)
}

func main() {
	http.HandleFunc("/", RandoServer)
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("No PORT defined")
	}
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
