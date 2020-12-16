#!/bin/bash

WORKDIR=$PWD

cd $WORKDIR/icons
npm i

cd $WORKDIR/web
npm i

cd $WORKDIR
go get -u github.com/mitranim/gow