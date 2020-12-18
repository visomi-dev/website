package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func db() DBC {
	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_DB_URL")))

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
