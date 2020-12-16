package main

import (
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	// MongoDB client
	clnt, ctx := db()

	router(e, clnt, ctx)

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method} ${uri} -> ${status}, time: ${latency_human}\n",
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	p := os.Getenv("PORT")

	if p == "" {
		p = "8080"
	}

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", p)))
	defer clnt.Disconnect(ctx)
}
