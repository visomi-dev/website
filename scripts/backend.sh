#!/bin/bash

export $(grep -v '^#' ./server/.env | xargs)

cd ./backend

gow run *.go