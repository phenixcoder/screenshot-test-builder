/**
 * Storage.js
 * Common module for using storage to store files on the disk or send to server.
 */
const fs = require('fs');

var Storage = {
    loadResult: function (filename) {
        var fileContent = fs.readFileSync(filename, 'utf8');
        return JSON.parse(fileContent);
    }
};

export default Storage;