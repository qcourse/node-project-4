'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");
const ObjectId = require("mongodb").ObjectId;

/**
 * 更新/添加元数据
 */
const meta = (request, response) => async (function * () {
    const print = printer(request, response);
    
    // TODO: Remember to add body-parse in server.js
    const body = request.body;
    const id = body && body.id;
    const meta = body && body.meta;
    
    // TODO: Parameter checks
    
    
    // TODO: Connect to MongoDB
    
    // TODO: Find match image and update meta
    
    print({ message: "Not implement" });
});

module.exports = meta;