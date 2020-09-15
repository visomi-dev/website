build-documentation:
	npx raml2html api/api.raml > api/api.html

build-server:
	go build -o bin/server server/*.go
