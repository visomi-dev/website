FROM golang:1.14-alpine AS buildbackend
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN go mod download
RUN mkdir bin
RUN CGO_ENABLED=0 go build -o bin/backend backend/*.go

FROM node:dubnium-alpine AS buildapidocs
WORKDIR /app
COPY api ./api
WORKDIR /app/api
RUN npm i
RUN npm run generate
RUN rm -rf node_modules

FROM node:dubnium-alpine AS buildfrontendapp
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm i
RUN npm run prerender
RUN rm -rf node_modules

FROM alpine:3 as certs
RUN apk --no-cache add ca-certificates

FROM scratch
COPY --from=buildbackend /app/bin/backend ./app/bin/backend
COPY --from=buildapidocs /app/api ./app/api
COPY --from=buildfrontendapp /app/frontend/dist/visomi/browser ./app/frontend/dist/visomi/browser
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
WORKDIR /app/bin
ENTRYPOINT ["./backend"]