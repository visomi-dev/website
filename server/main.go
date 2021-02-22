package main

import (
	"log"
	"net/http"
)

func main() {
	dbc := db()

	Router(&dbc)

	// Host and Port to serve
	hp := GetHostAndPort()

	defer dbc.Client.Disconnect(dbc.Context)
	defer dbc.CancelContext()

	if err := http.ListenAndServe(hp, nil); err != nil {
		log.Fatal(err)
	}
}
