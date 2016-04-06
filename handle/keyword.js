'use strict';

const async = require("co");
const printer = require("../lib/printer");
const mongo = require("../lib/mongo");

const searchhistory = (request, response) => async (function * () {
    const print = printer(request, response);
    const params = request.query;
    
    // TODO: Connect to db
    
    // TODO: List all keywords
    
    print({ message: "not implememted" });
});

module.exports = searchhistory;