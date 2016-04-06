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
        
        let criteria = {};
        
        // build search criteria
        const keyword = params.search;
        if (keyword) {
            const search = new RegExp(keyword);
            console.log("search: " + keyword);
            criteria.$or = ['name', 'meta.author', 'meta.labels', 'meta.alt'].map(field => ({ [field]: search }));
        }
        
        const total = yield imageCollection.count(criteria);
        
        let query = imageCollection.find(criteria);
        let pageIndex = +params.pageIndex;
        let pageSize = +params.pageSize;
        
        // see if user has request for a paging
        if (!isNaN(pageIndex) && !isNaN(pageSize)) {
            pageIndex = pageIndex || 0;
            pageSize = pageSize || 10;
            const start = pageIndex * pageSize;
            query = query.skip(start).limit(pageSize);
        }
        
        const list = yield query.toArray();
            
        print({
            total,
            list, 
            paging: { pageIndex, pageSize } 
        });
    } catch (error) {
        console.log(error);
        print({ error });
    } finally {
        db.close();
    }
});

module.exports = list;