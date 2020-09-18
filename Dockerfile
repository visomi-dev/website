FROM golang:alpine as buildserver
WORKDIR /go/src/app
COPY go.mod .
COPY go.sum .
COPY Makefile .
COPY server .
RUN go get -d -v ./...
RUN make build-server

FROM node:alpine as buildwebapp
WORKDIR /app/website
COPY web .
RUN cd web && npm i
RUN npm run prerender

FROM node:alpine as buildapidoc
WORKDIR /app/website
COPY api .
RUN cd && npm i
RUN npm run generate

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app/website
RUN mkdir -p web && mkdir -p api && mkdir -p bin
COPY --from=buildserver /app/website/bin/server bin
COPY --from=buildapidoc /app/website/api/api.html api
COPY --from=buildwebapp /app/website/web/dist web
CMD ["./bin/server"]