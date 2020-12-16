package main

import (
	"context"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

func router(e *echo.Echo, clnt *mongo.Client, ctx context.Context) {
	e.GET("/api", func(c echo.Context) error {
		return c.File("../api/api.html")
	})

	e.GET("/api/background", Background, Validator("../api/background/get-request-schema.json", "query"))
	e.GET("/api/icon/:name", Icon(clnt, ctx), Validator("../api/icon/get-request-schema.json", "query"))

	e.Static("/", "../web/dist/visomi/browser")
}
