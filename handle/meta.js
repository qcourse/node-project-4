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
    const body = request.body;
    const id = body.id;
    const meta = body.meta;
    
    // parameter checks
    if (!id) {
        print({ error: "Specific `id` to tell the server which image meta to update" });
        return;
    }
    if (!meta) {
        print({ error: "No meta specific" });
        return;
    }
    
    // connect to mongo db
    let db;
    try {
        db = yield mongo.connect();
    } catch (mongoError) {
        print({ mongoError });
        return;
    }
    
    // find and update
    try {
        const collection = db.collection("images");
        
        const query = { _id: ObjectId(id) };
        const update = { $set: { meta } };
        const result = yield collection.findOneAndUpdate(query, update);
        
        print({ result });
        
    } catch (error) {
        print({ error });
    } finally {
        db.close();
    }
});

module.exports = meta;