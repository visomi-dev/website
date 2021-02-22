FROM golang:1.14-alpine AS buildserver
WORKDIR /app
COPY server ./server
WORKDIR /app/server
RUN go mod download
RUN mkdir bin
RUN CGO_ENABLED=0 go build -o bin/server server/*.go

FROM node:dubnium-alpine AS buildapidocs
WORKDIR /app
COPY api ./api
WORKDIR /app/api
RUN npm i
RUN npm run generate
RUN rm -rf node_modules

FROM node:dubnium-alpine AS buildclientapp
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm i
RUN npm run prerender
RUN rm -rf node_modules

FROM alpine:3 as certs
RUN apk --no-cache add ca-certificates

FROM scratch
COPY --from=buildserver /app/bin/server ./app/bin/server
COPY --from=buildapidocs /app/api ./app/api
COPY --from=buildclientapp /app/client/dist/visomi/browser ./app/client/dist/visomi/browser
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
WORKDIR /app/bin
ENTRYPOINT ["./server"]