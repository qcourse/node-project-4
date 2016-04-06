'use strict';

const express = require("express");
const bodyParser = require("body-parser");

function start(port) {
    const app = express();
    
    // tells the client the server can work.
    app.get("/", (request, response) => {
        response.write("It works!");
        response.end();
    });

    // 注意放在所有路由前面
    app.use(bodyParser.json());
    
    app.use("/upload", require("./handle/upload"));
    app.use("/list", require("./handle/list"));
    app.use("/meta", require("./handle/meta"));
    app.use("/keyword", require("./handle/keyword"));
    app.use("/delete", require("./handle/delete"));
    
    app.listen(port || 3000);
}

start();