package main

import (
	"github.com/labstack/echo/v4"
)

func router(e *echo.Echo) {
	// Background validator middleware
	bckgvm := Validator("../api/background/get-request-schema.json", "query")

	e.GET("/api", func(c echo.Context) error {
		return c.File("../api/api.html")
	})

	e.GET("/api/background", Background, bckgvm)
}
