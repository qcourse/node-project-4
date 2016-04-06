'use strict';

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const printer = require("../lib/printer");
const cos = require("../lib/cos");
const mongo = require("../lib/mongo");

function upload(request, response) {
    // initial a print util
    const print = printer(request, response);
    
    console.log("#0. Start processing upload...");
    // use multer to handle the upload process
    const processUpload = multer({ 
        dest: "/data/uploads/project4.qcourse.net",
        limits: {
            fileSize: 3 * 1024 * 1024, // support max size at 3M
        }
    }).single('image');
    processUpload(request, response, uploadToServer);
    
    function uploadToServer(uploadError) {
        
        if (uploadError) {
            print({ uploadError });
            return;
        }
        
        // check if any file uploaded
        const file = request.file;
        if (!file) {
            print({ msg: "file is required" });
            return;
        }
        console.log("#1. File uploaded to server:");
        console.log(JSON.stringify(file, null, 4));
        
        uploadToCos(file);
    }
    
    function uploadToCos(file) {
        // upload file to cos
        const uploadPath = `/uploads/${file.filename}${path.extname(file.originalname)}`;
        cos.upload(file.path, 'image', uploadPath, file.filename, (cosResult) => {
            
            console.log("#2. File uploaded to cos:");
            console.log(JSON.stringify(cosResult, null, 4));
            
            // upload to cos error
            if (cosResult.code) {
                print({ cosError: cosResult });
                return;
            }
            
            // clean up local store
            fs.unlink(file.path);
            
            // prepare file info, insert to mongodb later
            const fileInfo = {
                name: file.originalname,
                size: file.size,
                mime: file.mimetype,
                url: cosResult.data.access_url,
                cos: cosResult.data, // save all cos context
                meta: {}
            };
            
            saveToMongo(fileInfo);
        });
    }
    
    function saveToMongo(fileInfo) {
        // connect to mongodb
        mongo.connect((mongoError, db) => {
            if (mongoError) {
                print({ mongoError });
                db.close();
                return;
            }
            
            // insert fileInfo to the `image` connection 
            const collection = db.collection("images");
            collection.insertOne(fileInfo, (insertError, insertResult) => {
                if (insertError) {
                    print({ insertError });
                    db.close();
                    return;
                }
                console.log("#3. Saved to mongodb:");
                console.log(JSON.stringify({ insertResult, fileInfo }, null, 4));
                
                print({ fileInfo });
                db.close();
            });
        });
    }
}
module.exports = upload;