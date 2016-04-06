'use strict';

const MongoClient = require('mongodb').MongoClient;


const user = "rwuser";
// TODO: Get password and endpoint on https://console.qcloud.com/mongodb
const password = "";
const endpoint = "";

const url = `mongodb://${user}:${password}@${endpoint}/?authMechanism=MONGODB-CR`;

/**
 * 连接到 mongodb
 * 
*/
function connect(callback) {
    return MongoClient.connect(url, callback);
}

exports.connect = connect;