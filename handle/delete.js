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
    
    console.log(body);
    
    // parameter checks
    if (!id) {
        print({ error: "Specific `id` to tell the server which image to delete" });
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
    
    // find and delete
    try {
        const collection = db.collection("images");
        
        const query = { _id: ObjectId(id) };
        const found = yield collection.find(query).next();
        
        if (found) {
            const path = found.cos.resource_path;
            const cosDeleteResult = yield cos.delete('image', path);
            
            const mongoDeleteResult = yield collection.deleteOne(query);
            
            print({ cosDeleteResult, mongoDeleteResult }); 
        } else {
            print({ message: `image not found with id "${id}"` });   
        }
        
    } catch (error) {
        console.log(error);
        console.log(error.stack);
        print({ error });
    } finally {
        db.close();
    }
});

module.exports = handleDelete;