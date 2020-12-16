package main

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func db() (*mongo.Client, context.Context) {
	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_DB_URL")))

	if err != nil {
		log.Fatal(err)
	}

	// Timeout
	to := 10 * time.Second
	ctx, _ := context.WithTimeout(context.Background(), to)
	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return client, ctx
}
