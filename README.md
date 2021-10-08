# habr_pwa_sw_control
Demo repo for Habr publication

## Build and Start

```shell
$ npm install
...
$ npm start # start HTTP/2 server (need a proxy in front of)
$ npm run start-http1 # start HTTP/1 server (can connect to at http://localhost:3000)
```

## Configure

Add `./cfg/local.json`:

```json
{
  "@teqfw/web": {
    "server": {
      "port": 3030
    },
    "urlBase": "your.server.com"
  }
}
```
