package main

import "net/http"

// Router declare the handlers with validators
func Router(dbc *DBC) {
	http.HandleFunc("/api", Docs)
	http.HandleFunc("/api/icon/", Validator("../api/icon/get-request-schema.json", "query", Icon(dbc)))
	http.HandleFunc("/api/background", Validator("../api/background/get-request-schema.json", "query", Background))
}
