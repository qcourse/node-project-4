'use strict';

const express = require("express");

function start(port) {
    const app = express();
    
    // tells the client the server can work.
    app.get("/", (request, response) => {
        response.write("It works!");
        response.end();
    });
    
    app.use("/upload", require("./handle/upload"));
    app.use("/list", require("./handle/list"));
    
    app.listen(port || 3000);
}

start();