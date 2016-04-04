'use strict';

const MongoClient = require('mongodb').MongoClient;

const user = 'rwuser';
const password = 'qcourseCase3';
const endpoint = "10.66.125.158:27017";

const url = `mongodb://${user}:${password}@${endpoint}/?authMechanism=MONGODB-CR`;

/**
 * 连接到 mongodb
 * 
*/
function connect(callback) {
    return MongoClient.connect(url, callback);
}

exports.connect = connect;