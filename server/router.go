package main

import "net/http"

// Router declare the handlers with validators
func Router(dbc *DBC) {
	http.HandleFunc("/api", Docs)
	http.HandleFunc("/icons/", Validator("../api/icon/get-request-schema.json", "query", Icon(dbc)))
	http.HandleFunc("/background.svg", Validator("../api/background/get-request-schema.json", "query", Background))

	http.Handle("/", http.FileServer(http.Dir("../client/dist/static")))
}
