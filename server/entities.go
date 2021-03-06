package main

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

// IconModel model on database
type IconModel struct {
	Icon string `json:"icon,omitempty"`
	Path string `json:"path,omitempty"`
}

// DBC database connection and context
type DBC struct {
	Client        *mongo.Client
	Context       context.Context
	CancelContext context.CancelFunc
}

// BaseResponse general response for all endpoints
type BaseResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// BackgroundQueryParams data for work in background usecase
type BackgroundQueryParams struct {
	Width       int      `query:"width"`
	Height      int      `query:"height"`
	MinItems    int      `query:"minItems"`
	MaxItems    int      `query:"maxItems"`
	MinItemSize int      `query:"minItemSize"`
	MaxItemSize int      `query:"maxItemSize"`
	Colors      []string `query:"color"`
}

// IconQueryParams data for work in icon usecase
type IconQueryParams struct {
	Color string `query:"color"`
}
