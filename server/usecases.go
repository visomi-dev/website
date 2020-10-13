package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	svg "github.com/ajstarks/svgo"
	"github.com/labstack/echo/v4"
)

// Icon generate svg icon
func Icon(c echo.Context) error {
	name := c.Param("name")

	p := Icons[name]

	s := []byte(fmt.Sprintf(`
		<svg
			class="app-icon"
			viewBox="0 0 24 24"
		>
			<path
				id="icon"
				fill="currentColor"
				d="%s"
			>
			</path>
		</svg>
	`, p))

	return c.Blob(http.StatusOK, "image/svg+xml", s)
}

// Background generate svg
func Background(c echo.Context) error {
	rand.Seed(time.Now().UnixNano())

	var dp BackgroundQueryParams

	if err := c.Bind(&dp); err != nil {
		return err
	}

	// Min duration
	// md := 1800
	// Max duration
	// mad := 4000

	q := rand.Intn(dp.MaxItems-dp.MinItems+1) + dp.MinItems
	cl := len(dp.Colors)

	c.Response().Header().Set("Content-Type", "image/svg+xml")
	c.Response().WriteHeader(http.StatusOK)

	sv := svg.New(c.Response())

	sv.Start(dp.Width, dp.Height)

	for i := 0; i < q; i++ {
		c := "white"

		if cl > 1 {
			ci := rand.Intn(cl)
			c = dp.Colors[ci]
		}

		si := rand.Intn(dp.MaxItemSize-dp.MinItemSize+1) + dp.MinItemSize
		cx := rand.Intn(dp.Width + 1)
		cy := rand.Intn(dp.Height + 1)
		// dur := rand.Intn(mad-md+1) + md

		sv.Circle(cx, cy, si, fmt.Sprintf("fill:%s;", c))
	}

	sv.End()

	return nil
}
