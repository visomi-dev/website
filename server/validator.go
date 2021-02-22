package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/joncalhoun/qson"
	"github.com/santhosh-tekuri/jsonschema"
)

// ValidatorResponse return this if the validator has errors
type ValidatorResponse struct {
	*BaseResponse
	Data []string `json:"data"`
}

// Validator validate json schema from request body
func Validator(schemaPath string, validationType string, next http.HandlerFunc) http.HandlerFunc {
	schema, serr := jsonschema.Compile(schemaPath)

	if serr != nil {
		log.Fatal(serr)
	}

	if validationType != "query" && validationType != "body" {
		log.Fatal("Validation not supported")
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var pr io.Reader
		var err error

		if validationType == "query" {
			p := r.URL.RawQuery

			if p != "" {
				b, _ := qson.ToJSON(p)
				pr = bytes.NewReader(b)
			}

			if p == "" {
				pr = strings.NewReader("{}")
			}
		}

		if validationType == "body" {
			var buf bytes.Buffer

			pr = io.TeeReader(r.Body, &buf)
			r.Body = ioutil.NopCloser(&buf)
		}

		if err = schema.Validate(pr); err != nil {
			errs := strings.Split(err.Error(), "\n")

			w.WriteHeader(400)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(&ValidatorResponse{
				BaseResponse: &BaseResponse{
					Success: false,
					Message: fmt.Sprintf("Bad request %s", validationType),
				},
				Data: errs,
			})
		}

		if err == nil {
			next(w, r)
		}
	}
}
