package main

import (
	"github.com/labstack/echo/v4"
)

func router(e *echo.Echo) {
	e.GET("/api", func(c echo.Context) error {
		return c.File("../../api/api.html")
	})

	bckgm := Validator("../api/background/get-request-schema.json", "query")

	e.GET("/api/background", Background, bckgm)
}
