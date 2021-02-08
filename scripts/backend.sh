#!/bin/bash

export $(grep -v '^#' ./backend/.env | xargs)

cd ./backend

gow run *.go