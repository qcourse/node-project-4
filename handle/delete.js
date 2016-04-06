'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");
const cos = require("../lib/cos");
const ObjectId = require("mongodb").ObjectId;

/**
 * 删除图片及其元数据
 */
const handleDelete = (request, response) => async (function * () {
    const print = printer(request, response);
    const body = request.body;
    const id = body.id;
    
    // TODO: parameter checks
    
    // TODO: connect to mongo db
    
    // TODO: find and delete
    
    print({ message: "not implememted" });
});

module.exports = handleDelete;