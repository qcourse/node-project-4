'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");

const list = (request, response) => async (function * () {
    const print = printer(request, response);
    const params = request.query;
    
    let db;
    
    try {
        db = yield mongo.connect();
    } catch (mongoError) {
        print(mongoError);
        return;
    }
    
    try {
        const imageCollection = db.collection("images");
        let query = imageCollection.find();
        const list = yield query.toArray();
        print({ list });
    } catch (error) {
        console.log(error);
        print({ error });
    } finally {
        db.close();
    }
});

module.exports = list;