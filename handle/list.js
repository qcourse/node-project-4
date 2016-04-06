'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");

const list = (request, response) => async (function * () {
    const print = printer(request, response);
    const params = request.query;
    
    // TODO: Connect to MongoDB
    
    // TODO: Build search criteria
    // TODO: Save search history
    // TODO: Support paging
    
    print({ message: "Not Implement" })
});

module.exports = list;