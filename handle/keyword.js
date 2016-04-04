'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");

const searchhistory = (request, response) => async (function * () {
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
        const searchHistory = db.collection('keywords');
        const history = yield searchHistory.find().toArray();
        print({ history });
    
        db.close();
    } catch (error) {
        console.error(error);
        console.log(error.stack);
        print({ error });
    } finally {
        db.close();
    }
});

module.exports = searchhistory;