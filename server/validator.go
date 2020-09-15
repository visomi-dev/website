package main

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/joncalhoun/qson"
	"github.com/labstack/echo/v4"
	"github.com/santhosh-tekuri/jsonschema"
)

// ValidatorResponse return this if the validator has errors
type ValidatorResponse struct {
	*BaseResponse
	Data []string `json:"data"`
}

// Validator validate json schema from request body
func Validator(schemaPath string, validationType string) echo.MiddlewareFunc {
	schema, serr := jsonschema.Compile(schemaPath)

	if serr != nil {
		panic(serr)
	}

	if validationType != "query" && validationType != "body" {
		panic("Validation not supported")
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			var pr io.Reader

			if validationType == "query" {
				p := c.QueryString()
				b, _ := qson.ToJSON(p)
				pr = bytes.NewReader(b)
			}

			if validationType == "body" {
				var buf bytes.Buffer

				pr = io.TeeReader(c.Request().Body, &buf)
				c.Request().Body = ioutil.NopCloser(&buf)
			}

			if err := schema.Validate(pr); err != nil {
				errs := strings.Split(err.Error(), "\n")

				return c.JSON(http.StatusBadRequest, &ValidatorResponse{
					BaseResponse: &BaseResponse{
						Success: false,
						Message: fmt.Sprintf("Bad request %s", validationType),
					},
					Data: errs,
				})
			}

			if err := next(c); err != nil {
				c.Error(err)

				return err
			}

			return nil
		}
	}
}
