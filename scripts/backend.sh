#!/bin/bash

export $(grep -v '^#' ./server/.env | xargs)

cd ./server

gow run *.go