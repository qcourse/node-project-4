'use strict';

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const printer = require("../lib/printer");
const cos = require('../lib/cos');
const mongo = require("../lib/mongo");

function upload(request, response) {
    const print = printer(request, response);
    
    print({ mesasage: "not implement" });
    
    // TODO: use multer to handle the upload process
    
    function uploadToServer(uploadError) {
        // TODO: Handle multer upload result
    }
    
    function uploadToCos(file) {
        // TODO: upload file to cos
        
    }
    
    function saveToMongo(fileInfo) {
        // TODO: Connect to mongodb and save fileInfo
    }
}


module.exports = upload;