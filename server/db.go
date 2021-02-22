package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func db() DBC {
	// database string connection
	ds := os.Getenv("MONGO_DB_URL")
	// client options
	co := options.Client().ApplyURI(ds)
	client, err := mongo.NewClient(co)

	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return DBC{
		Client:        client,
		Context:       ctx,
		CancelContext: cancel,
	}
}
