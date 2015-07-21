var ncker = require('./index');

ncker.run({
    image: "iojs",
    ports: ["8080:8080", "21:21"],
    volumes: [
        "/var/www/somesite.dev:/var/www/somesite.dev",
    ],
    command: "npm install",
    workingdir: "/var/www/somesite.dev",
    detached: true,
    name: "npm_installer",
    dnshost: "iojs.somesite.dkr"
});