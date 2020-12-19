FROM golang:1.14-alpine AS buildserver
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY server ./server
RUN mkdir bin
RUN CGO_ENABLED=0 go build -o bin/server server/*.go

FROM node:dubnium-alpine AS buildapidocs
WORKDIR /app
COPY api ./api
WORKDIR /app/api
RUN npm i
RUN npm run generate
RUN rm -rf node_modules

FROM node:dubnium-alpine AS buildwebapp
WORKDIR /app
COPY web ./web
WORKDIR /app/web
RUN npm i
RUN npm run prerender
RUN rm -rf node_modules

FROM alpine:3 as certs
RUN apk --no-cache add ca-certificates

FROM scratch
COPY --from=buildserver /app/bin/server ./app/bin/server
COPY --from=buildapidocs /app/api ./app/api
COPY --from=buildwebapp /app/web/dist/visomi/browser ./app/web/dist/visomi/browser
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
WORKDIR /app/bin
ENTRYPOINT ["./server"]