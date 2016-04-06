'use strict';

/**
 * Create a printer to print json result on express
*/
function createPrinter(request, response) {
    return function print(obj) {
        try {
            response.header("Content-Type", "application/json");
            response.write(JSON.stringify(obj, null, 4));
        } catch (e) {
            response.write("Invalid JSON Object");
        } finally {
            response.end();
        }
    }
}

module.exports = createPrinter;