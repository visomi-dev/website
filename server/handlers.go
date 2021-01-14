package main

import (
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"strings"
	"time"

	svg "github.com/ajstarks/svgo"
	"go.mongodb.org/mongo-driver/bson"
)

// Docs API Documentation
func Docs(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../api/api.html")
}

// Background generate svg
func Background(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())

	var dp BackgroundQueryParams

	if err := Bind(&dp, r.URL.Query(), "query"); err != nil {
		w.WriteHeader(500)
		io.WriteString(w, err.Error())
	}

	q := rand.Intn(dp.MaxItems-dp.MinItems+1) + dp.MinItems
	cl := len(dp.Colors)

	w.Header().Set("Content-Type", "image/svg+xml")
	w.WriteHeader(http.StatusOK)

	sv := svg.New(w)

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

		sv.Circle(cx, cy, si, fmt.Sprintf("fill:%s;", c))
	}

	sv.End()
}

// Icon generate a svg icon
func Icon(dbc *DBC) func(http.ResponseWriter, *http.Request) {
	col := dbc.Client.Database("visomi").Collection("icons")

	return func(w http.ResponseWriter, r *http.Request) {
		// ps = paths
		ps := strings.Split(r.URL.Path, "/")
		// in = icon
		in := strings.Replace(ps[3], ".svg", "", 0)

		var ip IconQueryParams
		var ic IconModel

		if err := Bind(&ip, r.URL.Query(), "query"); err != nil {
			w.WriteHeader(500)
			io.WriteString(w, err.Error())
		}

		if err := col.FindOne(dbc.Context, bson.M{"icon": in}).Decode(&ic); err != nil {
			w.WriteHeader(500)
			io.WriteString(w, err.Error())
		}

		w.Header().Set("Content-Type", "image/svg+xml")
		w.WriteHeader(http.StatusOK)

		sv := svg.New(w)

		sv.Start(24, 24)
		sv.Path(ic.Path, "id=\"icon\"", fmt.Sprintf("fill:%s;", ip.Color))
		sv.End()

	}
}
