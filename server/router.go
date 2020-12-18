package main

import (
	"github.com/labstack/echo/v4"
)

func router(e *echo.Echo, dbc *DBC) {
	e.GET("/api", func(c echo.Context) error {
		return c.File("../api/api.html")
	})

	e.GET("/api/background", Background, Validator("../api/background/get-request-schema.json", "query"))
	e.GET("/api/icon/:name", Icon(dbc), Validator("../api/icon/get-request-schema.json", "query"))

	e.Static("/", "../web/dist/visomi/browser")
}
